import type { Benefit } from "@/app/data/home";

type BenefitCardProps = {
  benefit: Benefit;
};

export function BenefitCard({ benefit }: BenefitCardProps) {
  return (
    <article className="grid gap-4 border-t border-white/15 py-8 first:border-t-0 md:grid-cols-[4rem_1fr] md:gap-6 md:py-10">
      <div className="flex items-start md:pt-1">
        <span className="font-mono text-xs text-[#e9b95f]">
          {benefit.number}
        </span>
      </div>
      <div>
        <h3 className="text-xl font-semibold">{benefit.title}</h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
        {benefit.copy}
        </p>
      </div>
    </article>
  );
}
