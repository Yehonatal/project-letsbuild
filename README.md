# letsBuild

**letsBuild** is a modern full-stack platform for sharing and managing creative ideas. It enables users to register, post ideas written in Markdown, vote, comment, and engage with the community. Ideas are ranked by engagement votes, views, and comments which also determine which ideas appear in the **Featured** section.

The platform is designed to help individuals and teams turn sparks of inspiration into discoverable, ranked, and discussed contributions. Built with a carefully selected tech stack, letsBuild emphasizes responsiveness, developer-friendly patterns, and clean design.

![homepage](/frontend//public/homepage.png)

##  Core Features

- Full **CRUD** operations for ideas
- **Markdown** support for idea content
- **Authentication & authorization** with protected routes
- **Votes, views, comments** to rank ideas
- **Featured ideas** based on popularity
- **Smooth UI interactions** powered by animations and transitions
- **Engagement-first design** focused on creativity and collaboration


## 🧱 Tech Stack Overview

| Layer     | Tools & Libraries                                                                 |
|-----------|------------------------------------------------------------------------------------|
| **Frontend** | React, TypeScript, TanStack Router, TanStack Query                              |
|           | Redux Toolkit, Redux Saga, React Markdown                                          |
|           | Tailwind CSS, Framer Motion, AOS (Animate on Scroll), Sonner                      |
|           | Lucide Icons (used for visuals)                                                   |
| **Backend**  | Node.js, Express.js, MongoDB (Mongoose ORM)                                     |
| **API**      | RESTful design with clearly defined routes for auth and idea management         |


##  API Endpoints

### Idea Endpoints

| Method | Route          | Description                      | Auth Required |
|--------|----------------|----------------------------------|---------------|
| GET    | `/ideas`       | Retrieve all public ideas        | ❌            |
| GET    | `/ideas/:id`   | Retrieve a single idea by ID     | ❌            |
| POST   | `/ideas`       | Create a new idea                | ✅            |
| PUT    | `/ideas/:id`   | Update an existing idea          | ✅ (owner)    |
| DELETE | `/ideas/:id`   | Delete an idea                   | ✅ (owner)    |


### Auth Endpoints

| Method | Route             | Description                                |
|--------|-------------------|--------------------------------------------|
| POST   | `/auth/register`  | Register a new user                        |
| POST   | `/auth/login`     | Log in with email and password             |
| GET    | `/auth/logout`    | Log out the current session                |
| GET    | `/auth/user`      | Retrieve the currently authenticated user  |
| GET    | `/auth/verify`    | Verify user's email or token (if applicable) |



## Advanced features in the pipeline

- Realtime updates (via WebSockets or polling)
- Tag-based categorization and filtering
- Threaded comment discussions
- AI-assisted idea generation and summarization
- OAuth integration (Google, GitHub login)
- Personal dashboards for idea tracking and insights

