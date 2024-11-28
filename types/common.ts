interface PaginationMetaInfo {
  meta: Meta;
}

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export type { PaginationMetaInfo, Meta, Link };