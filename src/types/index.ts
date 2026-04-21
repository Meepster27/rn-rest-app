export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';