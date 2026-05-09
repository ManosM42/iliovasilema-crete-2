import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { findPlace, type Category } from "@/lib/places";
import { useLanguage } from "@/lib/i18n";
import { MiniMap } from "@/components/MiniMap";

export const Route = createFileRoute("/$category/$slug")({
  beforeLoad: ({ params }) => {
    const cats: Category[] = ["beaches", "attractions", "restaurants", "entertainment"];
    if (!cats.includes(params.category as Category)) throw notFound();
    if (!findPlace(params.category as Category, params.slug)) throw notFound();
  },
  component: PlaceDetail,
  notFoundComponent: () => (
    <div className="pt-32 text-center">
      <h1 className="font-display text-4xl">Δεν βρέθηκε / Not found</h1>
      <Link to="/" className="mt-6 inline-block underline">Home</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="pt-32 text-center text-charcoal/70">{error.message}</div>,
});

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] as const },
});

function PlaceDetail() {
  const { category, slug } = Route.useParams();
  const place = findPlace(category as Category, slug)!;
  const { lang, t } = useLanguage();

  const backKey =
    category === "beaches" ? "back.beaches"
    : category === "attractions" ? "back.attractions"
    : category === "entertainment" ? "back.entertainment"
    : "back.restaurants";

  const badgeKey =
    category === "beaches" ? "badge.beach"
    : category === "attractions" ? "badge.attraction"
    : category === "entertainment" ? "badge.entertainment"
    : "badge.restaurant";

  const backTo = `/${category}` as "/beaches";

  return (
    <>
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-charcoal">
        <img src={place.image} alt={place.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/80" />
        <div className="relative z-10 h-full flex items-end pb-16 px-6 lg:px-10">
          <div className="max-w-[1400px] mx-auto w-full text-ivory">
            <motion.div {...stagger(0)} className="flex items-center gap-3 text-xs uppercase tracking-[0.25em]">
              <span className="px-3 py-1 bg-sand text-charcoal">{t(badgeKey as "badge.beach")}</span>
              <span className="opacity-80">{place.distance} {t("label.distance")}</span>
              {place.rating && <span className="opacity-90">· {place.rating}</span>}
            </motion.div>
            <motion.h1 {...stagger(1)} className="mt-4 font-display text-5xl md:text-7xl">{place.name}</motion.h1>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div {...stagger(0)}>
            <Link to={backTo} className="text-sm text-charcoal/60 hover:text-sand transition-colors">{t(backKey as "back.beaches")}</Link>
          </motion.div>

          <div className="mt-8 grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.p {...stagger(1)} className="text-lg leading-relaxed text-charcoal/80">
                {place.desc[lang]}
              </motion.p>

              <motion.div {...stagger(2)} className="mt-10 grid sm:grid-cols-3 gap-6 border-t border-border pt-8">
                <Info label={t("info.hours")} value={place.hours[lang]} />
                <Info label={t("info.best")} value={place.best[lang]} />
                <Info label={t("info.tip")} value={place.tip[lang]} />
              </motion.div>
            </div>

            <motion.div {...stagger(3)} className="overflow-hidden border border-border">
              <MiniMap center={place.coords} markerLabel={place.name} className="w-full h-[400px]" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-sand mb-2">{label}</div>
      <div className="text-charcoal/80 text-sm leading-relaxed">{value}</div>
    </div>
  );
}
