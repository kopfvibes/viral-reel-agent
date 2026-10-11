import { z } from "zod";
import { StageSchema } from "./stages";

// Form einer Zeile aus public.content_items (siehe supabase/migrations/001_pipeline.sql).
export const ContentItemSchema = z.object({
  id: z.uuid(),
  user_id: z.uuid(),
  title: z.string(),
  topic: z.string().nullable(),
  stage: StageSchema,
  created_at: z.string(),
  updated_at: z.string(),
});

export type ContentItem = z.infer<typeof ContentItemSchema>;
