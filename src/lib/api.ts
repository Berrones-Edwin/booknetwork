import { getAuthToken } from './auth';
import type {
  RegistrationRequest,
  AuthenticationRequest,
  AuthenticationResponse,
  BookRequest,
  BookResponse,
  PageResponseBookResponse,
  PageResponseBorrowedBookResponse,
  FeedBackRequest,
  PageResponseFeedBackResponse,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Auth APIs
export const authApi = {
  register: (data: RegistrationRequest): Promise<{ message: string }> =>
    fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: AuthenticationRequest): Promise<AuthenticationResponse> =>
    fetchWithAuth('/auth/authenticate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Book APIs
export const bookApi = {
  getAllBooks: (page = 0, size = 10): Promise<PageResponseBookResponse> =>
    fetchWithAuth(`/books?page=${page}&size=${size}`),

  getBookById: (id: number): Promise<BookResponse> =>
    fetchWithAuth(`/books/${id}`),

  createBook: (data: BookRequest): Promise<number> =>
    fetchWithAuth('/books', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateBook: (id: number, data: BookRequest): Promise<number> =>
    fetchWithAuth(`/books/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  getOwnerBooks: (page = 0, size = 10): Promise<PageResponseBookResponse> =>
    fetchWithAuth(`/books/owner?page=${page}&size=${size}`),

  borrowBook: (id: number): Promise<number> =>
    fetchWithAuth(`/books/borrow/${id}`, {
      method: 'POST',
    }),

  returnBook: (id: number): Promise<number> =>
    fetchWithAuth(`/books/borrow/return/${id}`, {
      method: 'PATCH',
    }),

  approveReturn: (id: number): Promise<number> =>
    fetchWithAuth(`/books/borrow/return/approve/${id}`, {
      method: 'PATCH',
    }),

  updateShareableStatus: (id: number): Promise<number> =>
    fetchWithAuth(`/books/shareable/${id}`, {
      method: 'PATCH',
    }),

  updateArchivedStatus: (id: number): Promise<number> =>
    fetchWithAuth(`/books/archived/${id}`, {
      method: 'PATCH',
    }),

  getBorrowedBooks: (page = 0, size = 10): Promise<PageResponseBorrowedBookResponse> =>
    fetchWithAuth(`/books/borrowed?page=${page}&size=${size}`),

  getReturnedBooks: (page = 0, size = 10): Promise<PageResponseBorrowedBookResponse> =>
    fetchWithAuth(`/books/returned?page=${page}&size=${size}`),
};

// Feedback APIs
export const feedbackApi = {
  saveFeedback: (data: FeedBackRequest): Promise<number> =>
    fetchWithAuth('/feedbacks', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getFeedbacksByBook: (bookId: number, page = 0, size = 10): Promise<PageResponseFeedBackResponse> =>
    fetchWithAuth(`/feedbacks/book/${bookId}?page=${page}&size=${size}`),
};
