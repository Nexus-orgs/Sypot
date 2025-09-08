import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";

const Activity = () => {
  return (
    <Layout>
      <SEO 
        title="Activities | Sypot" 
        description="Discover local activities and group hangouts on Sypot."
        canonical="/activity"
      />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Activities</h1>
        <p className="mt-2 text-muted-foreground">Find small group activities and community-led events.</p>
      </div>
    </Layout>
  );
};

export default Activity;
