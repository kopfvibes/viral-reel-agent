"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ContentItemSchema } from "@/lib/content-items";
import { nextStage } from "@/lib/stages";
import { createClient } from "@/lib/supabase/server";

const CreateItemSchema = z.object({
  title: z.string().trim().min(1).max(200),
  topic: z
    .string()
    .trim()
    .max(2000)
    .transform((value) => value || null),
});

export async function createItem(formData: FormData) {
  const input = CreateItemSchema.parse({
    title: formData.get("title"),
    topic: formData.get("topic") ?? "",
  });

  const supabase = await createClient();
  // user_id setzt die Datenbank selbst (default auth.uid()), RLS prüft es.
  const { error } = await supabase.from("content_items").insert(input);
  if (error) throw new Error(`Thema konnte nicht angelegt werden: ${error.message}`);

  revalidatePath("/pipeline");
}

const AdvanceItemSchema = z.object({ id: z.uuid() });

export async function advanceItem(formData: FormData) {
  const { id } = AdvanceItemSchema.parse({ id: formData.get("id") });

  const supabase = await createClient();
  const { data, error } = await supabase.from("content_items").select("*").eq("id", id).single();
  if (error) throw new Error(`Eintrag nicht gefunden: ${error.message}`);

  const item = ContentItemSchema.parse(data);
  const next = nextStage(item.stage);
  if (!next) return;

  // .eq("stage", ...) verhindert doppeltes Weiterschieben bei zwei schnellen Klicks.
  const { error: updateError } = await supabase
    .from("content_items")
    .update({ stage: next })
    .eq("id", id)
    .eq("stage", item.stage);
  if (updateError) throw new Error(`Status konnte nicht geändert werden: ${updateError.message}`);

  revalidatePath("/pipeline");
}
