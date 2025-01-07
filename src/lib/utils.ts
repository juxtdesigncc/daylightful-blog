import { clsx, type ClassValue } from "clsx";
import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";
import { twMerge } from "tailwind-merge";

type Metadata = {
  title: string;
  description?: string;
  excerpt?: string;
  slug?: string;
  category?: string;
  tags: string[];
  date: string;
  draft?: boolean;
  socialImage?: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function parseFrontmatter(fileContent: string) {
  const { data: metadata, content } = matter(fileContent);
  metadata.tags = metadata.tags || [];
  return { metadata: metadata as Metadata, content }; // Return the parsed metadata and content
}

function getMDXFiles(dir: fs.PathLike) {
  return fs
    .readdirSync(dir)
    .filter(
      (file) => path.extname(file) === ".mdx" || path.extname(file) === ".md",
    );
}

function readMDXFile(filePath: fs.PathOrFileDescriptor) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: fs.PathLike) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir.toString(), file));
    const uid =
      metadata.slug ||
      metadata.title?.toLowerCase().replace(/\s+/g, "-") ||
      path.basename(file, path.extname(file));

    return {
      metadata,
      uid,
      content,
    };
  });
}

export function getPosts() {
  const appData = getMDXData(path.join(process.cwd(), "src", "app"));
  const contentData = getMDXData(path.join(process.cwd(), "src", "content"));

  const allPosts = [...appData, ...contentData];
  const filteredPosts = allPosts.filter((post) => !post.metadata.draft);

  return filteredPosts;
}

export function parseReadTime(markdown: string) {
  // Determine the number of words in the post content
  const wordCount = markdown.split(/\s+/g).length;
  // Assuming an average reading speed of 200 words per minute
  const wordsPerMinute = 200;
  // Calculate the estimated reading time in minutes
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

function parseMarkdown(markdownText: string, char: number) {
  const charLimit = char || 500;
  const htmlText = markdownText
    // hide h3 title
    .toString()
    .replace(/^### (.*$)/gim, "")
    // hide h2 title
    .toString()
    .replace(/^## (.*$)/gim, "")
    // hide h1 title
    .toString()
    .replace(/^# (.*$)/gim, "")
    // replace italic to normal text
    .toString()
    .replace(/^\> (.*$)/gim, "$1")
    // replace bold to normal text
    .toString()
    .replace(/\*\*(.*)\*\*/gim, "$1")
    .toString()
    .replace(/\*(.*)\*/gim, "")
    .toString()
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "")
    .toString()
    .replace(/\[(.*?)\]\((.*?)\)/gim, "$1")
    .toString()
    .replace(/\n$/gim, "");

  return htmlText.trim().slice(0, charLimit);
}

export const getExcerpt = (markdownText: string, char: number) => {
  const excerpt = parseMarkdown(markdownText, char);
  return excerpt;
};

export function getPostsByCategory(category: string) {
  const allPosts = getPosts();
  return allPosts.filter((post) => post.metadata.category === category); // Filter posts by category
}

export function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}
