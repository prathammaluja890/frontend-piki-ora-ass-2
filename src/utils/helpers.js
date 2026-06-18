// A few tiny formatting helpers shared across pages.

// Build initials from a first/last name pair, e.g. "Shreya Patel" → "SP".
export function initials(firstName = '', lastName = '') {
  return ((firstName[0] || '') + (lastName[0] || '')).toUpperCase();
}

// Map the three day-letter codes back to readable labels for display.
const DAY_LABELS = {
  mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu',
  fri: 'Fri', sat: 'Sat', sun: 'Sun',
};
export function formatDays(days = []) {
  return days.map((d) => DAY_LABELS[d] || d).join(', ');
}

// Format an ISO date string (YYYY-MM-DD) into something friendlier.
export function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}
