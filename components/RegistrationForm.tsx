"use client";

import { useState } from "react";
import { FORM_FIELDS, type FormFieldId } from "@/config/event";
import ArrowRight from "@/components/icons/ArrowRight";
import CheckIcon from "@/components/icons/CheckIcon";

type FormState = Record<FormFieldId, string>;
type Status = "idle" | "loading" | "success" | "error";

export default function RegistrationForm() {
  const [form, setForm] = useState<FormState>(
    Object.fromEntries(FORM_FIELDS.map((f) => [f.id, ""])) as FormState,
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (id: FormFieldId, value: string) =>
    setForm((prev) => ({ ...prev, [id]: value }));

  const handleSubmit = async () => {
    setErrorMessage("");

    // Validación
    const missing = FORM_FIELDS.filter((f) => f.required && !form[f.id].trim());
    if (missing.length > 0) {
      setErrorMessage(
        `Por favor completá: ${missing.map((f) => f.label).join(", ")}`,
      );
      return;
    }

    setStatus("loading");

    const payload = {
      ...form,
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Hubo un problema al enviar. Intentá de nuevo o escribinos directamente.",
      );
    }
  };

  // ── Estado de éxito ─────────────────────────────────────────
  if (status === "success") {
    return (
      <section
        className="bg-primary-container w-full px-5 py-[72px] md:px-16 md:py-24 rounded-2xl"
        id="inscripcion"
      >
        <div className="max-w-[760px] mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[rgba(165,210,157,0.15)] border border-[rgba(165,210,157,0.3)] flex items-center justify-center mx-auto mb-6">
              <CheckIcon />
            </div>
            <h3 className="text-[28px] font-semibold text-white mb-3">
              ¡Inscripción recibida!
            </h3>
            <p className="text-base text-white/50 leading-[1.6]">
              Te confirmamos tu participación por WhatsApp
              <br />
              en los próximos días. ¡Nos vemos en el campo!
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ── Formulario ──────────────────────────────────────────────
  return (
    <section
      className="bg-primary-container w-full px-5 py-[72px] md:px-16 md:py-24"
      id="inscripcion"
    >
      <div className="max-w-[760px] mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[rgba(165,210,157,0.7)] mb-4">
            Inscripción
          </p>
          <h2 className="text-[clamp(32px,4vw,48px)] font-semibold tracking-[-0.02em] text-white leading-[1.1] mb-2">
            Reservá tu lugar
          </h2>
          <p className="text-base text-white/[0.55] mt-3 leading-[1.6]">
            Completá tus datos. Te confirmamos tu participación por WhatsApp
            antes del evento.
          </p>
        </div>

        {/* Campos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FORM_FIELDS.map((field) => (
            <div
              key={field.id}
              className={`flex flex-col gap-2 ${field.col === 2 ? "sm:col-span-2" : ""}`}
            >
              <label
                htmlFor={field.id}
                className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/[0.45]"
              >
                {field.label}
                {field.required && (
                  <span className="text-[rgba(165,210,157,0.8)] ml-0.5">*</span>
                )}
              </label>
              <input
                id={field.id}
                type={field.type}
                value={form[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                autoComplete={field.autocomplete}
                required={field.required}
                className="bg-white/[0.07] border border-white/[0.12] rounded px-4 py-3.5 text-[15px] font-sans text-white outline-none transition-colors duration-200 appearance-none placeholder:text-white/[0.22] focus:border-[rgba(165,210,157,0.6)] focus:bg-white/10"
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="mt-9 flex flex-col gap-4 items-start">
          <button
            className="inline-flex items-center gap-3 bg-tertiary-fixed text-primary text-xs font-bold tracking-[0.12em] uppercase px-10 py-[18px] rounded border-none cursor-pointer font-sans transition-all duration-200 hover:opacity-90 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            onClick={handleSubmit}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Enviando…" : "Confirmar inscripción"}
            {status !== "loading" && <ArrowRight />}
          </button>

          {errorMessage && (
            <p className="text-[#f87171] text-[13px] m-0">{errorMessage}</p>
          )}

          <p className="text-xs text-white/30 leading-[1.55] max-w-[440px] m-0">
            Tus datos quedan únicamente en manos de la organización del torneo y
            se usan exclusivamente para coordinar el evento.
          </p>
        </div>
      </div>
    </section>
  );
}
