import { Bounded } from "@/components/common/Bounded";
import { getPosts } from "@/lib/utils";
import Link from "next/link";

export default function CategoriesPage() {
  const posts = getPosts();

  // Check for empty posts to avoid unnecessary processing
  if (!posts?.length) {
    return <div>No categories found.</div>;
  }

  // Extract unique categories
  const categories = Array.from(new Set(
    posts.map(post => post.metadata?.category).filter(Boolean)
  ));

  return (
    <Bounded>
      <h1 className="text-3xl font-bold mb-8">Categories</h1>
      <div className="grid gap-4">
        {categories.map(category => (
          <Link key={category} href={`/categories/${category?.toLowerCase().replaceAll(' ', '-').trim()}`}>
            <p className="text-lg text-blue-600 hover:underline">{category}</p>
          </Link>
        ))}
      </div>
    </Bounded>
  );
}