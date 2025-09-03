import { useEffect } from "react";

export function useCloseOnScroll(callback: () => void, isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    const handleScroll = () => {
      callback();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isActive, callback]);
}
