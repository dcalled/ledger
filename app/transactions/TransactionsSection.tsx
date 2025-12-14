import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function TransactionsSection() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("occurred_at", { ascending: false })
    .limit(200);

  if (error) {
    return <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>;
  }

  return (
    <ul style={{ paddingLeft: 18 }}>
      {(data ?? []).map((t: any) => (
        <li key={t.id}>
          {new Date(t.occurred_at).toLocaleString()} — {t.direction} — {t.amount}{" "}
          {t.currency} — {t.description ?? ""}
        </li>
      ))}
    </ul>
  );
}
