/**
 * Utility functions for formatting data
 */

// Format time duration (minutes) to human-readable string
export const formatCookTime = (minutes) => {
  if (!minutes || minutes === 0) return '0 dk';
  if (minutes < 60) return `${minutes} dk`;
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (mins === 0) return `${hours} sa`;
  return `${hours} sa ${mins} dk`;
};

// Format date to Turkish locale
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// Format date to relative time (e.g., "2 saat önce")
export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 1) return 'Şimdi';
  if (diffMins < 60) return `${diffMins} dakika önce`;
  if (diffHours < 24) return `${diffHours} saat önce`;
  if (diffDays < 7) return `${diffDays} gün önce`;
  
  return formatDate(dateString);
};

// Format number with Turkish locale (e.g., 1.234,56)
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return new Intl.NumberFormat('tr-TR').format(num);
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Format serving size
export const formatServings = (servings) => {
  if (!servings) return '0 kişilik';
  return `${servings} kişilik`;
};

// Format difficulty level to Turkish
export const formatDifficulty = (difficulty) => {
  const map = {
    easy: 'Kolay',
    medium: 'Orta',
    hard: 'Zor',
    Kolay: 'Kolay',
    Orta: 'Orta',
    Zor: 'Zor',
  };
  return map[difficulty] || difficulty;
};

// Format tags array to comma-separated string
export const formatTags = (tags) => {
  if (!tags || !Array.isArray(tags)) return '';
  return tags.join(', ');
};

// Parse tags from comma-separated string to array
export const parseTags = (tagsString) => {
  if (!tagsString) return [];
  return tagsString
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
};