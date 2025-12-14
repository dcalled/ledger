import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function TransactionsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("occurred_at", { ascending: false })
    .limit(200);

  if (error) {
    return (
      <main style={{ padding: 16 }}>
        <h1>Transactions</h1>
        <pre>{error.message}</pre>
      </main>
    );
  }

  return (
    <main style={{ padding: 16, fontFamily: "system-ui" }}>
      <h1>Transactions</h1>
      <ul>
        {data?.map((t) => (
          <li key={t.id}>
            {new Date(t.occurred_at).toLocaleString()} — {t.direction} — {t.amount} {t.currency} — {t.description ?? ""}
          </li>
        ))}
      </ul>
    </main>
  );
}
