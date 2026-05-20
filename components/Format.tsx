import { EVENT } from '@/config/event';

export default function Format() {
  return (
    <section className="py-24 border-b-[0.5px] border-outline-variant" id="formato">
      <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-secondary mb-4">
        Formato
      </p>
      <h2 className="text-[clamp(32px,4vw,48px)] font-semibold tracking-[-0.02em] text-primary leading-[1.1] mb-2">
        Modalidad de juego
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant border border-outline-variant rounded-lg overflow-hidden mt-14">
        {EVENT.format.map((item, i) => {
          const hl = item.highlight;
          return (
            <div
              key={i}
              className={`${hl ? 'bg-primary' : 'bg-surface'} py-9 px-8 flex flex-col gap-3`}
            >
              <span
                className={`text-[10px] font-bold tracking-[0.16em] uppercase ${
                  hl ? 'text-white/[0.45]' : 'text-outline'
                }`}
              >
                {item.label}
              </span>
              <span
                className={`text-[15px] font-medium leading-[1.55] ${
                  hl ? 'text-white' : 'text-on-surface'
                }`}
              >
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
