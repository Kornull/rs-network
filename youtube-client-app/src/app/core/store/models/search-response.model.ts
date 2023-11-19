import { SearchItemDefault, SearchItemDetails } from './search-item.model';

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface SearchResponse {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
}
export interface SearchResponseDefault extends SearchResponse {
  items: SearchItemDefault[];
}

export interface SearchResponseDetails extends SearchResponse {
  items: SearchItemDetails[];
}
