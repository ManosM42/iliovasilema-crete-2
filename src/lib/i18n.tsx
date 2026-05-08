import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "el" | "en";

const dict = {
  el: {
    "nav.experience": "Εμπειρία",
    "nav.beaches": "Κοντινές Παραλίες",
    "nav.attractions": "Κοντινά Αξιοθέατα",
    "nav.restaurants": "Κοντινά Restaurants",
    "nav.contact": "Επικοινωνία",
    "hero.tagline": "Εκεί που ο ήλιος αγγίζει τη θάλασσα",
    "hero.gta": "Κάνε Κράτηση",
    "hero.cta": "Εξερεύνησε",
    "hero.mta": "Καλέστε μας",
    "intro.eyebrow": "Πολυτελές Διαμέρισμα · Ηράκλειο, Κρήτη",
    "intro.title": "Ένα καταφύγιο φωτός πάνω από το Αιγαίο",
    "intro.body": "Στην καρδιά του Ηρακλείου, λίγα βήματα από το Ενετικό Λιμάνι, το Iliovasilema είναι ένα διαμέρισμα όπου η κρητική φιλοξενία συναντά τη σύγχρονη πολυτέλεια. Πανοραμική θέα στο Αιγαίο, ιδιωτική βεράντα, και εκείνο το χρυσό φως του δειλινού που έδωσε στο σπίτι το όνομά του.",
    "gallery.title": "Η Συλλογή",
    "gallery.subtitle": "Στιγμές από τo διαμέρισμα και την Κρήτη",
    "amenities.title": "Παροχές",
    "discover.title": "Ανακαλύψτε το Ηράκλειο",
    "discover.subtitle": "Προσεκτικά επιλεγμένες εμπειρίες σε λίγα λεπτά από το Iliovasilema",
    "card.beaches": "Κοντινές Παραλίες",
    "card.attractions": "Κοντινά Αξιοθέατα",
    "card.restaurants": "Κοντινά Restaurants",
    "contact.title": "Επικοινωνία & Κρατήσεις",
    "contact.subtitle": "Πείτε μας πότε θέλετε να έρθετε. Θα σας απαντήσουμε εντός 24 ωρών.",
    "form.name": "Όνομα",
    "form.email": "Email",
    "form.checkin": "Άφιξη",
    "form.checkout": "Αναχώρηση",
    "form.message": "Μήνυμα",
    "form.submit": "Αποστολή",
    "form.sent": "Ευχαριστούμε — θα επικοινωνήσουμε σύντομα.",
    "back.beaches": "← Κοντινές Παραλίες",
    "back.attractions": "← Κοντινά Αξιοθέατα",
    "back.restaurants": "← Κοντινά Restaurants",
    "badge.beach": "Παραλία",
    "badge.attraction": "Αξιοθέατο",
    "badge.restaurant": "Εστιατόριο",
    "label.distance": "από το Iliovasilema",
    "info.hours": "Ώρες",
    "info.best": "Ιδανική στιγμή",
    "info.tip": "Συμβουλή",
    "footer.tagline": "Iliovasilema · Πολυτελές διαμέρισμα στο Ηράκλειο",
    "footer.rights": "Με επιφύλαξη παντός δικαιώματος",
  },
  en: {
    "nav.experience": "Experience",
    "nav.beaches": "Nearby Beaches",
    "nav.attractions": "Nearby Attractions",
    "nav.restaurants": "Nearby Restaurants",
    "nav.contact": "Contact",
    "hero.tagline": "Where the sun meets the sea",
    "hero.gta": "Book Now",
    "hero.cta": "Explore",
    "hero.mta": "Call Us",
    "intro.eyebrow": "Luxury Apartment · Heraklion, Crete",
    "intro.title": "A sanctuary of light above the Aegean",
    "intro.body": "In the heart of Heraklion, steps from the Venetian Harbor, Iliovasilema is an apartment where Cretan hospitality meets quiet, modern luxury. Panoramic Aegean views, a private terrace, and the golden hour light that gave this home its name.",
    "gallery.title": "The Collection",
    "gallery.subtitle": "Moments from the apartment and the island",
    "amenities.title": "Amenities",
    "discover.title": "Discover Heraklion",
    "discover.subtitle": "Carefully chosen experiences minutes from Iliovasilema",
    "card.beaches": "Nearby Beaches",
    "card.attractions": "Nearby Attractions",
    "card.restaurants": "Nearby Restaurants",
    "contact.title": "Contact & Reservations",
    "contact.subtitle": "Tell us when you'd like to come. We reply within 24 hours.",
    "form.name": "Name",
    "form.email": "Email",
    "form.checkin": "Check-in",
    "form.checkout": "Check-out",
    "form.message": "Message",
    "form.submit": "Send",
    "form.sent": "Thank you — we'll be in touch shortly.",
    "back.beaches": "← Nearby Beaches",
    "back.attractions": "← Nearby Attractions",
    "back.restaurants": "← Nearby Restaurants",
    "badge.beach": "Beach",
    "badge.attraction": "Attraction",
    "badge.restaurant": "Restaurant",
    "label.distance": "from Iliovasilema",
    "info.hours": "Hours",
    "info.best": "Best time",
    "info.tip": "Insider tip",
    "footer.tagline": "Iliovasilema · Luxury apartment in Heraklion",
    "footer.rights": "All rights reserved",
  },
} as const;

type Key = keyof typeof dict.el;

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string; }

const LangCtx = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("el");
  const t = (k: Key) => dict[lang][k] ?? k;
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export function useLanguage() {
  const c = useContext(LangCtx);
  if (!c) throw new Error("LanguageProvider missing");
  return c;
}
