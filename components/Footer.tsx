import { EVENT } from "@/config/event";
import {
  IconBrandInstagram,
  IconBrandInstagramFilled,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-5 pt-10 pb-6 md:px-16 md:pt-12 md:pb-8 border-t-[0.5px] border-outline-variant flex flex-col items-center">
      <div className="w-full flex flex-col items-center md:flex-row md:justify-between gap-10 md:gap-0">
        {/* Izquierda: Logo */}
        <div className="flex items-center md:w-1/3 md:justify-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-golf-tank-footer.svg"
            alt="Golf Tank"
            className="h-24 w-auto"
          />
        </div>

        {/* Centro: Links (Web e Instagram) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:w-auto">
          <Link
            href="https://www.instagram.com/golftank_/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity group"
            aria-label="Instagram Golf Tank"
          >
            <IconBrandInstagram
              stroke={2}
              size={32}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-base font-medium w-20">Golf Tank</span>
          </Link>

          <div className="hidden md:block w-px h-10 bg-primary/50" />

          <Link
            href="https://www.instagram.com/fourwindsarg/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity group"
            aria-label="Instagram Fourwinds"
          >
            <IconBrandInstagramFilled
              stroke={2}
              size={32}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-base font-medium">Fourwinds</span>
          </Link>

          <div className="hidden md:block w-px h-10 bg-primary/50" />

          <Link
            href="https://fourwinds.com.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-bold text-primary hover:underline transition-all"
          >
            fourwinds.com.ar
          </Link>
        </div>

        {/* Derecha: Info del evento */}
        <div className="flex flex-col items-center md:items-end md:w-1/3 gap-1">
          <span className="text-xs text-outline tracking-[0.04em]">
            {EVENT.edition}
          </span>
          <span className="text-xs text-outline tracking-[0.04em]">
            {EVENT.venue.name} · {EVENT.venue.location}
          </span>
        </div>
      </div>

      {/* Firma */}
      <div className="mt-4 pt-3 w-full flex justify-center text-center border-t-[0.5px] border-outline-variant/30">
        <p className="text-[11px] text-on-surface-variant/70 tracking-wide">
          Desarrollado por:{" "}
          <Link
            href="https://danielfabiani.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary transition-colors font-medium"
          >
            Daniel Fabiani
          </Link>
        </p>
      </div>
    </footer>
  );
}
