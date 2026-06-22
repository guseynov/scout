import { Grid2X2, Grid3X3 } from "lucide-react";
import { LayoutModel } from "../deals/store";
import clsx from "clsx";

export default function LayoutSelector({
  layout,
  onChange,
}: {
  layout: LayoutModel;
  onChange: (layout: LayoutModel) => void;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[color:rgba(255,255,255,0.35)] p-1">
      <button
        type="button"
        onClick={() => onChange(LayoutModel.Comfortable)}
        className={clsx(
          "inline-flex min-h-11 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition",
          layout === LayoutModel.Comfortable
            ? "bg-[var(--ink)] text-white"
            : "text-[var(--muted)] hover:bg-white/65 hover:text-[var(--ink)]",
        )}
        aria-label="Comfortable grid view"
        aria-pressed={layout === LayoutModel.Comfortable}
      >
        <Grid2X2 className="size-4 shrink-0" strokeWidth={1.7} />
        <span>Comfortable</span>
      </button>
      <button
        type="button"
        onClick={() => onChange(LayoutModel.Dense)}
        className={clsx(
          "inline-flex min-h-11 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition",
          layout === LayoutModel.Dense
            ? "bg-[var(--ink)] text-white"
            : "text-[var(--muted)] hover:bg-white/65 hover:text-[var(--ink)]",
        )}
        aria-label="Dense grid view"
        aria-pressed={layout === LayoutModel.Dense}
      >
        <Grid3X3 className="size-4 shrink-0" strokeWidth={1.7} />
        <span>Dense</span>
      </button>
    </div>
  );
}
