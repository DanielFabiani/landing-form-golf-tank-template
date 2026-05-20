import { EVENT } from '@/config/event';

export default function EventInfo() {
  return (
    <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-[1fr_1px_1fr] sm:gap-0 sm:items-start sm:py-16 sm:border-b-[0.5px] sm:border-outline-variant">
      {/* Fecha */}
      <div className="px-0 sm:px-12 sm:first:pl-0 sm:last:pr-0">
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-outline mb-3">
          Fecha
        </p>
        <p className="text-[clamp(28px,4vw,38px)] font-bold tracking-[-0.02em] text-primary leading-[1.05] mb-1 whitespace-pre-line">
          {EVENT.date.display.replace('\\n', '\n')}
        </p>
        <p className="text-[15px] text-on-surface-variant">{EVENT.date.year}</p>
      </div>

      {/* Divisor vertical */}
      <div className="hidden sm:block bg-outline-variant h-16 self-center" />

      {/* Lugar */}
      <div className="px-0 sm:px-12 sm:first:pl-0 sm:last:pr-0">
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-outline mb-3">
          Lugar
        </p>
        <p className="text-[clamp(28px,4vw,38px)] font-bold tracking-[-0.02em] text-primary leading-[1.05] mb-1 whitespace-pre-line">
          {EVENT.venue.name.replace(' ', '\n')}
        </p>
        <p className="text-[15px] text-on-surface-variant">{EVENT.venue.location}</p>
      </div>
    </div>
  );
}
