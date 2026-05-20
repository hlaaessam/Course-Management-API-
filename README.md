# Course Management REST API

A secure, scalable RESTful API built with **Node.js**, **Express.js (v5)**, and **MongoDB** using the Model-View-Controller (MVC) design pattern. This API handles user authentication, role-based authorization, token verification, input validation, and media uploads for a course management platform.

---

## Features

* **User Authentication & Authorization:** Secure signup and login powered by password hashing (`bcryptjs`), stateless session access tokens (`jsonwebtoken`), and strict role-based access control rules (`roles.js`, `allowedTo.js`).
* **Course & User Management:** Complete CRUD endpoints managing resource allocations, users, and course databases.
* **Global Error Handling:** Clean async controller wrappers (`asyncWrapper.js`) and unified operational error configurations (`appError.js`).
* **Robust Input Validation:** Strict request body processing and filtering powered by `express-validator` schemas.
* **File Upload Handling:** Integrated multipart/form-data storage middleware (`multer`) saving local media items inside the `uploads/` directory.
* **Security & Utility Middleware:** Includes Cross-Origin Resource Sharing (`cors`) policies and real-time network request logging using `morgan`.

---

## Built With

* **Runtime & Framework:** Node.js + Express.js (v5.1.0)
* **Database Object Modeling:** Mongoose (v9.0.0) + MongoDB
* **Security & Tokens:** `jsonwebtoken`, `bcryptjs`, and standard validation tools (`validator`)
* **File Processing:** `multer` (Media upload streams)
* **Developer Workspace Utils:** `dotenv` (Environment configurations) + `morgan` (HTTP logging middleware)

---

## Project Architecture

```text
NODEJS-ECOMMERSE-API-V1/
│
├── controllers/          # Route controller handlers (Business Logic)
│   ├── courses.controller.js
│   └── users.controller.js
│
├── middlewares/          # Custom Express middleware logic
│   ├── allowedTo.js      # Role verification guard
│   ├── asyncWrapper.js   # Try/Catch wrapper for global error handling
│   ├── validationSchema.js # Express-validator request definitions
│   └── verifyToken.js    # JWT payload inspection handler
│
├── models/               # MongoDB Mongoose Data Schemas
│   ├── course.model.js
│   └── user.model.js
│
├── routers/              # API Endpoint URL definitions
│   ├── courses.router.js
│   └── users.router.js
│
├── utils/                # Functional application global utilities
│   ├── appError.js       # Global operational error class handler
│   ├── generateJWT.js    # Token generation wrapper function
│   ├── httpStatusText.js # Success/Fail/Error status strings
│   └── roles.js          # Static system permissions matrix definitions
│
├── data/                 # Local data storage files / mocks
├── uploads/              # Local server disk engine file storage destinations
├── views/                # Static layout views / templates
├── .env                  # Configuration variables environment file (git ignored)
├── main.js / index.js    # Server entry bootstrappers
└── package.json          # Node dependency definition metrics

```
---

## ⚙️ Development Execution

Follow these steps to configure your environment and run the API locally:

### 1. Environment Configuration
Create a file named `.env` in the project's root directory and add your configuration keys:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_cryptographic_signing_key
```
### 2. Install Dependencies
Run the following command in your terminal to safely install all required node modules:
```bash
npm install

````
### 3. Start the Local Server
Execute the development script to spin up the server with automatic live-reloading:
```bash
npm run dev

