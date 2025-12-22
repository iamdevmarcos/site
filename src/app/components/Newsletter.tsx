"use client";
import React from "react";

const Newsletter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="pb-8 pt-2 px-4 flex flex-col items-center justify-center text-center">
      <p className="text-lg text-[var(--muted-foreground)] font-[family-name:var(--font-caveat)]">
          ʕ⊙ᴥ⊙ʔ Marcos Mendes © {currentYear}
      </p>
    </div>
  );
};

export default Newsletter;
