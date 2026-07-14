import Link from "next/link";

type BrandLockupProps = {
  compact?: boolean;
};

export function BrandLockup({ compact = false }: BrandLockupProps) {
  return (
    <Link href="/" className="brand-lockup" aria-label="Scout home">
      <span className="brand-name">SCOUT</span>
      {!compact && <span className="brand-descriptor">community finds</span>}
    </Link>
  );
}
