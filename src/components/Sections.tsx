import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { galleryImages } from "@/lib/places";
import { useLanguage } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as const } },
};

export function Intro() {
  const { t } = useLanguage();
  return (
    <section id="experience" className="bg-ivory py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
          className="aspect-[4/5] overflow-hidden"
        >
          <img
            src="https://scontent.fath3-3.fna.fbcdn.net/v/t39.30808-6/467612037_122149495880325713_3327412403446085826_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=7-BGUu_DeroQ7kNvwFFShgm&_nc_oc=AdrKLj8FdUnqbvm0HAa_FORXkixTrvwH4Z-7ESfFjoKscU5hDfBY7LxGwTW3tqqP5FIPt4GWu0jW2AtkzwgsoBZg&_nc_zt=23&_nc_ht=scontent.fath3-3.fna&_nc_gid=x0WTonwKH85aolXltCVasg&_nc_ss=7b2a8&oh=00_Af6e5HxmeA6kEwfm4b0cl-VSUIfZVhKeFpdqVX5gCz2C8g&oe=6A026235"
            alt="Iliovasilema apartment interior"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
        >
          <div className="text-xs uppercase tracking-[0.3em] text-sand mb-6">{t("intro.eyebrow")}</div>
          <h2 className="font-display text-4xl md:text-6xl leading-tight text-charcoal">{t("intro.title")}</h2>
          <p className="mt-8 text-lg leading-relaxed text-charcoal/75 max-w-xl">{t("intro.body")}</p>
        </motion.div>
      </div>
    </section>
  );
}

export function Gallery() {
  const { t } = useLanguage();
  return (
    <section className="bg-ivory pb-24 md:pb-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl text-charcoal">{t("gallery.title")}</h2>
          <p className="mt-3 text-charcoal/60">{t("gallery.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((src, i) => {
            const spans = ["row-span-2", "", "", "row-span-2", "", "row-span-2", "", "", ""];
            return (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
                className={`group relative overflow-hidden ${spans[i] || ""}`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover aspect-[4/3] transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-ivory opacity-0 group-hover:opacity-90 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 3c-4 0-7 2-9 5-2 3-3 7-3 11 4 0 8-1 11-3 3-2 5-5 5-9 0-2-1-4-4-4z" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const amenityIcons: { key: string; el: string; en: string; svg: React.ReactNode }[] = [
  { key: "sea", el: "Θέα Θάλασσα", en: "Sea View", svg: <path d="M2 16c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 20c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" /> },
  { key: "terrace", el: "Ιδιωτική Βεράντα", en: "Private Terrace", svg: <><path d="M3 21V8l9-5 9 5v13" /><path d="M3 21h18M9 21v-6h6v6" /></> },
  { key: "pool", el: "Πισίνα", en: "Pool", svg: <><path d="M2 18c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" /><path d="M6 14V5a3 3 0 016 0M12 14V5" /></> },
  { key: "kitchen", el: "Πλήρης Κουζίνα", en: "Full Kitchen", svg: <><path d="M6 3v18M18 3v18M3 9h18M3 15h18" /></> },
  { key: "wifi", el: "Wi-Fi", en: "High-Speed WiFi", svg: <><path d="M2 9a15 15 0 0120 0M5 12.5a10 10 0 0114 0M8.5 16a5 5 0 017 0" /><circle cx="12" cy="20" r="1" /></> },
  { key: "ac", el: "Κλιματισμός", en: "Air Conditioning", svg: <><circle cx="12" cy="12" r="3" /><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4" /></> },
  { key: "house", el: "Καθαριότητα", en: "Daily Housekeeping", svg: <><path d="M9 3v6l-4 6v6h14v-6l-4-6V3" /></> },
  { key: "concierge", el: "Concierge", en: "Concierge", svg: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></> },
];

export function Amenities() {
  const { t, lang } = useLanguage();
  return (
    <section className="bg-charcoal text-ivory py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.h2
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="font-display text-4xl md:text-5xl mb-12 text-center"
        >
          {t("amenities.title")}
        </motion.h2>
        <div className="flex gap-10 md:gap-16 overflow-x-auto pb-4 snap-x snap-mandatory md:justify-center md:flex-wrap">
          {amenityIcons.map((a, i) => (
            <motion.div
              key={a.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="snap-start flex flex-col items-center text-center min-w-[110px]"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-sand">
                {a.svg}
              </svg>
              <div className="mt-3 text-sm tracking-wide">{lang === "el" ? a.el : a.en}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Discover() {
  const { t } = useLanguage();
  const cards = [
    { to: "/beaches" as const, label: t("card.beaches"), icon: "", img: "https://dynamic-media.tacdn.com/media/photo-o/2f/e5/9d/63/caption.jpg?f=webp&w=1000&h=700" },
    { to: "/attractions" as const, label: t("card.attractions"), icon: "", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/6a/08/fb/crete.jpg?w=900&h=500&s=1" },
    { to: "/restaurants" as const, label: t("card.restaurants"), icon: "", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80" },
  ];
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl text-charcoal">{t("discover.title")}</h2>
          <p className="mt-3 text-charcoal/60 max-w-xl mx-auto">{t("discover.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((c, i) => (
            <motion.div
              key={c.to}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="tilt-card"
            >
              <Link to={c.to} className="block relative h-[420px] overflow-hidden group">
                <img src={c.img} alt={c.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />
                <div className="absolute inset-0 bg-sand/0 group-hover:bg-sand/20 transition-colors duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-ivory">
                  <div className="text-3xl mb-2">{c.icon}</div>
                  <div className="font-display text-3xl md:text-4xl">{c.label}</div>
                  <div className="mt-3 text-sm tracking-[0.25em] uppercase opacity-80 flex items-center gap-2">
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
