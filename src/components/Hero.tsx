import { useEffect, useState } from "react";
import { heroImages } from "@/lib/places";
import { useLanguage } from "@/lib/i18n";

export function Hero() {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % heroImages.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-charcoal">
      {heroImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1500ms]"
          style={{ opacity: i === idx ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            className={`w-full h-full object-cover ${i === idx ? "kenburns" : ""}`}
            key={`${src}-${i === idx ? idx : "static"}`}
          />
        </div>
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/70" />

      {/* Drifting olive leaf */}
      <svg
        className="absolute top-32 right-20 w-16 h-16 text-sand opacity-50 leaf-drift hidden md:block"
        viewBox="0 0 24 24" fill="currentColor"
      >
        <path d="M17 3c-4 0-7 2-9 5-2 3-3 7-3 11 4 0 8-1 11-3 3-2 5-5 5-9 0-2-1-4-4-4zm-2 4c1.5 0 2.5 1 2.5 2.5S16.5 12 15 12s-2.5-1-2.5-2.5S13.5 7 15 7z" />
      </svg>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1
          className="font-display text-ivory text-6xl md:text-8xl lg:text-9xl tracking-wide opacity-0"
          style={{ animation: "fadeUp 1.2s ease-out 0.3s forwards" }}
        >
          Iliovasilema
        </h1>
        <p
          className="mt-6 text-ivory/90 text-lg md:text-2xl font-light tracking-wide max-w-2xl opacity-0"
          style={{ animation: "fadeUp 1.2s ease-out 0.6s forwards" }}
        >
          {t("hero.tagline")}
        </p>
        <a
          href="#experience"
          className="mt-12 inline-flex items-center gap-3 text-ivory border border-ivory/40 px-8 py-3 text-sm uppercase tracking-[0.25em] hover:bg-ivory hover:text-charcoal transition-all opacity-0"
          style={{ animation: "fadeUp 1.2s ease-out 0.9s forwards" }}
        >
          {t("hero.cta")}
        </a>
         <a
          href="https://www.booking.com/hotel/gr/iliovasilema-episkope.el.html"
          className="mt-12 inline-flex items-center gap-3 text-ivory border border-ivory/40 px-8 py-3 text-sm uppercase tracking-[0.25em] hover:bg-ivory hover:text-charcoal transition-all opacity-0"
          style={{ animation: "fadeUp 1.2s ease-out 0.9s forwards" }}
        >
          {t("hero.gta")}
        </a>
         <a
          href="tel:+306978625195"
          className="mt-12 inline-flex items-center gap-3 text-ivory border border-ivory/40 px-8 py-3 text-sm uppercase tracking-[0.25em] hover:bg-ivory hover:text-charcoal transition-all opacity-0"
          style={{ animation: "fadeUp 1.2s ease-out 0.9s forwards" }}
        >
          {t("hero.mta")}
        </a>

        <a
          href="#experience"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/70 scroll-arrow"
          aria-label="Scroll"
        >
          <svg width="24" height="36" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 4v22" />
            <path d="M5 20l7 7 7-7" />
          </svg>
        </a>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
