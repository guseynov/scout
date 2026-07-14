"use client";

import type { Deal } from "@/app/types/deal";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const AUTO_ADVANCE_MS = 5000;
const FEATURED_COLORWAYS = [
  {
    accent: "oklch(0.52 0.19 262)",
    label: "oklch(0.38 0.15 262)",
    surface: "oklch(0.94 0.04 262)",
  },
  {
    accent: "oklch(0.58 0.16 42)",
    label: "oklch(0.42 0.13 42)",
    surface: "oklch(0.95 0.04 42)",
  },
  {
    accent: "oklch(0.5 0.11 173)",
    label: "oklch(0.36 0.08 173)",
    surface: "oklch(0.94 0.03 173)",
  },
  {
    accent: "oklch(0.53 0.16 307)",
    label: "oklch(0.38 0.13 307)",
    surface: "oklch(0.94 0.04 307)",
  },
] as const;

type FeaturedDealsCarouselProps = {
  deals: Deal[];
};

export function FeaturedDealsCarousel({ deals }: FeaturedDealsCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const activeIndexRef = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);
  const initializedDealCountRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPointerOver, setIsPointerOver] = useState(false);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const resetTimer = useCallback(() => {
    setTimerKey((current) => current + 1);
  }, []);

  const setActiveSlide = useCallback(
    (nextIndex: number) => {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      resetTimer();
    },
    [resetTimer],
  );

  const scrollToSlide = useCallback(
    (nextIndex: number, behavior: ScrollBehavior = "smooth") => {
      const carousel = carouselRef.current;
      const card = cardRefs.current[nextIndex];
      if (!carousel || !card) return;

      const left = card.offsetLeft - (carousel.clientWidth - card.clientWidth) / 2;

      carousel.scrollTo({
        left,
        behavior: prefersReducedMotion ? "auto" : behavior,
      });
      setActiveSlide(nextIndex);
    },
    [prefersReducedMotion, setActiveSlide],
  );

  const moveSlide = useCallback(
    (direction: -1 | 1) => {
      const nextIndex = activeIndexRef.current + direction;
      if (nextIndex < 0 || nextIndex >= deals.length) return;

      scrollToSlide(nextIndex);
    },
    [deals.length, scrollToSlide],
  );

  const findCenteredSlide = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    let closestIndex = activeIndexRef.current;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - carouselCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndexRef.current) {
      setActiveSlide(closestIndex);
    }
  }, [setActiveSlide]);

  const handleScroll = useCallback(() => {
    if (scrollFrameRef.current !== null) return;

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      findCenteredSlide();
    });
  }, [findCenteredSlide]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
      resetTimer();
    };

    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);

    return () => mediaQuery.removeEventListener("change", syncMotionPreference);
  }, [resetTimer]);

  useEffect(() => {
    if (
      deals.length === 0 ||
      initializedDealCountRef.current === deals.length
    ) {
      return;
    }

    initializedDealCountRef.current = deals.length;
    scrollToSlide(0, "auto");
  }, [deals.length, scrollToSlide]);

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  const isAutoAdvancing =
    deals.length > 1 &&
    activeIndex < deals.length - 1 &&
    isAutoPlayEnabled &&
    !isPointerOver &&
    !prefersReducedMotion;

  useEffect(() => {
    if (!isAutoAdvancing) return;

    const timeoutId = window.setTimeout(() => {
      const nextIndex = activeIndexRef.current + 1;
      scrollToSlide(nextIndex);

      if (nextIndex === deals.length - 1) {
        setIsAutoPlayEnabled(false);
      }
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [deals.length, isAutoAdvancing, scrollToSlide, timerKey]);

  const pauseRotation = useCallback(() => {
    setIsPointerOver(true);
    resetTimer();
  }, [resetTimer]);

  const resumeRotation = useCallback(() => {
    setIsPointerOver(false);
    resetTimer();
  }, [resetTimer]);

  const handleFocusLeave = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (
        event.relatedTarget instanceof Node &&
        event.currentTarget.contains(event.relatedTarget)
      ) {
        return;
      }

      resumeRotation();
    },
    [resumeRotation],
  );

  const restartOrToggleAutoPlay = useCallback(() => {
    if (activeIndexRef.current === deals.length - 1 && !isAutoPlayEnabled) {
      scrollToSlide(0);
      setIsAutoPlayEnabled(true);
      return;
    }

    setIsAutoPlayEnabled((current) => !current);
    resetTimer();
  }, [deals.length, isAutoPlayEnabled, resetTimer, scrollToSlide]);

  const isAtFinalSlide = activeIndex === deals.length - 1;
  const activeColorway = FEATURED_COLORWAYS[activeIndex % FEATURED_COLORWAYS.length];
  const carouselStyle = {
    "--featured-accent": activeColorway.accent,
    "--featured-label": activeColorway.label,
    "--featured-surface": activeColorway.surface,
  } as CSSProperties;
  const autoPlayLabel =
    isAtFinalSlide && !isAutoPlayEnabled
      ? "Restart"
      : isAutoPlayEnabled
        ? "Pause"
        : "Play";

  return (
    <div
      className="mt-9"
      style={carouselStyle}
      onPointerEnter={pauseRotation}
      onPointerLeave={resumeRotation}
      onFocusCapture={pauseRotation}
      onBlurCapture={handleFocusLeave}
    >
      <div className="mb-1 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="text-sm text-[var(--muted)]">
          A short run of current picks from the board.
        </p>
        <div className="flex shrink-0 items-center gap-2" aria-label="Carousel controls">
          <button
            type="button"
            onClick={restartOrToggleAutoPlay}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-xs font-bold text-[var(--ink)] transition hover:border-[var(--ink)] hover:bg-[var(--surface)]"
            aria-pressed={!isAutoPlayEnabled}
          >
            {isAutoPlayEnabled ? (
              <Pause aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
            ) : (
              <Play aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
            )}
            {autoPlayLabel}
          </button>
          <button
            type="button"
            onClick={() => moveSlide(-1)}
            disabled={activeIndex === 0}
            className="grid size-10 place-items-center rounded-lg border border-[var(--line)] bg-[var(--white)] text-[var(--ink)] transition hover:border-[var(--ink)] hover:bg-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Show previous highlighted find"
          >
            <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => moveSlide(1)}
            disabled={isAtFinalSlide}
            className="grid size-10 place-items-center rounded-lg border border-[var(--line)] bg-[var(--white)] text-[var(--ink)] transition hover:border-[var(--ink)] hover:bg-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Show next highlighted find"
          >
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div className="mb-1 flex items-center gap-3 text-xs font-bold text-[var(--muted)]">
        <span>
          {String(activeIndex + 1).padStart(2, "0")} / {String(deals.length).padStart(2, "0")}
        </span>
        <span className="featured-carousel-timer" data-paused={!isAutoAdvancing} aria-hidden="true">
          <span key={timerKey} className="featured-carousel-timer-progress" />
        </span>
      </div>

      <div
        ref={carouselRef}
        className="featured-carousel-track scrollbar-none"
        onScroll={handleScroll}
        aria-label="Highlighted Scout finds"
      >
        {deals.map((deal, index) => {
          const isActive = index === activeIndex;
          const colorway = FEATURED_COLORWAYS[index % FEATURED_COLORWAYS.length];
          const cardStyle = {
            "--featured-accent": colorway.accent,
            "--featured-label": colorway.label,
            "--featured-surface": colorway.surface,
          } as CSSProperties;

          return (
            <Link
              key={deal.id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              href={`/deals/${deal.id}`}
              className={`featured-carousel-card group ${
                isActive ? "featured-carousel-card-active" : ""
              }`}
              style={cardStyle}
              aria-label={`Highlight ${index + 1} of ${deals.length}: ${deal.title}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--white)] transition-colors group-hover:border-[var(--ink)]">
                <Image
                  src={deal.imageUrl}
                  alt={deal.title}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 320px, 352px"
                  className="object-contain p-6 transition duration-300 ease-out group-hover:scale-[1.025]"
                />
              </div>
              <div className="pt-3">
                <p className="utility-label capitalize">{deal.category}</p>
                <div className="mt-1 flex items-start justify-between gap-4">
                  <h3 className="line-clamp-2 text-base font-bold leading-snug tracking-[-0.015em]">
                    {deal.title}
                  </h3>
                  <p className="shrink-0 text-sm font-extrabold tracking-[-0.02em]">
                    ${deal.price}
                  </p>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">
                  {deal.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
