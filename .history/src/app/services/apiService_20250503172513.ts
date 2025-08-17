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

export const apiRequest = async <T = any>({
  method = 'POST',
  endpoint,
  body,
  headers = {},
}: RequestOptions): Promise<ApiResponse<T>> => {
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
      statusCode: response.status,
    };
  } catch (err) {
    const error = err as AxiosError;

    const statusCode = error.response?.status;
    const message =
      (error.response?.data as )?.message ||
      error.message ||
      'خطای ناشناخته در اتصال به سرور';

    console.error('API Error:', { statusCode, message });

    throw { statusCode, message };
  }
};
