import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

import { Bounded } from "@/components/common/Bounded";
import { CustomMDX } from "@/components/mdx";
import { Tag } from "@/components/ui/tag";

import { getExcerpt } from "@/lib/utils";
import { getPosts } from "@/lib/utils";

import { siteUrl } from "../../../../next-sitemap.config";
import sitemapConfig from "../../../../next-sitemap.config";
import config from "../../../../config"

function capitalizeWords(str: string) {
  return str
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join the words back into a single string
}

export default async function Blog({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const uid = (await params).uid;
  const post = getPosts().find((post) => post.uid === uid);

  const tags = post?.metadata?.tags ? post.metadata.tags : [];
  if (!post) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.metadata.title,
    datePublished: post.metadata.date,
    dateModified: post.metadata.date,
    author: {
      "@type": "Person",
      name: config.AUTHOR,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${sitemapConfig.siteUrl}/blog/${uid}`,
    },
  };

  return (
    <>
      {schema && (
        <Script
          id="schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}
      <header className="my-8">
        <nav>
          <Link href="/">Back</Link>
        </nav>
      </header>
      <main>
        <Bounded>
          <article className="prose lg:prose-xl">
            <CustomMDX source={post.content} />
          </article>
          {tags.length > 0 ? (
            <ul className="flex flex-row gap-4">
              {tags.map((tag: string) => (
                <li key={tag} className="inline-block text-xs">
                  <Link
                    href={`/tags/${tag.toLowerCase().replaceAll(" ", "-")}`}
                  >
                    <Tag label={capitalizeWords(tag)} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </Bounded>
      </main>
    </>
  );
}

export function generateMetadata({ params }: { params: { uid: string } }) {
  const post = getPosts().find((post) => post.uid === params.uid);
  if (!post) {
    return; // Return early if post not found
  }

  const {
    title,
    date: publishedTime,
    description: metaDescription, // Rename to avoid conflict with local variable
    socialImage: image,
    tags,
  } = post.metadata;

  const excerpt = getExcerpt(post.content, 300); // Renamed variable to avoid conflict
  const ogImage = image
    ? image
    : `${siteUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description: excerpt || metaDescription, // Use excerpt if available, otherwise use metaDescription
    keywords: tags.join(", ") + ", " + config.SEO_KEYWORDS,
    canonical: `${siteUrl}/blog/${post.uid}`,
    openGraph: {
      title,
      description: excerpt || metaDescription, // Use excerpt if available, otherwise use metaDescription
      type: "article",
      publishedTime,
      url: `${siteUrl}/blog/${post.uid}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt || metaDescription, // Use excerpt if available, otherwise use metaDescription
      images: [ogImage],
    },
  };
}

export function generateStaticParams() {
  const posts = getPosts();

  return posts.map((post) => ({
    uid: post.uid,
  }));
}
