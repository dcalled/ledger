import { Suspense } from "react";
import TransactionsSection from "./TransactionsSection";
import Loading from "./loading";

export default function TransactionsPage() {
  return (
    <main style={{ padding: 16, fontFamily: "system-ui" }}>
      <h1>Transactions</h1>

      <Suspense fallback={Loading()}>
        <TransactionsSection />
      </Suspense>
    </main>
  );
}
