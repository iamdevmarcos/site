"use client";
import React, { useState } from "react";

// Create an API route handler in your Next.js app
// This component will work with an API route at /api/newsletter

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      // Send the request to your own API endpoint
      // We'll create this endpoint next
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to subscribe. Please try again."
        );
      }

      setIsSubmitted(true);
      setEmail("");

      // Reset the submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Subscription error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to subscribe. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 px-4 flex flex-col items-center justify-center text-center">
      {/* Stylized "much love" text */}
      <div className="relative w-full max-w-3xl mx-auto mb-10">
        <div className="flex flex-col text-[#EDEDED] font-balabeloo text-9xl tracking-tighter z-10 text-center scale-95 sm:scale-100 md:scale-125 lg:scale-150 ">
          <h1>MUCH</h1>
          <h1 className="-mt-8 lg:-mt-10">LOVE</h1>
        </div>
      </div>

      {/* Newsletter signup */}
      <div className="w-full max-w-md">
        <p className="text-base mb-6 text-[var(--foreground)]">
          Want to stay updated? Subscribe to my newsletter
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-grow px-4 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--muted-foreground)]"
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {isSubmitted && (
          <p className="mt-2 text-white text-sm">Thanks for subscribing!</p>
        )}

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default Newsletter;
