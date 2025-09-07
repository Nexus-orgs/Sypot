import { useEffect } from "react";
import Header from "@/components/Header";

const Onboarding = () => {
  useEffect(() => {
    const title = "Onboarding | Sypot";
    const desc = "Select your interests to personalize your Sypot experience.";
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
        <h1 className="text-3xl font-bold">Onboarding</h1>
        <p className="mt-2 text-muted-foreground">Select your interests to tailor recommendations.</p>
      </main>
    </div>
  );
};

export default Onboarding;
