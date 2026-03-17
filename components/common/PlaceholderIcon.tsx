interface PlaceholderIconProps {
  name?: string;
  className?: string;
  size?: number;
}

export function PlaceholderIcon({ 
  name = 'icon', 
  className = '', 
  size = 24 
}: PlaceholderIconProps) {
  return (
    <div
      className={`flex items-center justify-center rounded bg-muted text-muted-foreground ${className}`}
      style={{ width: size, height: size }}
      aria-label={name}
    >
      <span className="text-xs font-medium" style={{ fontSize: size * 0.4 }}>
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}
