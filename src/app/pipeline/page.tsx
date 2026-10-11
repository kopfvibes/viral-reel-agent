import { Suspense } from "react";
import { z } from "zod";
import { ContentItemSchema } from "@/lib/content-items";
import { STATIONS } from "@/lib/stages";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../login/actions";
import { advanceItem, createItem } from "./actions";

export default function PipelinePage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Pipeline</h1>
        <form action={logout}>
          <button type="submit" className="text-sm text-zinc-600 underline">
            Abmelden
          </button>
        </form>
      </header>

      <form action={createItem} className="flex flex-wrap items-end gap-2">
        <label className="flex flex-col gap-1 text-sm">
          Titel
          <input name="title" required maxLength={200} className="rounded border border-zinc-300 px-3 py-2" />
        </label>
        <label className="flex flex-1 flex-col gap-1 text-sm">
          Thema (optional)
          <input name="topic" maxLength={2000} className="rounded border border-zinc-300 px-3 py-2" />
        </label>
        <button type="submit" className="rounded bg-zinc-900 px-4 py-2 text-white">
          Neues Thema
        </button>
      </form>

      <Suspense fallback={<p className="text-sm text-zinc-500">Lade Einträge …</p>}>
        <Board />
      </Suspense>
    </main>
  );
}

// Lädt die Einträge pro Request (Cookies/Session), deshalb in <Suspense>.
async function Board() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select("*")
    .in(
      "stage",
      STATIONS.map((station) => station.id),
    )
    .order("created_at", { ascending: true });
  if (error) throw new Error(`Einträge konnten nicht geladen werden: ${error.message}`);

  const items = z.array(ContentItemSchema).parse(data);

  return (
    <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-5">
      {STATIONS.map((station) => {
        const stationItems = items.filter((item) => item.stage === station.id);
        return (
          <section key={station.id} className="flex flex-col gap-3 rounded-lg bg-zinc-100 p-3">
            <h2 className="font-medium">
              {station.label} <span className="text-zinc-500">({stationItems.length})</span>
            </h2>
            {stationItems.map((item) => (
              <article key={item.id} className="flex flex-col gap-2 rounded border border-zinc-200 bg-white p-3 shadow-sm">
                <h3 className="font-medium">{item.title}</h3>
                {item.topic && <p className="text-sm text-zinc-600">{item.topic}</p>}
                <form action={advanceItem}>
                  <input type="hidden" name="id" value={item.id} />
                  <button type="submit" className="w-full rounded border border-zinc-300 px-3 py-1 text-sm hover:bg-zinc-50">
                    Weiter zur nächsten Station
                  </button>
                </form>
              </article>
            ))}
          </section>
        );
      })}
    </div>
  );
}
