import { z } from "zod";

// Einzige Quelle für Namen und Reihenfolge der Stationen.
// Die Werte müssen zum check-Constraint in supabase/migrations/001_pipeline.sql passen.
export const STATIONS = [
  { id: "radar", label: "Augen" },
  { id: "autor", label: "Autor" },
  { id: "stimme", label: "Stimme" },
  { id: "regisseur", label: "Regisseur" },
  { id: "studio", label: "Studio" },
] as const;

export const END_STAGES = ["fertig", "verworfen"] as const;

export type StationId = (typeof STATIONS)[number]["id"];
export type Stage = StationId | (typeof END_STAGES)[number];

const STAGE_VALUES: [Stage, ...Stage[]] = [
  STATIONS[0].id,
  ...STATIONS.slice(1).map((station) => station.id),
  ...END_STAGES,
];

export const StageSchema = z.enum(STAGE_VALUES);

/** Nächste Stage nach `stage`, oder null, wenn es nicht weitergeht. Nach Studio kommt "fertig". */
export function nextStage(stage: Stage): Stage | null {
  const index = STATIONS.findIndex((station) => station.id === stage);
  if (index === -1) return null;
  return STATIONS[index + 1]?.id ?? "fertig";
}
