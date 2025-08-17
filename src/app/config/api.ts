// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.lahzeh.me',
  ENDPOINTS: {
    // Authentication
    LOGIN: '/api/user/login',
    REGISTER: '/api/user/register',
    OTP_LOGIN: '/api/user/otp-login',
    OTP_VERIFY: '/api/user/otp-verify',
    OTP_FIREBASE_VERIFY: '/api/user/otp-firebase-verify',
    LOGOUT: '/api/user/logout',
    
    // User
    USER_ME: '/api/user/me',
    USER_LOGOUT: '/api/user/logout',
    
    // Categories
    POST_CATEGORIES: '/api/user/post-category',
    POST_CATEGORY_BY_ID: (id: string) => `/api/user/post-category/${id}`,
    POST_CATEGORY_SUBCATEGORIES: (id: string) => `/api/user/post-category/${id}/post-sub-categories`,
    
    // Sub Categories
    POST_SUBCATEGORY_BY_ID: (id: string) => `/api/user/post-sub-category/${id}`,
    POST_SUBCATEGORY_SUB_SUBCATEGORIES: (id: string) => `/api/user/post-sub-category/${id}/post-sub-sub-categories`,
    
    // Sub Sub Categories
    POST_SUB_SUBCATEGORY_BY_ID: (id: string) => `/api/user/post-sub-sub-category/${id}`,
    POST_SUB_SUBCATEGORY_POSTS: (id: string) => `/api/user/post-sub-sub-category/${id}/posts`,
    
    // Posts
    LATEST_POSTS: '/api/user/latest-posts',
    POST_BY_ID: (id: string) => `/api/user/post/${id}`,
    POSTS_SEARCH: '/api/user/posts/search',
    
    // Post Interactions
    POST_LIKE: (id: string) => `/api/user/post/${id}/like`,
    POST_LIKED: (id: string) => `/api/user/post/${id}/liked`,
    POST_FAVOURITE: (id: string) => `/api/user/post/${id}/favourite`,
    POST_FAVOURITED: (id: string) => `/api/user/post/${id}/favourited`,
    FAVOURITE_POSTS: '/api/user/favourite-posts',
    
    // Subscriptions
    SUBSCRIPTION_PLANS: '/api/user/subscription-plans',
    
    // Specific Categories (Meditation & Sleep)
    MEDITATION_SUBCATEGORIES: '/api/user/post-category/6/post-sub-categories',
    SLEEP_SUBCATEGORIES: '/api/user/post-category/7/post-sub-categories',
  }
};

// Helper function to build full URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Common API functions
export const apiHelpers = {
  // Build URL with parameters
  buildUrl: (endpoint: string): string => buildApiUrl(endpoint),
  
  // Get authorization headers
  getAuthHeaders: (token?: string): Record<string, string> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
  },
  
  // Common request configuration
  getRequestConfig: (token?: string) => ({
    headers: apiHelpers.getAuthHeaders(token),
  }),
};

// Export individual endpoint builders for convenience
export const API_ENDPOINTS = {
  // Authentication
  login: () => buildApiUrl(API_CONFIG.ENDPOINTS.LOGIN),
  register: () => buildApiUrl(API_CONFIG.ENDPOINTS.REGISTER),
  otpLogin: () => buildApiUrl(API_CONFIG.ENDPOINTS.OTP_LOGIN),
  otpVerify: () => buildApiUrl(API_CONFIG.ENDPOINTS.OTP_VERIFY),
  otpFirebaseVerify: () => buildApiUrl(API_CONFIG.ENDPOINTS.OTP_FIREBASE_VERIFY),
  logout: () => buildApiUrl(API_CONFIG.ENDPOINTS.LOGOUT),
  
  // User
  userMe: () => buildApiUrl(API_CONFIG.ENDPOINTS.USER_ME),
  userLogout: () => buildApiUrl(API_CONFIG.ENDPOINTS.USER_LOGOUT),
  
  // Categories
  postCategories: () => buildApiUrl(API_CONFIG.ENDPOINTS.POST_CATEGORIES),
  postCategoryById: (id: string) => buildApiUrl(API_CONFIG.ENDPOINTS.POST_CATEGORY_BY_ID(id)),
  postCategorySubcategories: (id: string) => buildApiUrl(API_CONFIG.ENDPOINTS.POST_CATEGORY_SUBCATEGORIES(id)),
  
  // Sub Categories
  postSubcategoryById: (id: string) => buildApiUrl(API_CONFIG.ENDPOINTS.POST_SUBCATEGORY_BY_ID(id)),
  postSubcategorySubSubcategories: (id: string) => buildApiUrl(API_CONFIG.ENDPOINTS.POST_SUBCATEGORY_SUB_SUBCATEGORIES(id)),
  
  // Sub Sub Categories
  postSubSubcategoryById: (id: string) => buildApiUrl(API_CONFIG.ENDPOINTS.POST_SUB_SUBCATEGORY_BY_ID(id)),
  postSubSubcategoryPosts: (id: string) => buildApiUrl(API_CONFIG.ENDPOINTS.POST_SUB_SUBCATEGORY_POSTS(id)),
  
  // Posts
  latestPosts: () => buildApiUrl(API_CONFIG.ENDPOINTS.LATEST_POSTS),
  postById: (id: string) => buildApiUrl(API_CONFIG.ENDPOINTS.POST_BY_ID(id)),
  postsSearch: () => buildApiUrl(API_CONFIG.ENDPOINTS.POSTS_SEARCH),
  
  // Post Interactions
  postLike: (id: string) => buildApiUrl(API_CONFIG.ENDPOINTS.POST_LIKE(id)),
  postLiked: (id: string) => buildApiUrl(API_CONFIG.ENDPOINTS.POST_LIKED(id)),
  postFavourite: (id: string) => buildApiUrl(API_CONFIG.ENDPOINTS.POST_FAVOURITE(id)),
  postFavourited: (id: string) => buildApiUrl(API_CONFIG.ENDPOINTS.POST_FAVOURITED(id)),
  favouritePosts: () => buildApiUrl(API_CONFIG.ENDPOINTS.FAVOURITE_POSTS),
  
  // Subscriptions
  subscriptionPlans: () => buildApiUrl(API_CONFIG.ENDPOINTS.SUBSCRIPTION_PLANS),
  
  // Specific Categories
  meditationSubcategories: () => buildApiUrl(API_CONFIG.ENDPOINTS.MEDITATION_SUBCATEGORIES),
  sleepSubcategories: () => buildApiUrl(API_CONFIG.ENDPOINTS.SLEEP_SUBCATEGORIES),
};
