import type { WeekStatus } from '../types';

const config: Record<WeekStatus, { bg: string; text: string; label: string }> = {
  'completed': { bg: 'bg-emerald-100', text: 'text-emerald-700', label: '완료' },
  'in-progress': { bg: 'bg-amber-100', text: 'text-amber-700', label: '진행 중' },
  'not-started': { bg: 'bg-gray-100', text: 'text-gray-500', label: '미시작' },
};

export function WeekBadge({ status }: { status: WeekStatus }) {
  const c = config[status];
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>{c.label}</span>;
}
