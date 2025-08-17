// API Response Types

export interface PostSubSubCategory {
  id: string;
  name: string;
  image?: string;
  active: number;
  post_sub_category_name: string;
}

export interface PostSubCategory {
  id: string;
  name: string;
  image?: string;
  active: number;
  post_category_name: string;
}

export interface PostCategory {
  id: string;
  name: string;
  image?: string;
  active: number;
}

export interface Post {
  id: string;
  title: string;
  poster: string;
  duration: string;
  like_count: number;
  audio_file: string;
  description?: string;
  active: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}
