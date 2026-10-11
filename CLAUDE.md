@AGENTS.md

# Viral Reel Agent

Content-Maschine: Thema rein, fertiges 9:16-Video raus. Ein Nutzer, gesteuert über ein eigenes Dashboard.
Ein Thema ist ein `content_item` und wandert durch fünf Stationen:

1. **Augen** (`radar`): Quellen scannen, Themen gruppieren und ranken, Thema wählen
2. **Autor** (`autor`): Hook-Varianten und Skript, Faktencheck, Freigabe
3. **Stimme** (`stimme`): eigene Aufnahme oder ElevenLabs, Wort-Timing
4. **Regisseur** (`regisseur`): KI plant eine Szenen-Spec (Zod-validiert, automatische Reparatur)
5. **Studio** (`studio`): Remotion rendert lokal über einen Render-Worker, Vorschau, Freigabe

Danach `fertig` oder `verworfen`. Aktuell sind die Stationen nur Platzhalter mit Status.

## Stack

- Next.js (App Router, TypeScript, `src/`-Ordner), Tailwind CSS, kein zusätzliches UI-Framework
- Supabase: Auth (E-Mail + Passwort), Postgres, Storage
- Zod für Validierung
- Später: Remotion und ein Render-Worker als Node-Skript (TypeScript) im Repo

## Ordnerstruktur

```
src/
  proxy.ts                  # Auth-Schutz (früher "middleware"): ohne Session -> /login
  app/
    login/                  # Login-Seite + Server Actions (login, logout)
    pipeline/               # Board mit fünf Spalten + Server Actions
    api/reel-worker/        # für den Render-Worker (Station 5), schützt sich per Token, nicht per Session
  lib/
    stages.ts               # EINZIGE Quelle für Namen und Reihenfolge der Stationen
    content-items.ts        # Zod-Schema für eine content_items-Zeile
    supabase/
      env.ts                # Zod-Prüfung der öffentlichen Env-Variablen
      browser.ts            # Client für Client Components
      server.ts             # Client für Server Components / Server Actions
      admin.ts              # Service-Role-Client, nur Server (import 'server-only'), umgeht RLS
supabase/migrations/        # SQL-Migrationen, nummeriert
```

## Konventionen

- **Jede Tabelle** hat `user_id uuid not null references auth.users(id) on delete cascade`
  und Row Level Security mit Policies `user_id = auth.uid()` für select, insert, update, delete.
- **Migrationen nummeriert**: `001_...sql`, `002_...sql`. Bestehende Migrationen nie ändern, immer eine neue anlegen.
  Der Nutzer spielt Migrationen selbst ein.
- **Kein `any`**. Unbekannte Daten als `unknown` behandeln und mit Zod parsen.
- **Zod an jeder Systemgrenze**: Formulardaten, Datenbank-Antworten, API-Requests, KI-Ausgaben, Env-Variablen.
- **Keine Keys im Code**. Alles über Env-Variablen (`.env.local`, nie committet). Neue Variablen in `.env.example` eintragen (ohne Werte).
- Stationsnamen und Reihenfolge nur aus `src/lib/stages.ts` nehmen, nie hart kodieren.
  Neue Stage-Werte brauchen auch eine Migration für den `check`-Constraint.
- Der Admin-Client (`admin.ts`) umgeht RLS: nur wo nötig, dann immer selbst nach `user_id` filtern.

## Befehle

- `npm run dev`: Entwicklungsserver auf http://localhost:3000
- `npm run build`: Produktions-Build
- `npm run lint`: ESLint
