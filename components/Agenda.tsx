import Image from "next/image";
import { EVENT } from "@/config/event";

export default function Agenda() {
  return (
    <section
      className="py-24 border-b-[0.5px] border-outline-variant"
      id="agenda"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
        <div>
          <div className="max-w-[460px] mb-16">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-secondary mb-4">
              Agenda del día
            </p>
            <h2 className="text-[clamp(32px,4vw,48px)] font-semibold tracking-[-0.02em] text-primary leading-[1.1] mb-2">
              Cómo va a ser la jornada
            </h2>
            <p className="text-base text-on-surface-variant leading-[1.65] mt-3">
              Recepción temprana, salida simultánea, cocktail de cierre con
              palabras de los directivos y entrega de premios.
            </p>
          </div>

          <div className="flex flex-col max-w-[600px]">
            {EVENT.agenda.map((item, i) => {
              const isLast = i === EVENT.agenda.length - 1;
              return (
                <div
                  key={i}
                  className="grid grid-cols-[100px_1px_1fr] sm:grid-cols-[120px_1px_1fr] pb-10 last:pb-0"
                >
                  {/* Tiempo */}
                  <div
                    className={`text-xs sm:text-[13px] font-semibold tracking-[0.02em] pt-[3px] text-right pr-4 sm:pr-6 ${
                      item.highlight
                        ? "text-primary"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {item.time}
                  </div>

                  {/* Línea vertical + dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 border-2 ${
                        item.highlight
                          ? "bg-primary border-primary"
                          : "bg-surface border-outline-variant"
                      }`}
                    />
                    {!isLast && (
                      <div className="flex-1 w-px bg-outline-variant min-h-[32px] my-1" />
                    )}
                  </div>

                  {/* Descripción */}
                  <div className="pl-4 sm:pl-6">
                    <p
                      className={`text-base leading-[1.4] ${
                        item.highlight
                          ? "font-semibold text-primary"
                          : "font-medium text-on-surface"
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative w-full h-full min-h-[400px] lg:min-h-full rounded-2xl overflow-hidden">
          <Image
            src="/imagen-agenda.jpeg"
            alt="Agenda de la jornada"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
