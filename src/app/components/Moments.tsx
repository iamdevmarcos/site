"use client";
import React, { useState, useRef, useEffect } from "react";

interface MomentCardProps {
  image: string;
  description: string;
  alt: string;
  className?: string;
}

const MomentCard: React.FC<MomentCardProps> = ({
  image,
  description,
  alt,
  className = "",
}) => {
  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      <div className="absolute inset-px rounded-lg bg-[var(--background)]" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
        <div className="relative h-full w-full grow overflow-hidden">
          <img
            src={image}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-sm font-medium text-white">{description}</p>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
    </div>
  );
};

const Moments: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const moments = [
    {
      image: "/mymoments/1.jpeg",
      description: "Appwrite Delhi community",
      alt: "Appwrite community",
    },
    {
      image: "/mymoments/2.jpeg",
      description: "Avo Connect Delhi",
      alt: "Avocado speaker",
    },
    {
      image: "/mymoments/3.jpeg",
      description: "Team Dinner",
      alt: "Team Dinner",
    },
    {
      image: "/mymoments/4.jpeg",
      description: "Solana Breakpoint - Singapore 2024",
      alt: "Solana Breakpoint",
    },
    {
      image: "/mymoments/5.jpeg",
      description: "Delhi Tech Meetup 2024",
      alt: "Delhi Tech Meetup",
    },
    {
      image: "/mymoments/6.jpeg",
      description: "Appwrite Team❤️",
      alt: "Appwrite Team",
    },
    {
      image: "/mymoments/7.jpeg",
      description: "Avocado Connect - Bennett University",
      alt: "Avocado Connect",
    },
  ];

  const maxIndex = Math.ceil(moments.length / 3) - 1;

  // Auto-scroll carousel
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  // Scroll to current slide
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.clientWidth / 3;
    container.scrollTo({
      left: currentIndex * cardWidth * 3,
      behavior: "smooth",
    });
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const container = scrollRef.current;
    if (!container) return;
    
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setIsPaused(false);
    
    // Snap to nearest slide
    const container = scrollRef.current;
    if (!container) return;
    
    const cardWidth = container.clientWidth / 3;
    const newIndex = Math.round(container.scrollLeft / (cardWidth * 3));
    const clampedIndex = Math.max(0, Math.min(newIndex, maxIndex));
    setCurrentIndex(clampedIndex);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)] px-4">
        moments
      </h1>
      <div className="max-w-2xl px-4 mb-10">
        <p className="mb-6 text-base text-[var(--foreground)]">
          Tbh I&apos;m still figuring it out. Here&apos;s a small glimpse of my
          journey so far.
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Carousel container */}
        <div
          ref={scrollRef}
          className={`flex overflow-x-hidden scrollbar-hide scroll-smooth ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => !isDragging && setIsPaused(true)}
          onMouseLeave={() => {
            handleMouseLeave();
            if (!isDragging) setIsPaused(false);
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div className="flex gap-4">
            {moments.map((moment, index) => (
              <MomentCard
                key={index}
                image={moment.image}
                description={moment.description}
                alt={moment.alt}
                className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1.067rem)] min-h-[200px] sm:min-h-[250px] lg:min-h-[280px]"
              />
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "w-8 bg-[var(--foreground)]"
                    : "w-2 bg-[var(--muted-foreground)]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Moments;
