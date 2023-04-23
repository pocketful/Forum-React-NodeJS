# Q&A Forum App

Q&A Forum application, a full-stack platform built with React, Node.js (Express.js), and MySQL2.
This project was independently designed to create a user-friendly forum, allowing users to ask questions, provide and vote for the answers, similar to [Stack Overflow](https://stackoverflow.com/questions).

The project follows a microservices architecture with separate services for user registration, login, questions, and answers. Each service has dedicated routes, controllers, and models, sharing a common database. Communication is streamlined through a unified API under the '/api' endpoint, promoting modularity.

React-powered interface leverages React components and hooks to deliver real-time updates.

# 💻 Demo

<img src="client/src/assets/img/examples/example.gif" alt="Website demo" width="600" height="auto">

To use all the functionality of the website, you need to register your own user account or login using the following credentials:

- Email: `hermionegranger@email.com`
- Password: `secret123`

Note that users can only modify and delete their own questions and answers.

# 🎨 Main features

- **Voting System**: Delete a vote by clicking the same icon, post a vote when no prior vote exists, or patch a vote by toggling between different icons.
- **Full-Stack Design**: Independently crafted the project design, ensuring a cohesive and user-friendly experience.
- **User Authentication**: Incorporated JSON tokens for secure user authentication.
- **Data Validation**: Implemented validation both in the backend and frontend for robust data integrity.
- **Responsive design**: Ensured a seamless experience across various devices.
- **Database**: The database setup for questions, answers, answer votes, and users, uses constraints to maintain data integrity and relational links, automating updates and deletions.

# ⚙️ Functionality

### Users

- **Register**
- **Log in**
- **Logout**

### Questions

- **View**: Browse a list of questions, sorted by creation date or the number of answers in ascending or descending order.
- **Filter**: Filter questions based on whether they are answered or unanswered.
- **Ask**: Post a new question _(available only when logged in)_.
- **Update**: Modify your posted question, with the UI indicating that the question has been updated _(available only when logged in)_.
- **Delete**: Remove your own question _(available only when logged in)_.

### Answers

- **View**: Explore answers to questions
- **Answer**: Post responses to questions _(available only when logged in)_.
- **Update**: Modify your own answer, with the UI indicating that the response has been updated _(available only when logged in)_.
- **Delete**: Remove your own response _(available only when logged in)_.
- **Like/Dislike/Reset**: Express preferences for other users' answers _(available only when logged in)_.

# 🔧 Technologies used

### 🖼️ Front-end

- JavaScript library: [React](https://reactjs.org/)
- Declarative routing: [React Router DOM](https://reactrouter.com/en/main)
- Form handling: [Formik](https://formik.org/)
- Schema builder for validation: [Yup](https://github.com/jquense/yup)
- Toast notifications: [React Hot Toast](https://react-hot-toast.com/)
- Type checking: [PropTypes](https://github.com/facebook/prop-types/)

### 🏗️ Back-end

- Framework for Node.js: [Express](https://expressjs.com/)
- Database client: [MySQL2](https://github.com/sidorares/node-mysql2)
- Authentication tokens: [JsonWebToken(JWT)](https://github.com/auth0/node-jsonwebtoken)
- Password hashing: [Bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- Object schema validation: [Joi](https://joi.dev/)
- Code linting: [ESLint](https://eslint.org/) with [Airbnb Style Guide](https://airbnb.io/javascript/react/)
- Environment configuration: [Dotenv](https://github.com/motdotla/dotenv)
- HTTP request logger: [Morgan](https://github.com/expressjs/morgan#readme)
- Automatic restarting: [Nodemon](https://nodemon.io/)

# 🚀 Getting started

### 🔨 Configure files

Rename the `.env.example` files in the server and client folders to `.env` and put your configuration variables in it.

```bash
# Rename
mv server/.env.example server/.env && mv client/.env.example client/.env
```

To create the necessary database tables for this project in your MySQL database, run the `qa_forum.sql` file located in the `server/db/` directory using your preferred method (MySQL CLI or using GUI tool like phpMyAdmin or MySQL Workbench).
The file incorporates sample data to provide a foundation for testing and development purposes.

### 🎈 Start the project

```bash
# Install project dependencies
npm i

# Install server and client dependencies
npm run iall

# Start both the server and the client in development mode simultaneously
npm run all
```

[🔼 Back To Top](#top)
