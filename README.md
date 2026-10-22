# Members Only

A private clubhouse message board built with Node.js, Express, EJS, and PostgreSQL as part of The Odin Project curriculum.

## Features

- **User Authentication:** Sign up, log in, and log out securely using Passport.js.
- **Password Security:** Passwords are hashed using bcrypt before being stored in the database.
- **Membership System:** Logged-in users can join the club by entering a passcode.
- **Message Board:** Authenticated users can create messages.
- **Member-Only Information:** Only club members and administrators can see message authors and timestamps.
- **Admin Permissions:** Administrators can delete messages, while regular users cannot.
- **Input Validation:** Form inputs are validated using express-validator.
- **Responsive UI:** EJS templates and custom CSS provide a clean interface.

## Tech Stack

- Node.js
- Express.js
- EJS
- PostgreSQL
- node-postgres (`pg`)
- Passport.js and passport-local
- express-session
- bcrypt
- express-validator
- dotenv
- HTML and CSS

## Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL

### 1. Initialize the project

If you are setting up the project from scratch, initialize `package.json`:

```bash
npm init -y
```

### 2. Install dependencies

Install the packages used by this project:

```bash
npm install express express-session pg passport passport-local ejs express-validator dotenv bcrypt
```

These packages provide:

- `express` — Web server and routing.
- `express-session` — Session management.
- `pg` — PostgreSQL database connection.
- `passport` — Authentication middleware.
- `passport-local` — Username and password authentication.
- `ejs` — Server-side HTML templates.
- `express-validator` — Form validation.
- `dotenv` — Loads environment variables from `.env`.
- `bcrypt` — Password hashing.

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_session_secret
CLUB_PASSCODE=your_club_passcode
```

Replace the example values with your own configuration. Never commit your `.env` file or expose your secrets publicly.

### 4. Set up the database

Create a PostgreSQL database named `members_only` and create the required `users` and `messages` tables according to the project's database schema.

### 5. Start the application

Run the start script defined in `package.json`. If the application starts with `app.js`, you can use:

```bash
node app.js
```

Open `http://localhost:3000` in your browser.


```bash
node app.js
```

Open `http://localhost:3000` in your browser.

## What I Learned

- Building server-rendered web applications with Express and EJS.
- Designing relational database tables and using SQL joins.
- Implementing authentication and session management with Passport.js.
- Hashing passwords securely with bcrypt.
- Enforcing membership-based access control and administrator permissions.
- Validating user input and handling form submissions.
- Connecting a PostgreSQL database to an Express application.

## Project Status

Completed for learning purposes. Deployment is currently skipped.
