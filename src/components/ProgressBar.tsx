interface ProgressBarProps {
  value: number;
  label?: string;
  size?: 'sm' | 'md';
}

export function ProgressBar({ value, label, size = 'md' }: ProgressBarProps) {
  const color = value >= 100 ? 'bg-emerald-500' : value > 0 ? 'bg-amber-500' : 'bg-gray-300';
  const h = size === 'sm' ? 'h-2' : 'h-3';

  return (
    <div className="w-full">
      {label && <div className="flex justify-between text-xs text-gray-600 mb-1"><span>{label}</span><span>{value}%</span></div>}
      <div className={`w-full ${h} bg-gray-200 rounded-full overflow-hidden`}>
        <div className={`${h} ${color} rounded-full transition-all duration-300`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  );
}
