// ===========================
// Authentication
// ===========================
export interface RegistrationRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface AuthenticationRequest {
    email: string;
    password: string;
}

export interface AuthenticationResponse {
    token?: string;
}

// ===========================
// FeedBack
// ===========================
export interface FeedBackRequest {
    note?: number; // 0 - 5
    comment: string;
    bookId: number;
}

export interface FeedBackResponse {
    note?: number;
    comment?: string;
    ownFeedBack?: boolean;
}

export interface PageResponseFeedBackResponse {
    content?: FeedBackResponse[];
    number?: number;
    size?: number;
    total?: number;
    totalPages?: number;
    first?: boolean;
    last?: boolean;
}

// ===========================
// Book
// ===========================
export interface BookRequest {
    id?: number;
    title: string;
    authorName: string;
    isbn: string;
    synopsis?: string;
    shareable?: boolean;
}

export interface BookResponse {
    title?: string;
    authorName?: string;
    isbn?: string;
    synopsis?: string;
    owner?: string;
    cover?: string; // byte[]
    rate?: number;
    archived?: boolean;
    shareable?: boolean;
    id?: number;
}

export interface PageResponseBookResponse {
    content?: BookResponse[];
    number?: number;
    size?: number;
    total?: number;
    totalPages?: number;
    first?: boolean;
    last?: boolean;
}

// ===========================
// Borrowed Books
// ===========================
export interface BorrowedBookResponse {
    title?: string;
    authorName?: string;
    isbn?: string;
    rate?: number;
    returned?: boolean;
    returnApproved?: boolean;
    id?: number;
}

export interface PageResponseBorrowedBookResponse {
    content?: BorrowedBookResponse[];
    number?: number;
    size?: number;
    total?: number;
    totalPages?: number;
    first?: boolean;
    last?: boolean;
}
