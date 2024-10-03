# Distributed Systems Project: Library Management System

This project implements a **Library Management System** using a microservices architecture. The system is designed to manage user authentication, book inventory, borrowing, reservations, and notifications, while ensuring scalability and fault tolerance.

## Functional Requirements

### 1. User Authentication and Authorization
- **Register new users**: Allow new users to sign up.
- **Authenticate users**: Verify credentials during login.
- **Manage roles and permissions**: Handle access control for different types of users.

### 2. Book Search
- **Search books**: Search by title, author, or genre.
- **Filter and sort results**: Enable sorting and filtering of search results.
- **View book details**: Retrieve detailed information about a specific book.

### 3. Book Availability and Reservation
- **Check availability**: View the availability status of a book.
- **Reserve a book**: Users can reserve books.
- **Cancel reservations**: Users can cancel existing reservations.

### 4. Book Borrowing and Returning
- **Borrow a book**: Check out a book for a user.
- **Return a book**: Return borrowed books.
- **Apply late fees**: Calculate and apply late fees for overdue books.

### 5. User Profile Management
- **Manage profiles**: View and update user profile information.
- **View borrowing history**: Users can see their borrowing records.
- **User preferences**: Manage user preferences and settings.

### 6. Notifications
- **Overdue notifications**: Notify users about overdue books.
- **Reservation notifications**: Inform users when reserved books are available.
- **Manage notification preferences**: Allow users to set their notification preferences.

### 7. Inventory Management
- **Add new books**: Add new books to the library’s inventory.
- **Update book details**: Modify existing book information.
- **Remove books**: Remove books from the inventory when necessary.

## Microservices Architecture

The system is composed of several independent services, each responsible for a specific domain of the library management system. These services communicate via RESTful APIs and message queues where applicable, promoting loose coupling and scalability.

### 1. Authentication Service
- **Scope**: Handles user registration, login, and role management.
- **Communication**: RESTful API to verify user credentials and permissions for other services.

### 2. Book Search Service
- **Scope**: Manages book searches, filtering, and sorting of results.
- **Communication**: RESTful API to interact with the book database and return search results to other services.

### 3. Book Availability and Reservation Service
- **Scope**: Manages the status of book availability, reservations, and cancellations.
- **Communication**: RESTful API to update availability and notify users of reservation status changes.

### 4. Borrowing and Returning Service
- **Scope**: Manages book checkouts, returns, and calculates overdue fees.
- **Communication**: RESTful API to update the book's availability, user borrowing history, and trigger notifications.

### 5. User Profile Management Service
- **Scope**: Handles user profile updates, borrowing history retrieval, and user settings.
- **Communication**: RESTful API to provide user information to other services, such as borrowing or reservation services.

### 6. Notification Service
- **Scope**: Sends notifications about overdue books, reservation updates, and other events.
- **Communication**: Uses message queues (e.g., RabbitMQ) to receive messages from other services and send notifications to users.

### 7. Inventory Management Service
- **Scope**: Manages the addition, update, and removal of books in the library's inventory.
- **Communication**: RESTful API to communicate with other services about book availability and information updates.

## Communication Patterns
- **RESTful APIs**: Most services communicate using RESTful APIs to exchange data efficiently.
- **Message Queues (e.g., RabbitMQ)**: Used for asynchronous communication, especially for handling notifications.

## Conclusion

This distributed Library Management System demonstrates how to design a scalable and modular system using microservices. Each service operates independently, focusing on a single domain, ensuring that the system is easy to scale, maintain, and extend.
