# Viral Reel Agent

Content-Maschine: Thema rein, fertiges 9:16-Video raus. Details zu Stack und Konventionen stehen in `CLAUDE.md`.

## Einrichten

1. Abhängigkeiten installieren: `npm install`
2. `.env.example` nach `.env.local` kopieren und die Supabase-Werte eintragen
   (Supabase-Dashboard > Project Settings > API).
3. Migration `supabase/migrations/001_pipeline.sql` im Supabase-Dashboard im SQL Editor ausführen.
4. Im Supabase-Dashboard unter Authentication > Users einen Nutzer mit E-Mail und Passwort anlegen.
5. `npm run dev` starten und http://localhost:3000 öffnen.
