"use client";

import type { Deal } from "@/app/types/deal";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const AUTO_ADVANCE_MS = 5000;

type FeaturedDealsCarouselProps = {
  deals: Deal[];
};

export function FeaturedDealsCarousel({ deals }: FeaturedDealsCarouselProps) {
  const [autoplay] = useState(() =>
    Autoplay({
      delay: AUTO_ADVANCE_MS,
      playOnInit: false,
      stopOnFocusIn: false,
      stopOnInteraction: false,
      stopOnLastSnap: true,
      stopOnMouseEnter: false,
    }),
  );
  const [plugins] = useState(() => [autoplay]);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", containScroll: "keepSnaps", duration: 28, loop: false },
    plugins,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(deals.length > 1);
  const [isPointerOver, setIsPointerOver] = useState(false);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [isCarouselReady, setIsCarouselReady] = useState(false);

  const updateCarouselState = useCallback(() => {
    if (!emblaApi) return;

    const nextIndex = emblaApi.selectedScrollSnap();
    setActiveIndex(nextIndex);
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());

    if (nextIndex === deals.length - 1) {
      setIsAutoPlayEnabled(false);
    }
  }, [deals.length, emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("reInit", updateCarouselState);
    emblaApi.on("select", updateCarouselState);
    const frameId = window.requestAnimationFrame(() => {
      updateCarouselState();
      setIsCarouselReady(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      setIsCarouselReady(false);
      emblaApi.off("reInit", updateCarouselState);
      emblaApi.off("select", updateCarouselState);
    };
  }, [emblaApi, updateCarouselState]);

  useEffect(() => {
    if (!emblaApi) return;

    const resetTimer = () => setTimerKey((current) => current + 1);
    emblaApi.on("autoplay:timerset", resetTimer);

    return () => {
      emblaApi.off("autoplay:timerset", resetTimer);
    };
  }, [emblaApi]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () =>
      setPrefersReducedMotion(mediaQuery.matches);

    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);

    return () => mediaQuery.removeEventListener("change", syncMotionPreference);
  }, []);

  const isAtFinalSlide = activeIndex === deals.length - 1;
  const isAutoAdvancing =
    isCarouselReady &&
    deals.length > 1 &&
    isAutoPlayEnabled &&
    !isPointerOver &&
    !prefersReducedMotion &&
    !isAtFinalSlide;

  useEffect(() => {
    if (!emblaApi || !isCarouselReady) return;

    const frameId = window.requestAnimationFrame(() => {
      const autoplayApi = emblaApi.plugins().autoplay;
      if (!autoplayApi) return;

      if (isAutoAdvancing) {
        autoplayApi.play();
      } else {
        autoplayApi.stop();
      }
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [emblaApi, isAutoAdvancing, isCarouselReady]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const restartOrToggleAutoPlay = useCallback(() => {
    if (!emblaApi) return;

    if (isAtFinalSlide) {
      emblaApi.scrollTo(0);
      setIsAutoPlayEnabled(true);
      return;
    }

    setIsAutoPlayEnabled((current) => !current);
  }, [emblaApi, isAtFinalSlide]);

  const handleFocusLeave = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (
        event.relatedTarget instanceof Node &&
        event.currentTarget.contains(event.relatedTarget)
      ) {
        return;
      }

      setIsPointerOver(false);
    },
    [],
  );

  const autoPlayLabel = isAtFinalSlide
    ? "Restart"
    : isAutoPlayEnabled
      ? "Pause"
      : "Play";

  return (
    <div
      className="mt-9"
      onPointerEnter={() => setIsPointerOver(true)}
      onPointerLeave={() => setIsPointerOver(false)}
      onFocusCapture={() => setIsPointerOver(true)}
      onBlurCapture={handleFocusLeave}
    >
      <div className="mb-1 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="text-sm text-[var(--muted)]">
          A short run of current picks from the board.
        </p>
        <div
          className="flex shrink-0 items-center gap-2"
          aria-label="Carousel controls"
        >
          <button
            type="button"
            onClick={restartOrToggleAutoPlay}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-xs font-bold text-[var(--ink)] transition hover:border-[var(--ink)] hover:bg-[var(--surface)]"
            aria-pressed={!isAutoPlayEnabled}
          >
            {isAutoPlayEnabled && !isAtFinalSlide ? (
              <Pause
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={1.8}
              />
            ) : (
              <Play aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
            )}
            {autoPlayLabel}
          </button>
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="grid size-10 place-items-center rounded-lg border border-[var(--line)] bg-[var(--white)] text-[var(--ink)] transition hover:border-[var(--ink)] hover:bg-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Show previous highlighted find"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4"
              strokeWidth={1.8}
            />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="grid size-10 place-items-center rounded-lg border border-[var(--line)] bg-[var(--white)] text-[var(--ink)] transition hover:border-[var(--ink)] hover:bg-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Show next highlighted find"
          >
            <ArrowRight
              aria-hidden="true"
              className="size-4"
              strokeWidth={1.8}
            />
          </button>
        </div>
      </div>

      <div className="mb-1 flex items-center gap-3 text-xs font-bold text-[var(--muted)]">
        <span>
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(deals.length).padStart(2, "0")}
        </span>
        <span
          className="featured-carousel-timer"
          data-paused={!isAutoAdvancing}
          aria-hidden="true"
        >
          <span key={timerKey} className="featured-carousel-timer-progress" />
        </span>
      </div>

      <div
        className="featured-embla-viewport"
        ref={emblaRef}
        aria-label="Highlighted Scout finds"
      >
        <div className="featured-embla-container">
          {deals.map((deal, index) => {
            const isActive = index === activeIndex;

            return (
              <Link
                key={deal.id}
                href={`/deals/${deal.id}`}
                className={`featured-carousel-card group ${
                  isActive ? "featured-carousel-card-active" : ""
                }`}
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
    </div>
  );
}
