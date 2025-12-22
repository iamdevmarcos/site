"use client";
import React, { useState } from "react";

interface ProjectProps {
  title: string;
  link: string;
  logo: string;
  description: string;
}

const ProjectItem: React.FC<ProjectProps> = ({
  title,
  link,
  logo,
  description,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-start">
        <div className="w-10 h-10 mr-4 flex-shrink-0">
          <img
            src={logo}
            alt={`${title} logo`}
            className="w-full h-full rounded-full  object-cover border border-[var(--border)]"
          />
        </div>
        <div>
          <span className="relative inline-block">
            <a
              href={link}
              className="text-base text-[var(--foreground)] decoration-[1px] underline underline-offset-3 decoration-[var(--muted-foreground)] cursor-pointer group flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
              <svg
                className="w-4 h-4 ml-0.5 inline-block"
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
            </a>
          </span>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const projects = [
  {
    title: "Focusly",
    link: "https://focusly-vert.vercel.app/",
    logo: "/projects/retroui.webp",
    description: "Get Things Done, as Planned.",
  },
  {
    title: "SuperMario.js",
    link: "https://supermariojs.vercel.app/",
    logo: "/projects/retroui.webp",
    description: "Play super mario in the browser using a PlayStation 5 / Xbox controller.",
  },
  {
    title: "Screen Size Helper",
    link: "https://www.npmjs.com/package/react-screen-size-helper",
    logo: "/projects/retroui.webp",
    description: "A React Hook utility for identifying and working with screen sizes",
  },
  {
    title: "Rust Http Server",
    link: "https://github.com/iamdevmarcos/rust-http-server",
    logo: "/projects/retroui.webp",
    description: "Rust http server using Warp. Modular structure for easy scalability and configuration.",
  },
  {
    title: "Rust Pendulum",
    link: "https://github.com/iamdevmarcos/rust-pendulum",
    logo: "/projects/retroui.webp",
    description: "Pendulum simulation using Rust and Speedy2D, featuring real-time physics with adjustable parameters and dual pendulum rendering.",
  },
  {
    title: "MacOS Web",
    link: "https://macos-iamdevmarcos.vercel.app/",
    logo: "/projects/retroui.webp",
    description: "MacOS interface with React, TypeScript and Styled Components",
  },
  {
    title: "MyNotes - Android App",
    link: "https://github.com/iamdevmarcos/myNotes",
    logo: "/projects/retroui.webp",
    description: "A Notes app, created in React-Native that provides better personal organization.",
  },
  {
    title: "Next.js Boilerplate",
    link: "https://github.com/iamdevmarcos/nextjs-boilerplate",
    logo: "/projects/retroui.webp",
    description: "A simple project starter to work with TypeScript, React, NextJS and Styled Components",
  },
  {
    title: "react-native-boilerplate",
    link: "https://github.com/iamdevmarcos/react-native-boilerplate",
    logo: "/projects/retroui.webp",
    description: "A React-Native starter kit using Expo, React Navigation, Styled Components, TypeScript and Eslint.",
  },
  {
    title: "whisper-llm",
    link: "https://github.com/iamdevmarcos/whisper-llm",
    logo: "/projects/retroui.webp",
    description: "Interactive voice assistant using Whisper for transcription and GPT-3.5 for natural language responses.",
  },
];

const Projects: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxVisibleItems = 4;
  const hasMoreItems = projects.length > maxVisibleItems;

  const visibleProjects = isExpanded ? projects : projects.slice(0, maxVisibleItems);

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
        projects
      </h1>
      <div className="max-w-2xl">
        {visibleProjects.map((project, index) => (
          <ProjectItem
            key={index}
            title={project.title}
            link={project.link}
            logo={project.logo}
            description={project.description}
          />
        ))}
        {hasMoreItems && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-sm text-[var(--link)] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
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
                <span>Show more</span>
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

export default Projects;
