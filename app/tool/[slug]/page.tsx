import { Metadata } from "next";
import { getAllProgrammaticSlugs, getProgrammaticPage } from "@/lib/programmaticPages";
import ToolPageClient from "./ToolPageClient";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all programmatic pages
export async function generateStaticParams() {
  const slugs = getAllProgrammaticSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getProgrammaticPage(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.title,
    description: page.metaDescription,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const pageData = getProgrammaticPage(slug);

  if (!pageData) {
    return <div>Page not found</div>;
  }

  return <ToolPageClient pageData={pageData} />;
}
