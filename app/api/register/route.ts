import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/register
 *
 * Actúa como proxy entre el formulario del cliente y el Google Apps Script.
 * Esto evita el problema de CORS/no-cors que tiene el fetch directo desde el browser.
 *
 * El cuerpo esperado es el mismo payload del formulario en JSON.
 */
export async function POST(req: NextRequest) {
  const appsScriptUrl = process.env.APPS_SCRIPT_URL;

  if (!appsScriptUrl) {
    return NextResponse.json(
      { error: 'APPS_SCRIPT_URL no configurado en variables de entorno.' },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 });
  }

  try {
    const response = await fetch(appsScriptUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });

    // Apps Script a veces devuelve texto plano; manejamos ambos casos
    const text = await response.text();
    return NextResponse.json({ result: 'ok', raw: text });
  } catch (err) {
    console.error('[register] Error al llamar a Apps Script:', err);
    return NextResponse.json(
      { error: 'Error al conectar con el servidor de registro.' },
      { status: 502 }
    );
  }
}
