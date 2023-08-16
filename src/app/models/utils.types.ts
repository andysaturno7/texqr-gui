export type Stored<T> = Partial<T> & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
