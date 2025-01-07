import { SingleBlog } from "@/components/SingleBlog";
import { Bounded } from "@/components/common/Bounded";

import { getPosts } from "@/lib/utils";

interface Params {
  params: {
    tag: string;
  };
}

export default function TagPage({ params }: Params) {
  const { tag } = params;
  const posts = getPosts();

  // Check for empty posts to avoid unnecessary processing
  if (!posts?.length) {
    return <div>No posts found.</div>;
  }

  const filteredPosts = posts.filter(post => 
    post.metadata.tags.some(postTag => postTag === decodeURIComponent(tag).toLowerCase().replaceAll(' ', '-'))
  );

  const postCount = filteredPosts.length;

  return (
    <Bounded>
      <h1 className="mb-8 text-3xl font-bold">
      {decodeURIComponent(tag)}
        <span className="ml-2 text-sm text-slate-500">({postCount})</span>
      </h1>
      {/* Display the count */}
      <div className="grid gap-16 pb-20">
        {filteredPosts.map((post) => (
          <SingleBlog post={post} key={post.uid} />
        ))}
      </div>
    </Bounded>
  );
}

export async function generateStaticParams() {
  const posts = getPosts();

  if (!posts || posts.length === 0) return []; // Check for posts

  // Extract unique slugified tags
  const tags = Array.from(
    new Set(
      posts.flatMap((post) => {
        const postTags = post.metadata?.tags;
        return Array.isArray(postTags)
          ? postTags.map((tag) => tag.toLowerCase().replaceAll(' ', '-'))
          : []; // Ensure postTags is an array
      }) || [],
    ),
  );

  if (tags.length === 0) return []; // Check for tags

  return tags.map((tag) => ({ tag })); // Return tags without double slugification
}