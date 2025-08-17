import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://api.lahzeh.me/api/user/';

interface RequestOptions<T = unknown> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  body?: T;
  headers?: Record<string, string>;
}

interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  statusCode?: number;
}

export const apiRequest = async <T = unknown>({
  method = 'POST',
  endpoint,
  body,
  headers = {},
}: RequestOptions<T>): Promise<ApiResponse<T>> => {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data: body,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
    });

  return {
  data: response.data,
  message: response.data?.message,
  statusCode: response.data?.statusCode || response.status,
};
  } catch (err: unknown) {
    // بررسی خطا با استفاده از `unknown`
    if (err instanceof AxiosError && err.response) {
      const statusCode = err.response.status;
      const message =
        (err.response.data as { message?: string })?.message ||
        err.message ||
        'خطای ناشناخته در اتصال به سرور';

      console.error('API Error:', { statusCode, message });

      throw { statusCode, message };
    }

    // اگر خطا از نوع AxiosError نباشد
    console.error('خطای ناشناخته:', err);
    throw { statusCode: 500, message: 'خطای ناشناخته' };
  }
};
