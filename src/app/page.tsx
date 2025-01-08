
import { Bounded } from "@/components/common/Bounded";
import { Button } from "@/components/ui/button";

import { getPosts } from "@/lib/utils";
import { SingleBlog } from "@/components/SingleBlog";
import config from "../../config";

export default function Home() {
  const posts = getPosts();

  return (
    <>
      {/* Hero Section */}
      <header className="my-24 md:my-60">
        <div className="flex flex-col items-center gap-10 text-center">
          <h1 className="text-4xl text-pretty font-bold tracking-tighter text-black md:text-6xl">
            {config.SITE_TITLE}
          </h1>
          <h2 className="text-2xl text-pretty tracking-tighter text-black md:text-2xl">
            {config.SEO_DESCRIPTION}
          </h2>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Your email"
              className="mr-2 rounded bg-slate-100 p-2"
            />
            <Button className="bg-orange-500">Subscribe</Button>
          </div>
          <p className="text-sm text-slate-300">
            放心，我不會Spam 你的
          </p>
        </div>
      </header>

      {/* Main Content */}
      <Bounded>
        <div className="grid gap-16 pb-20">
          {/* Content Grid */}

          <section className="mt-16 grid grid-cols-1 gap-2 space-y-20 md:grid-cols-2 md:gap-8 lg:mt-20 lg:space-y-20">
            {posts.map((post) => (
              <SingleBlog key={post.uid} post={post} /> // Use SingleBlog component
            ))}
          </section>
        </div>
      </Bounded>
      <Bounded>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
          Want product news and updates? Sign up for our newsletter.
        </h2>
        <form className="mt-10 max-w-md">
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
              className="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-sm/6 text-gray-900">
            We care about your data. Read our{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              privacy&nbsp;policy
            </a>
            .
          </p>
        </form>
      </Bounded>
    </>
  );
}
