# Viral Reel Agent

Statische Web-App für Reel-Ideen, Hooks, Skripte, Captions, CTA, 5 Hashtags, Hook-Score und einfache Reel-Diagnose.

## Features
- Einzelnes Reel generieren (Hook, Skript, Caption, CTA, 5 Hashtags, Hook-Score).
- **Auto-Wachstum / Batch-Generator**: erzeugt mit einem Klick mehrere Reels auf einmal (bis zu 20), automatisch sortiert nach Hook-Score – so entsteht ohne manuelles Wiederholen ein ganzer Content-Vorrat.
- **Profil-Analyse & Wachstumsplan**: eigene Kennzahlen (Follower, Ø Views, Retention, Shares/Saves, Postings/Woche) eintragen und einen priorisierten Aktionsplan bekommen, was den größten Wachstumshebel für `@alltagsrebell` darstellt.
- `@alltagsrebell` hat einen eigenen, deutlich größeren Hook-/Pointen-Pool (zusätzlich zur Basis-Datenbank), damit der Batch-Generator viel Abwechslung liefert statt sich zu wiederholen.
- Reel-Diagnose anhand von Views/Retention/Shares für einzelne, bereits gepostete Reels.
- Optionaler Versand an Make (einzelnes Reel oder ganzer Batch) für automatisches Posten.

## Dateien
- index.html
- styles.css
- app.js

## GitHub Pages aktivieren
1. Repository öffnen.
2. Settings öffnen.
3. Links Pages wählen.
4. Unter Build and deployment: Source = Deploy from a branch.
5. Branch = main, Folder = /(root).
6. Save drücken.
7. Nach kurzer Zeit zeigt GitHub die öffentliche URL an.

## Make verbinden
1. In Make ein neues Scenario anlegen.
2. Webhooks > Custom webhook.
3. Webhook erstellen und URL kopieren.
4. URL unten in der App einfügen und speichern.
5. Reel generieren.
6. An Make senden drücken.

Hinweis: Diese MVP-Version läuft vollständig im Browser und braucht keinen API-Key. Ein echtes KI-Backend kann später ergänzt werden.
