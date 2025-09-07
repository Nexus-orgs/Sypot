import { useEffect } from "react";
import Header from "@/components/Header";

const ManageEvents = () => {
  useEffect(() => {
    const title = "Manage Events | Sypot";
    const desc = "Create, edit, and manage all your events in one place.";
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
        <h1 className="text-3xl font-bold">Manage Events</h1>
        <p className="mt-2 text-muted-foreground">Create, edit, and publish your events.</p>
      </main>
    </div>
  );
};

export default ManageEvents;
