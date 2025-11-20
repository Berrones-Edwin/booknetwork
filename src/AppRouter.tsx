
import { BrowserRouter, Routes, Route } from "react-router";
import { lazy } from "react";
import { PrivateRoute, PublicRoute } from "./pages/routes/guards";

// 👇 importa tus páginas
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));

const BooksPage = lazy(() => import("./pages/books/BooksPage"));
const BookDetailsPage = lazy(() => import("./pages/books/BookDetailPage"));
const BorrowedBooksPage = lazy(() => import("./pages/books/BookBorrowedPage"));
const MyBooksPage = lazy(() => import("./pages/books/MyBooksPage"));
const ReturnedBooksPage = lazy(() => import("./pages/books/BooksReturnedPage"));

export default function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>

        {/* -------------------- */}
        {/* Public routes */}
        {/* -------------------- */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />


        {/* -------------------- */}
        {/* Private routes */}
        {/* -------------------- */}
        <Route
          path="/books"
          element={
            <PrivateRoute>
              <BooksPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/books/:id"
          element={
            <PrivateRoute>
              <BookDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/books/borrowed"
          element={
            <PrivateRoute>
              <BorrowedBooksPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/books/my-books"
          element={
            <PrivateRoute>
              <MyBooksPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/books/returned"
          element={
            <PrivateRoute>
              <ReturnedBooksPage />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}