export type MediaType = 'movie' | 'tv' | 'book'
export type MediaStatus = 'queued' | 'watching' | 'completed' | 'dropped'
export type Sort = 'Log date' | 'Title' | 'Year' | 'Rating'
export interface MediaItem {
  id: string; type: MediaType; title: string; year: number; poster: string;
  genres: string[]; status: MediaStatus; addedAt: string; runtime?: number;
  author?: string; director?: string; rating?: number; notes?: string; description: string;
}
export const statuses: MediaStatus[] = ['queued', 'watching', 'completed', 'dropped']
export const label = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)
