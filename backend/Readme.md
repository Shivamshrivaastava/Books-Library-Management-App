# Books Library Management System

A full-stack MERN application for managing a books library, similar to GoodReads.

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **Book Management**: CRUD operations for books with search and filtering
- **Personal Library**: Users can add books to their personal collection
- **Reading Status**: Track books as "Want to Read", "Currently Reading", or "Read"
- **Rating System**: Rate books from 1-5 stars
- **Admin Features**: Admin users can manage all books

## Backend Structure

\`\`\`
backend/
├── server.js              # Main server file
├── config/
│   └── database.js        # MongoDB connection
├── models/
│   ├── User.js           # User model
│   ├── Book.js           # Book model
│   └── MyBook.js         # User's personal books model
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── bookController.js  # Book management logic
│   └── myBookController.js # Personal books logic
├── routes/
│   ├── authRoutes.js     # Authentication routes
│   ├── bookRoutes.js     # Book routes
│   └── myBookRoutes.js   # Personal books routes
├── middleware/
│   └── auth.js           # Authentication middleware
├── scripts/
│   └── seedBooks.js      # Database seeding script
├── package.json
└── .env
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Books
- `GET /api/books` - Get all books (with pagination, search, filter)
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create new book (authenticated)
- `PUT /api/books/:id` - Update book (authenticated)
- `DELETE /api/books/:id` - Delete book (authenticated)

### My Books
- `GET /api/mybooks` - Get user's personal books
- `POST /api/mybooks/:bookId` - Add book to personal collection
- `PATCH /api/mybooks/:bookId/status` - Update reading status
- `PATCH /api/mybooks/:bookId/rating` - Update book rating
- `DELETE /api/mybooks/:bookId` - Remove book from collection

## Getting Started

1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables in `.env`:
   \`\`\`
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   \`\`\`

4. Seed the database with sample books:
   \`\`\`bash
   npm run seed
   \`\`\`

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

The API will be available at `http://localhost:5000`

## Database Collections

### Users
- name, email, password (hashed), role (user/admin)

### Books
- title, author, isbn, category, description, totalCopies, availableCopies, publishedYear, coverImage, addedBy

### MyBooks
- userId, bookId, status, rating, review, dateStarted, dateFinished

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Enabled for frontend integration
