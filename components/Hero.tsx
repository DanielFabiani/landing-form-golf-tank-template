import Image from "next/image";

export default function Hero() {
  return (
    <header
      className="relative w-full h-svh min-h-[580px] sm:min-h-[600px] flex flex-col items-center justify-center py-6 sm:py-0 overflow-hidden"
      id="inicio"
    >
      <Image
        className="absolute inset-0 w-full h-full object-cover object-[center_50%]"
        src="/campo-hero-bg-horzontal.jpg"
        alt="Vista aérea del campo de golf"
        fill
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40 bg-[linear-gradient(to_top,rgba(0,21,3,0.8)_0%,rgba(0,21,3,0.4)_50%,rgba(0,21,3,0.2)_100%)]" />

      <div className="relative z-[2] flex flex-col items-center text-center px-5 my-auto sm:my-10 py-2 sm:py-0">
        {/* Badge edición */}
        <p
          className="text-sm sm:text-xl font-semibold tracking-[0.18em] uppercase text-white mb-2 sm:mb-6 animate-fadeUp"
          style={{ animationDelay: "0.1s" }}
        >
          Edición 1 &nbsp;|&nbsp; 2026
        </p>
        <p
          className="text-[10px] sm:text-sm font-light tracking-[0.18em] uppercase text-white/50 mb-6 sm:mb-6 animate-fadeUp"
          style={{ animationDelay: "0.1s" }}
        >
          Invitación personal no transferible
        </p>

        {/* Logo Golf Tank */}
        <div
          className="w-[75%] sm:w-[70%] md:w-[55%] max-w-[550px] animate-fadeUp flex flex-col items-center justify-center gap-2 sm:gap-3"
          style={{ animationDelay: "0.25s" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-golf-tank.svg"
            alt="Golf Tank"
            className="w-full h-auto brightness-0 invert drop-shadow-md"
          />
          <img
            src="by-fourwinds.svg"
            alt="By Fourwinds"
            className="w-full h-auto brightness-0 invert drop-shadow-md"
          />
        </div>

        {/* Presentado por */}
        <p
          className="text-[11px] sm:text-xl font-medium sm:font-semibold tracking-[0.2em] sm:tracking-[0.16em] mt-8 sm:mt-10 uppercase text-white/60 sm:text-white/80 animate-fadeUp drop-shadow"
          style={{ animationDelay: "0.4s" }}
        >
          Presentado por
        </p>

        {/* Logos sponsors */}
        <div
          className="flex items-center justify-center gap-6 sm:gap-10 animate-fadeUp w-[65%] sm:w-[70%] md:w-[55%] max-w-[550px]"
          style={{ animationDelay: "0.55s" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lakaut.svg"
            alt="Lakaut"
            className="w-[55%] h-auto brightness-0 invert drop-shadow-md"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/FID.svg"
            alt="FID by Lakaut"
            className="w-[45%] h-auto brightness-0 invert drop-shadow-md"
          />
        </div>
      </div>
    </header>
  );
}
