"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useRef, useSyncExternalStore } from "react";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

function subscribeNoop() {
  return () => {};
}

/** True apenas depois da hidratação no cliente — evita mismatch de SSR sem setState em efeito. */
function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const btnRef = useRef<HTMLButtonElement>(null);

  function toggle() {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const btn = btnRef.current;
    const doc = document as ViewTransitionDocument;

    if (!doc.startViewTransition || !btn) {
      setTheme(next);
      return;
    }

    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      setTheme(next);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

  if (!mounted) {
    return <span className="block h-[42px] w-[42px]" aria-hidden />;
  }

  return (
    <button
      ref={btnRef}
      onClick={toggle}
      type="button"
      aria-label={resolvedTheme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      className="grid h-[42px] w-[42px] place-items-center border border-line text-ink transition-colors hover:border-brass hover:text-brass"
    >
      {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
