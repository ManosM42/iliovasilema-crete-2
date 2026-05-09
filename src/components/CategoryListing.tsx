import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import type { Place, Category } from "@/lib/places";

interface Props {
  category: Category;
  title: string;
  subtitle: string;
  banner: string;
  items: Place[];
  hoverClass: string;
}

export function CategoryListing({ category, title, subtitle, banner, items, hoverClass }: Props) {
  const { lang, t } = useLanguage();

  const badgeKey =
    category === "beaches" ? "badge.beach"
    : category === "attractions" ? "badge.attraction"
    : category === "entertainment" ? "badge.entertainment"
    : "badge.restaurant";


  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-charcoal">
        <img src={banner} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 to-charcoal/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-ivory">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl"
          >{title}</motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 max-w-xl text-ivory/85"
          >{subtitle}</motion.p>
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to="/$category/$slug"
                params={{ category, slug: p.slug }}
                className={`group block bg-card overflow-hidden ${hoverClass}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-ivory/90 text-charcoal text-[10px] uppercase tracking-[0.2em]">
                    {t(badgeKey as "badge.beach")}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl text-charcoal">{p.name}</h3>
                    {p.rating && <span className="text-sand text-sm">{p.rating}</span>}
                  </div>
                  <div className="mt-2 text-sm text-charcoal/60">{p.distance} {t("label.distance")}</div>
                  <p className="mt-3 text-sm text-charcoal/70 line-clamp-3">{p.desc[lang]}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
