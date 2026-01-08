"use client";
import React, { useState } from "react";

interface WorkExperienceProps {
  company: string;
  position: string;
  description: React.ReactNode[];
  logo?: string;
  website?: string;
}

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

const Work: React.FC = () => {
  const workExperiences = [
    {
      company: "Chatwoot",
      position: "Senior Software Engineer",
      logo: "/companies/chatwoot_logo.jpeg",
      website: "https://www.chatwoot.com/",
      description: [
        "Refactored mission-critical NestJS API endpoints using clean domain modeling, eliminating race conditions and ensuring 99.9% reliability for 10k+ daily business transactions.",
        "Built and evolved frontend features using Vue.js, emphasizing usability, responsiveness, and long-term maintainability.",
        "Contributed to omnichannel support capabilities, including centralized inboxes (live chat, WhatsApp, Instagram) and automation workflows used by support teams at scale.",
        "Improved team delivery throughput by approximately 2x by introducing better technical workflows, clearer task breakdowns, and responsible use of AI-assisted development, while maintaining code quality and stability.",
        "Collaborated closely with Product, Design, and Stakeholders to translate requirements into production-ready, high-impact solutions.",
        "Open-source SaaS platform for omnichannel customer support and engagement. Joined the team as a senior engineer, contributing to the evolution of a product used to centralize multi-channel customer interactions and improve support team efficiency.",
      ],
    },
    {
      company: "Pluxee",
      position: "Software Engineer",
      logo: "/companies/pluxee_logo.jpeg",
      website: "https://www.pluxee.com/",
      description: [
        "Scaled a mission-critical payments platform to handle 1M+ daily transactions by engineering the modernization of legacy components into Java/Spring Boot microservices.",
        "Led a frontend team for an enterprise-grade system, owning feature delivery from discovery to production across critical business flows.",
        "Implemented and scaled a multi-country frontend architecture with full internationalization support, enabling product expansion beyond legacy use cases.",
        "Integrated LLM (Gemini API) into internal back-office tools, improving operational efficiency through an intelligent virtual assistant.",
        "Worked closely with backend teams on credit and wallet management services, contributing across Java/Spring Boot microservices in an Azure-based environment.",
        "Helped establish and evolve team delivery practices, improving predictability, code quality, and cross-functional collaboration between Engineering, Product, and Design.",
        "Stack: TypeScript, React, Jest, Cypress, Chakra UI, Java, Spring Boot, PostgreSQL, Redis, Azure DevOps",
        "Global benefits and payments platform operating at large scale across multiple markets. Joined the team to help modernize a mission-critical card payments product, enabling multi-benefits (multi-wallet) cards and positioning the company to compete with newer fintech players in a highly regulated, high-volume market.",
      ],
    },
    {
      company: "Merck",
      position: "Frontend Engineer",
      logo: "/companies/merck_logo.jpeg",
      website: "https://www.merck.com/",
      description: [
        "Engineered a mission-critical animal health platform from discovery to production, streamlining medical history and appointment management for 50+ clinics and 10k+ users.",
        "Owned full-cycle feature development across frontend and backend boundaries, from implementation to testing and delivery.",
        "Built and maintained scalable frontend foundations (shared components, validations, and project boilerplates) to accelerate development across multiple applications.",
        "Reduced production bugs by over 60% and increased release velocity by architecting a comprehensive automated testing suite (Jest/Cypress) for critical healthcare workflows",
        "Established and reinforced frontend code standards through linting, formatting, and Git hooks, improving consistency and long-term maintainability.",
        "Developed complex, form-heavy workflows using React Hook Form and Yup, ensuring data integrity and a smooth user experience.",
        "Stack: TypeScript, React, Next.js, Jest, Cypress, Styled Components, Redux, Context API",
        "Global healthcare and life sciences company. Worked on an animal health platform responsible for managing pet identification (microchips), owner data, medical records, vaccinations, medications, and appointment workflows used by veterinarians and clinics.",
      ],
    },
    {
      company: "upcubo",
      position: "Software Developer",
      logo: "/companies/upcubo_logo.jpeg",
      website: "https://upcubo.com/",
      description: [
        "Built and scaled backend services (Node.js/PHP) for business-critical payment and scheduling systems, ensuring 99.9% uptime for core workflows.",
        "Led the full-stack development and successful launch of multiple web and mobile applications (React/React Native), driving the product from initial concept to production.",
        "Automated manual operational processes by integrating complex third-party APIs, saving dozens of hours of manual work monthly for internal teams.",
        "Established shared coding standards and led code reviews across teams, improving overall maintainability and reducing technical debt for long-term product growth.",
        "Product-focused software company building custom web and mobile solutions in close partnership with clients. Worked as a full-stack developer delivering applications end to end across multiple business domains.",
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
      </div>
    </div>
  );
};

export default Work;
