import Image from "next/image";
import Link from "next/link";
import { getExcerpt } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";

interface SingleBlogProps {
  post: {
    uid: string;
    metadata: {
      title: string;
      date: string;
      category?: string;
      socialImage?: string;
    };
    content?: string;
  };
}

export function SingleBlog({ post }: SingleBlogProps) {
  return (
    <article key={post.uid} className="group relative flex flex-col space-y-4">
      {post.metadata.socialImage && (
        <div className="relative aspect-[2/1] overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={post.metadata.socialImage}
            alt={post.metadata.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex items-center gap-x-4 text-xs text-gray-500">
        <time dateTime={post.metadata.date}>
          {new Date(post.metadata.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        {post.metadata.category && (
          <Tag label={post.metadata.category} />
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-gray-600">
          <Link href={`/posts/${post.uid}`}>
            <span className="absolute inset-0" />
            {post.metadata.title}
          </Link>
        </h2>

        {post.content && (
          <p className="text-md mt-3 leading-6 text-slate-700">
            {getExcerpt(post.content, 300)}
          </p>
        )}
      </div>
    </article>
  );
} 