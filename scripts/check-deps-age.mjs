/**
 * check-deps-age.mjs
 *
 * Protección contra supply chain attacks:
 * Bloquea `pnpm install` si algún paquete declarado en package.json
 * fue publicado hace menos de MIN_AGE_HOURS horas.
 *
 * Cubre: dependencies, devDependencies, peerDependencies.
 *
 * Uso:
 *   pnpm install                      → corre automáticamente (preinstall)
 *   pnpm check:deps                   → verificación manual
 *   SKIP_AGE_CHECK=1 pnpm install     → bypass de emergencia
 */
import https from 'https';
import { readFileSync } from 'fs';

const MIN_AGE_HOURS = 24;
const TIMEOUT_MS    = 8000;
const BATCH_SIZE    = 8; // consultas paralelas al registry

// ── Bypass de emergencia ─────────────────────────────────────────
if (process.env.SKIP_AGE_CHECK === '1') {
  console.log('⚠️  check-deps-age: saltado por SKIP_AGE_CHECK=1');
  process.exit(0);
}

// ── Leer todas las dependencias declaradas ───────────────────────
const pkg = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf-8')
);

const allDeps = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
  ...pkg.peerDependencies, // también cubre peer deps
};

if (Object.keys(allDeps).length === 0) {
  console.log('ℹ️  No hay dependencias declaradas. Nada que verificar.');
  process.exit(0);
}

// ── Helpers ───────────────────────────────────────────────────────
function fetchPackageInfo(name) {
  return new Promise((resolve) => {
    const safeName = encodeURIComponent(name).replace('%40', '@');
    const url = `https://registry.npmjs.org/${safeName}`;
    const req = https.get(url, (res) => {
      let raw = '';
      res.on('data', (chunk) => (raw += chunk));
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); } catch { resolve(null); }
      });
    });
    req.setTimeout(TIMEOUT_MS, () => { req.destroy(); resolve(null); });
    req.on('error', () => resolve(null));
  });
}

/** Elimina prefijos de rango semver: ^1.2.3 → 1.2.3 */
function cleanVersion(raw) {
  return raw.replace(/^[\^~>=<*]+/, '').split(' ')[0].split(',')[0];
}

/** Resuelve la versión instalada real (latest si el rango usa ^ o ~) */
function resolveVersion(range, info) {
  const useLatest = /^[\^~*]/.test(range) || range === 'latest';
  return useLatest
    ? (info['dist-tags']?.latest ?? cleanVersion(range))
    : cleanVersion(range);
}

// ── Main ──────────────────────────────────────────────────────────
async function main() {
  const entries  = Object.entries(allDeps);
  const minAgeMs = MIN_AGE_HOURS * 3_600_000;
  const now      = Date.now();

  console.log(`\n🔍 Verificando antigüedad mínima de ${entries.length} paquetes (≥ ${MIN_AGE_HOURS}h)...\n`);

  let passed = 0, failed = 0, skipped = 0;
  const failedList = [];

  // Procesar en batches para no saturar el registry
  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch   = entries.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(async ([name, range]) => {
        const info = await fetchPackageInfo(name);

        if (!info?.time) {
          return { name, version: cleanVersion(range), status: 'skip', reason: 'sin datos en registry' };
        }

        const version     = resolveVersion(range, info);
        const publishDate = info.time[version];

        if (!publishDate) {
          return { name, version, status: 'skip', reason: 'versión no encontrada en registry' };
        }

        const ageMs    = now - new Date(publishDate).getTime();
        const ageHours = ageMs / 3_600_000;
        const ageDays  = (ageHours / 24).toFixed(0);

        return {
          name, version, ageHours, ageDays,
          status: ageMs >= minAgeMs ? 'ok' : 'fail',
        };
      })
    );

    for (const r of results) {
      if (r.status === 'skip') {
        console.warn(`  ⚠️  Omitido    ${r.name}@${r.version}  (${r.reason})`);
        skipped++;
      } else if (r.status === 'fail') {
        console.error(`  ❌ BLOQUEADO  ${r.name}@${r.version}  (publicado hace ${r.ageHours.toFixed(1)}h — mínimo requerido: ${MIN_AGE_HOURS}h)`);
        failedList.push(`${r.name}@${r.version}`);
        failed++;
      } else {
        console.log(`  ✅ OK         ${r.name}@${r.version}  (${r.ageDays}d)`);
        passed++;
      }
    }
  }

  // ── Resumen ───────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(60));
  console.log(`  Resultado: ${passed} OK · ${failed} bloqueados · ${skipped} omitidos`);
  console.log('─'.repeat(60));

  if (skipped > 0) {
    console.warn(`\n⚠️  ${skipped} paquete(s) no pudieron verificarse (sin red o timeout).`);
    console.warn('   Revisalos manualmente antes de hacer deploy.\n');
  }

  if (failed > 0) {
    console.error('\n🚨 INSTALACIÓN BLOQUEADA');
    console.error('   Los siguientes paquetes fueron publicados hace menos de 24h:');
    failedList.forEach((p) => console.error(`   · ${p}`));
    console.error('\n   Esperá 24h o verificá que no sean paquetes comprometidos.');
    console.error('   Bypass de emergencia: SKIP_AGE_CHECK=1 pnpm install\n');
    process.exit(1);
  }

  console.log(`\n✅ Todos los paquetes superan el mínimo de ${MIN_AGE_HOURS}h. Instalación permitida.\n`);
}

main().catch((err) => {
  // Error interno del script → no bloqueamos el install para no romper CI
  console.warn('\n⚠️  check-deps-age: error inesperado en el script, continuando...');
  console.warn(`   ${err.message}\n`);
  process.exit(0);
});
