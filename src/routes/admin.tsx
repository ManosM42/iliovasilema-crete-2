import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [selected, setSelected] = useState<Contact | null>(null);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);

  const ADMIN_PASSWORD = "iliovasilema2024"; // change this

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

useEffect(() => {
  if (!authed) return;
  supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })
    .then(({ data, error }) => {
      console.log("DATA:", data);
      console.log("ERROR:", error);
      if (error) setStatus("error");
      else {
        setContacts(data ?? []);
        setStatus("success");
      }
    });
}, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm"
        >
          <h1 className="font-display text-4xl text-charcoal text-center mb-2">Admin</h1>
          <p className="text-charcoal/50 text-center text-sm tracking-widest uppercase mb-10">Iliovasilema</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-charcoal/30 focus:border-sand outline-none py-2 text-charcoal"
              />
            </div>
            {authError && <p className="text-red-400 text-sm text-center">Incorrect password</p>}
            <button
              type="submit"
              className="w-full bg-sand text-charcoal py-4 text-sm tracking-[0.25em] uppercase hover:bg-sand-deep transition-colors"
            >
              Enter
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-5xl text-charcoal mb-2">Messages</h1>
          <p className="text-charcoal/50 text-sm tracking-widest uppercase mb-12">
            {contacts.length} {contacts.length === 1 ? "message" : "messages"} received
          </p>

          {status === "loading" && (
            <p className="text-charcoal/40 tracking-widest uppercase text-sm">Loading...</p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm">Could not load messages. Check Supabase connection.</p>
          )}

          {status === "success" && contacts.length === 0 && (
            <p className="text-charcoal/40 tracking-widest uppercase text-sm">No messages yet.</p>
          )}

          <div className="space-y-4">
            {contacts.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelected(selected?.id === c.id ? null : c)}
                className="border border-border bg-white/40 px-6 py-5 cursor-pointer hover:border-sand transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-charcoal font-medium">{c.name}</p>
                    <p className="text-charcoal/50 text-sm">{c.email}</p>
                  </div>
                  <p className="text-charcoal/30 text-xs whitespace-nowrap mt-1">
                    {new Date(c.created_at).toLocaleDateString("el-GR", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </p>
                </div>

                {selected?.id === c.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <p className="text-charcoal/70 text-sm leading-relaxed whitespace-pre-wrap">{c.message}</p>
                    
                     <a href={`mailto:${c.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-sand hover:text-sand-deep transition-colors"
                    >
                      Reply via email →
                    </a>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
