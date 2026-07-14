"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

type ShareDealButtonProps = {
  title: string;
};

export function ShareDealButton({ title }: ShareDealButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = { title: `${title} | Common Good`, url: window.location.href };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
    }
  };

  return (
    <button type="button" onClick={handleShare} className="button-secondary w-full sm:w-auto">
      {copied ? <Check aria-hidden="true" className="size-4" /> : <Share2 aria-hidden="true" className="size-4" />}
      {copied ? "Link copied" : "Share this deal"}
    </button>
  );
}
