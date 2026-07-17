export type SortOrder = 'asc' | 'desc';

export type SortBy<E, T extends keyof E> = keyof Pick<E, T>;

export interface Sorting<T> {
  sort?: SortOrder;
  sortBy?: T;
}
