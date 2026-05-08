import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { MiniMap } from "./MiniMap";
import { supabase } from "@/lib/supabase";

export function ContactSection() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const { error } = await supabase.from("contacts").insert([form]);
    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" className="bg-ivory py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-charcoal">{t("contact.title")}</h2>
          <p className="mt-3 text-charcoal/60">{t("contact.subtitle")}</p>

          <div className="mt-8 overflow-hidden border border-border">
            <MiniMap center={[35.28686659750034, 25.232219986506912]}   markerLabel="Iliovasilema" className="w-full h-[420px]" />
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <Field label={t("form.name")} type="text" name="name" value={form.name} onChange={handleChange} required />
          <Field label={t("form.email")} type="email" name="email" value={form.email} onChange={handleChange} required />
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-2">{t("form.message")}</label>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-charcoal/30 focus:border-sand outline-none py-2 text-charcoal"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-4 w-full bg-sand text-charcoal py-4 text-sm tracking-[0.25em] uppercase hover:bg-sand-deep transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "..." : status === "success" ? t("form.sent") : t("form.submit")}
          </button>

          {status === "error" && (
            <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-2">{label}</label>
      <input {...rest} className="w-full bg-transparent border-b border-charcoal/30 focus:border-sand outline-none py-2 text-charcoal" />
    </div>
  );
}