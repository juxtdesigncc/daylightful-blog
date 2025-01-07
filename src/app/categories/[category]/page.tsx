import { Bounded } from "@/components/common/Bounded";
import { getPosts } from "@/lib/utils";
import { SingleBlog } from "@/components/SingleBlog";

interface Params {
  params: {
    category: string; // Category is a string
  };
}

export default function CategoryPage({ params }: Params) {
  const { category } = params;
  const posts = getPosts();
  const slugCategory = decodeURIComponent(category).toLowerCase().replaceAll(' ', '-').trim(); // Decode the category

  if (!posts?.length) {
    return <div>No posts found.</div>;
  }

  // Filter posts based on the slugified category
  const filteredPosts = posts.filter(post => {
    const postCategory = post.metadata?.category?.toLowerCase().replaceAll(' ', '-').trim() || '';
    return postCategory === slugCategory; // Compare slugged versions
  });

  const postCount = filteredPosts.length;

  return (
    <Bounded>
      <h1 className="text-3xl font-bold mb-8">
        {slugCategory}
        <span className="ml-2 text-sm text-slate-500">({postCount})</span>
      </h1>
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

  // Extract unique slugified categories
  const categories = Array.from(new Set(
    posts.map(post => post.metadata?.category ? post.metadata.category.toLowerCase().replaceAll(' ', '-').trim() : null).filter(Boolean)
  ));

  if (categories.length === 0) return []; // Check for categories

  return categories.map(category => ({ category })); // Return categories
}