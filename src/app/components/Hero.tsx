"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface LinkWithTooltipProps {
  href?: string;
  text: string;
  description: React.ReactNode;
  imageUrl?: string;
}

// Component for linky words with hover descriptions
const LinkWithTooltip: React.FC<LinkWithTooltipProps> = ({
  href,
  text,
  description,
  imageUrl,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle mouse events for hover
  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsTooltipVisible(false);
    }, 100);
  };

  // Handle clicks for mobile
  const handleClick = (e: React.MouseEvent) => {
    if (!href && window.innerWidth < 768) {
      e.preventDefault();
      setIsTooltipVisible(!isTooltipVisible);
    }
  };

  // Handle clicks outside to close tooltip on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsTooltipVisible(false);
      }
    };

    // Add event listener only when tooltip is visible
    if (isTooltipVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Clear any lingering timeouts when component unmounts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isTooltipVisible]);

  return (
    <span ref={containerRef} className="relative inline-block" style={{ zIndex: 99999, position: 'relative' }}>
      <a
        ref={linkRef}
        href={href}
        target={href ? "_blank" : undefined}
        className="text-[var(--muted-foreground)] text-[15px] decoration-[1px] underline underline-offset-3 decoration-[var(--muted-foreground)] cursor-pointer group inline-flex items-center"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onClick={handleClick}
      >
        {text}
        {href && (
          <svg
            className="w-3 h-3 ml-0.5 inline-block"
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
        )}
      </a>

      {isTooltipVisible &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            ref={tooltipRef}
            className="fixed w-64 p-3 shadow-lg bg-[var(--tooltip)] border border-[var(--tooltip-border)] rounded text-sm text-[var(--tooltip-foreground)]"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            style={{
              zIndex: 99999,
              top: `${tooltipPosition.top}px`,
              left: `${tooltipPosition.left}px`,
            }}
          >
            {imageUrl && (
              <div className="w-full h-40 overflow-hidden rounded mb-2">
                <img
                  src={imageUrl}
                  alt="tooltip illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="space-y-1">{description}</div>
            <span className="absolute -top-2 left-3 w-4 h-4 bg-[var(--tooltip)] border-t border-l border-[var(--tooltip-border)] transform rotate-45"></span>
          </div>,
          document.body
        )}
    </span>
  );
};

interface SocialLinkProps {
  href: string;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, label }) => {
  return (
    <a
      href={href}
      className="text-[var(--link)] text-sm hover:underline flex items-center"
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
      <svg
        className="w-3 h-3 ml-0.5"
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
  );
};

interface ProjectLinkProps {
  href: string;
  name: string;
  description: string;
}

const ProjectLink: React.FC<ProjectLinkProps> = ({
  href,
  name,
  description,
}) => {
  return (
    <div className="mb-1">
      <a
        href={href}
        className="text-[var(--link)] hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>
      <span className="text-xs text-[var(--muted-foreground)] ml-1">
        — {description}
      </span>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
        hi, i&apos;m marcos.
      </h1>
      <div className="max-w-2xl">
        <p className="mb-4 text-base text-[var(--foreground)]">
          just a guy who really like to know {" "}
          <LinkWithTooltip
            text="how things works"
            description={
              <div className="space-y-2">
                <p>
                  My blog on DEV Community where I write about I want.
                </p>
                <div className="mt-2 pt-2 border-t border-[var(--tooltip-border)]">
                  <div className="font-medium mb-1">Links:</div>
                  <ProjectLink
                    href="https://dev.to/iamdevmarcos"
                    name="DEV Community"
                    description="My blog"
                  />
                </div>
              </div>
            }
          />
          .
        </p>
        <p className="mb-4 text-base text-[var(--foreground)]">
          with a keep-moving-forward mindset.
        </p>

        <p className="text-base text-[var(--foreground)]">
          a dev who cares about the <LinkWithTooltip
            text="product"
            description=""
            imageUrl="/product.png"
          /> and <LinkWithTooltip
            text="user experience"
            description=""
            imageUrl="/howtodesign.png"
          /> before the
          stack.
        </p>

        <p className="mb-4 text-base text-[var(--foreground)]">
          i also really like to improve, and read about
          communication.
        </p>

        <p className="mb-4 text-base text-[var(--foreground)]">
          a dev with product owner mentality ;) i like this term.
        </p>

        <p className="mb-8 text-base text-[var(--foreground)]">
          no ego, no competition, just trying to be 1% better everyday.
        </p>

        <p className="mb-8 text-base text-[var(--foreground)]">
          btw, i love <LinkWithTooltip
            text="bike"
            description="my yamaha r15 v3 black"
            imageUrl="/moments/r15.jpeg"
          />, {" "}
          <LinkWithTooltip
            text="deathstranding"
            description="Norman Reedus, Léa Seydoux and Elle Fanning are the goat's"
            imageUrl="/moments/ds2.jpg"
          />, and {" "}
          <LinkWithTooltip
            text="formula 1"
            description="hamilton ferrari car"
            imageUrl="/moments/formula1.avif"
          />

        </p>
      </div>
      <div className="flex gap-5 mt-8">
        <SocialLink href="https://x.com/mendestsx" label="X" />
        <SocialLink href="https://github.com/iamdevmarcos" label="GitHub" />
        <SocialLink
          href="https://www.linkedin.com/in/iamdevmarcos/"
          label="LinkedIn"
        />
        <SocialLink href="https://dev.to/iamdevmarcos" label="Blog" />
      </div>
    </div>
  );
};

export default Hero;
