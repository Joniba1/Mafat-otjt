# TodoList Backend API

This repository contains the backend API designed to handle requests from the TodoList React application.

## Description

 The backend API provides endpoints for authentication using JWT (login and registration) and handles the manipulation of tasks within the application. The API includes the following functionalities:

- **Authentication:** Users can register new accounts and login using JWTs.
- **Task Management:** Users can retrieve tasks categorized as completed, irrelevant, and todo. Additionally, they can modify said tasks by editing their description, titles and deadlines as well as marking them as completed, or setting their relevance.
- **Task Addition:** The API also handles tasks addition.
- **Search Functionality:** Users can search for specific tasks based on keywords.

## Getting Started

To initiate the API for the first time, follow the next steps:

1. If you haven't already [download Docker Desktop](https://www.docker.com/products/docker-desktop).
2. Clone this repository to your local machine.
3. Navigate to the cloned repository directory in your CMD or terminal.
4. Execute the following command:

```bash
docker-compose up --build
```

For subsequent executions, utilize this command:

```bash
docker-compose up
```

## Usage

To interact with the API effectively, ensure the [frontend application](https://github.com/Joniba1/React-todo-frontend) is also activated.
