import { useEffect, useState } from "react";

export function useScrollPosition(isActive: boolean = true): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isActive]);

  return scrolled;
}
