import BlogDetailPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/blog/[slug]/page";

export { generateMetadata, generateStaticParams };
export const revalidate = 60;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  return <BlogDetailPage params={params} />;
}

