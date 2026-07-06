export const SUBMISSION_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'reviewing', label: 'Reviewing' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'decline', label: 'Decline' },
  { value: 'approve', label: 'Approve' },
  { value: 'suggestion', label: 'Suggestion' },
];

export const SUBMISSION_STATUS_VALUES = SUBMISSION_STATUSES.map((s) => s.value);

export function submissionStatusLabel(status) {
  if (status === 'completed') return 'Approve';
  const match = SUBMISSION_STATUSES.find((s) => s.value === status);
  return match ? match.label : status;
}

export function submissionStatusBadgeClass(status) {
  const map = {
    pending: 'purple',
    reviewing: 'blue',
    reviewed: 'blue',
    decline: 'red',
    approve: 'green',
    completed: 'green',
    suggestion: 'gold',
  };
  return map[status] || 'purple';
}

export const SUBMISSION_STATUS_COLORS = {
  Pending: '#094A25',
  Reviewing: '#0ea5e9',
  Reviewed: '#22c55e',
  Decline: '#ef4444',
  Approve: '#15803d',
  Suggestion: '#eab308',
};
