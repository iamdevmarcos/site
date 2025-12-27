"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Card from "./components/Card";
import { ThemeProvider } from "./theme-provider";
import Projects from "./components/Projects";
import Work from "./components/Work";
import Moments from "./components/Moments";
import Blog from "./components/Blog";
import Newsletter from "./components/Newsletter";

export default function Home() {
  const [cardHeight, setCardHeight] = useState("100vh");
  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateHeight = () => {
      setTimeout(() => {
        if (
          headerRef.current &&
          heroRef.current &&
          projectsRef.current &&
          workRef.current
        ) {
          const headerTop =
            headerRef.current.getBoundingClientRect().top + window.scrollY;

          const projectsBottom =
            projectsRef.current.getBoundingClientRect().bottom + window.scrollY;

          const totalHeight = projectsBottom - headerTop;

          setCardHeight(`${totalHeight + 30}px`);
        }
      }, 100);
    };

    calculateHeight();

    window.addEventListener("resize", calculateHeight);

    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="marcos-theme">
      <div className="min-h-screen p-0 font-[family-name:var(--font-geist-sans)]">
        <div
          className="card-wrapper mr-10 hidden lg:block"
          style={{ height: cardHeight, position: "absolute", top: 0, right: 0 }}
        >
          <Card />
        </div>

        <div className="relative">
          <header className="relative z-20 " ref={headerRef}>
            <Header />
          </header>

          <div className="hero-section relative z-30" ref={heroRef} id="hero">
            <Hero />
          </div>
          <hr className="border-t relative w-screen left-[50%] right-[50%] -translate-x-[50%] my-8" />

          <div
            className="relative min-h-[50vh] w-full z-0"
            ref={workRef}
            id="work"
          >
            <Work />
          </div>

          <hr className="border-t relative w-screen left-[50%] right-[50%] -translate-x-[50%] my-8" />
          <div className="relative min-h-[50vh] w-full z-0" id="blog">
            <Blog />
          </div>

          <hr className="border-t relative w-screen left-[50%] right-[50%] -translate-x-[50%] my-8" />
          <div
            className="relative min-h-[50vh] w-full z-0"
            ref={projectsRef}
            id="projects"
          >
            <Projects />
          </div>

          <hr className="border-t relative w-screen left-[50%] right-[50%] -translate-x-[50%] my-8" />
          <div className="relative min-h-[50vh] w-full z-0" id="moments">
            <Moments />
          </div>

          <hr className="border-t relative w-screen left-[50%] right-[50%] -translate-x-[50%] my-8" />
          <div className="relative w-full z-0" id="newsletter">
            <Newsletter />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
