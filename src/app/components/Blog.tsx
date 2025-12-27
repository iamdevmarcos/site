"use client";
import React, { useState } from "react";

interface BlogPost {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

interface BlogPostCardProps extends BlogPost {
  index: number;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  title,
  description,
  tags,
  link,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block no-underline focus:no-underline active:no-underline"
      style={{
        textDecoration: "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article
        className={`relative p-6 rounded-lg border transition-all duration-300 bg-[var(--card)] ${
          isHovered ? "border-blue-600" : "border-[var(--border)]"
        }`}
        style={{
          animationDelay: `${index * 0.1}s`,
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-[var(--foreground)] m-0">
            {title}
          </h3>
          <svg
            className={`w-5 h-5 transition-all duration-300 ${
              isHovered ? "translate-x-1 -translate-y-1" : ""
            }`}
            style={{
              color: isHovered ? "#2563eb" : "var(--muted-foreground)",
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>

        <p className="text-sm text-[var(--muted-foreground)] mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </a>
  );
};

const Blog: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const blogPosts: BlogPost[] = [
    {
      title: "Why Rust it's so good?",
      description:
        "Exploring what makes Rust special and why it's becoming the go-to language for systems programming and beyond.",
      tags: ["rust", "programming", "performance"],
      link: "https://dev.to/iamdevmarcos/why-rust-its-so-good-4nmh",
    },
    {
      title: "React Hydration Explained",
      description:
        "A deep dive into React's hydration process, understanding how server-rendered content becomes interactive on the client.",
      tags: ["react", "ssr", "nextjs"],
      link: "https://dev.to/iamdevmarcos/react-hydration-explained-3lk0",
    },
    {
      title: "Content Delivery Network Explained !",
      description:
        "Understanding how CDNs work, why they matter, and how they dramatically improve your website's performance and reliability.",
      tags: ["cdn", "performance", "webdev"],
      link: "https://dev.to/iamdevmarcos/content-delivery-network-explained-5cpf",
    },
    {
      title: "How Java works ?",
      description:
        "Breaking down the Java Virtual Machine, bytecode, and the magic that happens when you run your Java applications.",
      tags: ["java", "jvm", "backend"],
      link: "https://dev.to/iamdevmarcos/how-java-works--44i6",
    },
  ];

  const maxVisiblePosts = 3;
  const hasMorePosts = blogPosts.length > maxVisiblePosts;
  const visiblePosts = isExpanded
    ? blogPosts
    : blogPosts.slice(0, maxVisiblePosts);

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mb-6">
        <h1 className="text-3xl font-bold mb-2 text-[var(--foreground)]">
          blog
        </h1>
        <p className="text-base text-[var(--muted-foreground)]">
          thoughts on development, product, and everything in between.
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="grid gap-6">
          {visiblePosts.map((post, index) => (
            <BlogPostCard key={index} {...post} index={index} />
          ))}
        </div>

        {hasMorePosts && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 text-sm text-[var(--link)] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <>
                <span>Show less</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </>
            ) : (
              <>
                <span>Show all articles ({blogPosts.length - maxVisiblePosts} more)</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;

