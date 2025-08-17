import axios from 'axios';

const API_BASE_URL = 'http://api.lahzeh.me/api/user/';

interface RequestOptions<T = unknown> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  body?: T;
  headers?: Record<string, string>;
}

export const apiRequest = async ({
  method = 'POST',
  endpoint,
  body,
  headers = {},
}: RequestOptions) => {
  try {
    console.log({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers,
    })

    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...headers,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('API Error:', error.message);
      throw error.message;
    } else {
      console.error('API Error:', error);
      throw error;
    }
  }
};
