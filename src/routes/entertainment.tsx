import { createFileRoute } from "@tanstack/react-router";
import { CategoryListing } from "@/components/CategoryListing";
import { entertainment } from "@/lib/places";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/entertainment")({
  head: () => ({ meta: [
    { title: "Nearby Entertainment · Iliovasilema" },
    { name: "description", content: "The best entertainment spots in Heraklion." },
  ] }),
  component: EntertainmentPage,
});

function EntertainmentPage() {
  const { lang } = useLanguage();
  return (
    <CategoryListing
      category="entertainment"
      title={lang === "el" ? "Κοντινή Ψυχαγωγία" : "Nearby Entertainment"}
      subtitle={lang === "el"
        ? "Τα καλύτερα σημεία ψυχαγωγίας στο Ηράκλειο, από ζωντανή μουσική μέχρι πολιτιστικές εκδηλώσεις."
        : "The best entertainment spots in Heraklion, from live music to cultural events."}
      banner="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/4f/64/6d/let-s-get-wet-at-watercity.jpg?w=900&h=500&s=1"
      items={entertainment}
      hoverClass="hover-candle"
    />
  );
}