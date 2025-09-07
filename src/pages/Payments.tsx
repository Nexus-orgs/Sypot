import { useEffect } from "react";
import Header from "@/components/Header";

const Payments = () => {
  useEffect(() => {
    const title = "Payments & Transactions | Sypot";
    const desc = "Manage commissions, refunds, and disputes across the platform.";
    document.title = title;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = desc;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + window.location.pathname;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Payments & Transactions</h1>
        <p className="mt-2 text-muted-foreground">View payouts, commissions, and handle refunds.</p>
      </main>
    </div>
  );
};

export default Payments;
