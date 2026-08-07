"use client";
import React, { useRef, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@workspace/ui/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: React.ReactNode;
    description: React.ReactNode;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const cardLength = content.length;

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    const progress = maxScroll > 0 ? el.scrollTop / maxScroll : 0;

    const cardsBreakpoints = content.map((_, index) => index / (cardLength - 1 || 1));
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(progress - breakpoint);
        if (distance < Math.abs(progress - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  }, [content, cardLength]);

  return (
    <div
      className="thin-scrollbar relative flex h-[26rem] justify-center space-x-10 overflow-y-auto rounded-xl border border-border bg-card/40 p-6 sm:p-8"
      ref={ref}
      onScroll={handleScroll}
    >
      <div className="relative flex items-start px-2">
        <div className="max-w-md">
          {content.map((item, index) => (
            <div key={index} className="my-12 first:mt-2">
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="font-heading text-lg font-medium text-foreground"
              >
                {item.title}
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="mt-2 text-xs tracking-wide text-muted-foreground uppercase"
              >
                {item.description}
              </motion.div>
            </div>
          ))}
          <div className="h-32" />
        </div>
      </div>
      <div
        className={cn(
          "sticky top-1/2 hidden w-80 -translate-y-1/2 self-center overflow-hidden rounded-lg border border-border bg-background p-6 lg:block",
          contentClassName,
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </div>
  );
};
