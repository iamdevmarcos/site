import React, { useState } from "react";

import { Menu, X } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get the viewport height
      const viewportHeight = window.innerHeight;
      // Get the element's position relative to the viewport
      const elementRect = element.getBoundingClientRect();
      // Calculate the scroll position to center the element
      const scrollPosition =
        window.scrollY +
        elementRect.top -
        viewportHeight / 2 +
        elementRect.height / 2;

      // Special handling for first and last sections
      if (sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (sectionId === "newsletter") {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
      }
      setIsMenuOpen(false);
    }
  };

  const menuItemDesktop =
    "text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-default";
  const menuItemMobile =
    "text-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-default";

  return (
    <div>
      <div className="flex justify-between items-center p-3 bg-background w-full z-20">
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpeg"
            alt="Marcos Mendes"
            className="w-8 h-8 rounded-full object-cover border border-[var(--border)]"
          />
          <div className="text-base text-[var(--primary)]">Marcos Mendes</div>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <ul className="hidden sm:flex items-center gap-4 social-link">
            <li>
              <button
                onClick={() => scrollToSection("projects")}
                className={menuItemDesktop}
                style={{ textTransform: "lowercase" }}
              >
                projects
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("work")}
                className={menuItemDesktop}
                style={{ textTransform: "lowercase" }}
              >
                work
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("blog")}
                className={menuItemDesktop}
                style={{ textTransform: "lowercase" }}
              >
                blog
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("moments")}
                className={menuItemDesktop}
                style={{ textTransform: "lowercase" }}
              >
                moments
              </button>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@marcosmendes90/videos"
                target="_blank"
                rel="noopener noreferrer"
                className={menuItemDesktop}
                style={{
                  textTransform: "lowercase",
                  color: "var(--muted-foreground)",
                  textDecoration: "none",
                }}
                onMouseOver={e =>
                  (e.currentTarget.style.color = "var(--foreground)")
                }
                onMouseOut={e =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              >
                videos
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-md hover:bg-[var(--accent)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-[18px] w-[18px] text-[var(--muted-foreground)]" />
            ) : (
              <Menu className="h-[18px] w-[18px] text-[var(--muted-foreground)]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="sm:hidden fixed inset-0 top-[57px] bg-background z-50">
          <ul className="flex flex-col items-center gap-6 pt-8">
            <li>
              <button
                onClick={() => scrollToSection("projects")}
                className={menuItemMobile}
                style={{ textTransform: "lowercase" }}
              >
                projects
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("work")}
                className={menuItemMobile}
                style={{ textTransform: "lowercase" }}
              >
                work
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("moments")}
                className={menuItemMobile}
                style={{ textTransform: "lowercase" }}
              >
                moments
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("blog")}
                className={menuItemMobile}
                style={{ textTransform: "lowercase" }}
              >
                blog
              </button>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@marcosmendes90/videos"
                target="_blank"
                rel="noopener noreferrer"
                className={menuItemMobile}
                style={{
                  textTransform: "lowercase",
                  color: "var(--muted-foreground)",
                  textDecoration: "none",
                }}
                onClick={() => setIsMenuOpen(false)}
                onMouseOver={e =>
                  (e.currentTarget.style.color = "var(--foreground)")
                }
                onMouseOut={e =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              >
                video
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Full width divider that breaks out of container */}
      <hr className="border-t border-[var(--border)] relative w-screen left-[50%] right-[50%] -translate-x-[50%]" />
    </div>
  );
}

export default Header;
