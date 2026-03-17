interface PlaceholderLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-10',
};

export function PlaceholderLogo({ className = '', size = 'md' }: PlaceholderLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizes[size]} aspect-square rounded-lg bg-primary flex items-center justify-center`}>
        <span className="text-primary-foreground font-semibold text-sm">N</span>
      </div>
      <span className="font-semibold text-xl text-foreground">
        Nusago
        <span className="text-primary ml-0.5">Partner</span>
      </span>
    </div>
  );
}
