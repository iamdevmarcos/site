"use client";
import React, { useState } from "react";

interface WorkExperienceProps {
  company: string;
  position: string;
  description: React.ReactNode[];
  logo?: string;
  website?: string;
}

interface CompanyLogoProps {
  src: string;
  alt: string;
  href: string;
  zIndex: number;
}

// Company logo component with website link and hover effect
const CompanyLogo: React.FC<CompanyLogoProps> = ({
  src,
  alt,
  href,
  zIndex,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative w-12 h-12 rounded-full border-2 border-[var(--background)] overflow-hidden ${
        zIndex < 40 ? "-ml-4" : ""
      } hover:z-50 transition-all duration-200 ${
        isHovered ? "scale-110 z-50" : `z-${zIndex}`
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ zIndex: isHovered ? 50 : zIndex }}
    >
      <img src={src} alt={alt} className="w-full h-full object-contain" />
      {isHovered && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 -bottom-8 whitespace-nowrap px-2 py-1 text-xs bg-[var(--tooltip)] text-[var(--tooltip-foreground)] rounded shadow-lg">
          {alt.replace(" logo", "")}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--tooltip)] transform rotate-45"></div>
        </div>
      )}
    </a>
  );
};

// Work experience item component
const WorkExperienceItem: React.FC<WorkExperienceProps> = ({
  company,
  position,
  description,
  logo,
  website,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxVisibleItems = 3;
  const hasMoreItems = description.length > maxVisibleItems;

  return (
    <div className="mb-8">
      <div className="flex items-start">
        {logo && (
          <div className="w-10 h-10 mr-4 flex-shrink-0">
            {website ? (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <img
                  src={logo}
                  alt={`${company} logo`}
                  className="w-full h-full rounded-full object-cover border border-[var(--border)]"
                />
              </a>
            ) : (
              <img
                src={logo}
                alt={`${company} logo`}
                className="w-full h-full rounded-full object-cover border border-[var(--border)]"
              />
            )}
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-base font-medium text-[var(--foreground)]">
            {website ? (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {company}
              </a>
            ) : (
              company
            )}
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] mb-4">
            {position}
          </p>
          <ul className="text-sm text-[var(--foreground)] list-disc pl-4 marker:text-[var(--muted-foreground)]">
            {description.map((item, index) => {
              const isVisible = index < maxVisibleItems || isExpanded;
              if (!isVisible) return null;
              return (
                <li
                  key={index}
                  className="mb-2 transition-all duration-300 ease-in-out"
                  style={{
                    opacity: 1,
                    transform: 'translateY(0)',
                  }}
                >
                  {item}
                </li>
              );
            })}
          </ul>
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
    </div>
  );
};

// Collaboration logos component
const CollaborationLogos: React.FC = () => {
  // Company data structured in an array for better maintainability
  const companies = [
    {
      name: "Vorld",
      logo: "/companies/vorld.png",
      website: "https://thevorld.com/",
      zIndex: 40,
    },
    {
      name: "PCG",
      logo: "/companies/pcg.png",
      website: "https://powerclubglobal.com/",
      zIndex: 30,
    },
    {
      name: "Avocado",
      logo: "/companies/avocado.jpg",
      website: "https://instadapp.io/product/avocado",
      zIndex: 20,
    },
    {
      name: "Codedamn",
      logo: "/companies/codedamn.jpg",
      website: "https://codedamn.com/",
      zIndex: 10,
    },
  ];

  return (
    <div className="mb-8">
      <p className="text-xs text-[var(--muted-foreground)] mb-3">
        also worked with folks at
      </p>
      <div className="flex items-center">
        <div className="relative flex">
          {companies.map((company) => (
            <CompanyLogo
              key={company.name}
              src={company.logo}
              alt={`${company.name} logo`}
              href={company.website}
              zIndex={company.zIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Work: React.FC = () => {
  const workExperiences = [
    {
      company: "Bankme",
      position: "Senior Software Engineer",
      logo: "/companies/chatwoot_logo.jpeg",
      website: "https://www.bankme.tech/",
      description: [
        "👨🏻‍💻",
      ],
    },
    {
      company: "Chatwoot",
      position: "Senior Software Engineer",
      logo: "/companies/chatwoot_logo.jpeg",
      website: "https://www.chatwoot.com/",
      description: [
        "Contributing to the development and evolution of a SaaS customer support and engagement product, focused on centralizing multi-channel interactions and improving support team.",
        "Provided technical leadership, making architectural decisions to ensure scalability, maintainability, and overall product quality.",
        "Developed and maintained backend services using Ruby on Rails, focusing on performance, reliability, and solid domain modeling.",
        "Built and evolved frontend features using Vue.js, emphasizing usability, responsiveness, and clean code organization.",
        "Designed and maintained Docker environments for development and production, ensuring consistency across environments.",
        "Collaborated closely with Product, Business, and Design teams to translate business requirements into effective technical solutions.",
        "Contributed to omnichannel support capabilities, including centralized inboxes (live chat, WhatsApp, Instagram) and automation workflows.",
        "Conducted code reviews, enforced coding standards, and promoted clean, maintainable code.",
        "Mentored team members and supported technical decision-making, balancing short-term delivery with long-term product evolution.",
        "Tech Stack: Ruby on Rails, Vue.js, Docker, Github Actions, AWS, Cursor AI, N8N",
      ],
    },
    {
      company: "Pluxee",
      position: "Software Engineer",
      logo: "/companies/pluxee_logo.jpeg",
      website: "https://www.pluxee.com/",
      description: [
        "Leading a Frontend team, responsible for develop/deploy new features, mentoring other developers and collaborating closely with the UX Design, Product Team and Backend Team.",
        "Integrating LLMs in the frontend, using the Gemini API to create an intelligent virtual assistant for a back-office system.",
        "Continuous Integration/Deployment Pipeline Integration, pull requests, code reviews, unit/integration/e2e testing.",
        "Using AI-based coding tools like Cursor to increase productivity and mentoring other developers on effective usage.",
        
        "Implementing and scaling an enterprise frontend project with internationalization for multiple countries.",
        "Refactoring existing code to improve readability and eliminate duplications.",
        "Supporting the UX Design team with technical validations for new features.",
        "Collaborating with the Product team on business rules, Jira management, and task delegation.",
        "Implementing Scrum methodology with a workflow that includes columns for Ready for Development, In Development, Code Review, QA, Product Manager Validation, and Deploy to Production.",
        "Helping the Backend team in creating, fixing, and maintaining various micro-services for credit management. Using Java, Spring Boot, micro-services and Azure cloud technologies",
        "Tools Frontend: TypeScript, React, Jest, Cypress, Chakra UI & Context API",
        "Tools Backend: Java, Spring Boot, JPA, Maven, PostgreSQL, Redis & Azure DevOps",
      ],
    },
    {
      company: "Merck",
      position: "Frontend Engineer",
      logo: "/companies/merck_logo.jpeg",
      website: "https://www.merck.com/",
      description: [
        "Developing modern and responsive websites and systems, implementing full-cycle new features involving both frontend and backend aspects of the product.",
        "Implemented and maintained boilerplate for different projects.",
        "Using Jest and Cypress to create large-scale, automated tests.",
        "Reinforce code standards - set up linter, formatter and git hooks.",
        "Implement shared complex form validations using React Hook Form and Yup.",
        "Tools: TypeScript, React, Next.js, Jest, Styled Components, Hooks, Redux & Context API",
      ],
    },
    {
      company: "upcubo",
      position: "Software Developer",
      logo: "/companies/upcubo_logo.jpeg",
      website: "https://upcubo.com/",
      description: [
        "Using Next.js (or React Native for mobile) and Styled Components to develop the frontend of applications, ensuring a modern and responsive user experience.",
        "Engineering a robust backend with Node.js, and MySQL, and ensuring seamless delivery to production.",
        "Integrating third-party APIs and services to enhance application functionality.",
        "Conducting code reviews and maintaining coding standards to ensure code quality.",
        "Utilizing version control systems (Git) for efficient collaboration and code management.",
      ],
    }
  ];

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">work</h1>
      <div className="max-w-2xl">
        {workExperiences.map((work, index) => (
          <WorkExperienceItem
            key={index}
            company={work.company}
            position={work.position}
            logo={work.logo}
            website={work.website}
            description={work.description}
          />
        ))}
        <CollaborationLogos />
      </div>
    </div>
  );
};

export default Work;
