type ThumbnailsDataKeys = 'default' | 'medium' | 'high' | 'standard' | 'maxres';

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Localized {
  title: string;
  description: string;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: { [T in ThumbnailsDataKeys]: Thumbnail };
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  defaultLanguage?: string;
  localized: Localized;
  defaultAudioLanguage: string;
}

interface Statistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

interface SearchItem {
  kind: string;
  etag: string;
  snippet: Snippet;
  statistics: Statistics;
}
export interface SearchItemDefault extends SearchItem {
  id: {
    kind: string;
    videoId: string;
  };
}

export interface SearchItemDetails extends SearchItem {
  id: string;
}
