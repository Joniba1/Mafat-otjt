# TodoList Backend API

This repository contains the backend API designed to handle requests from the TodoList React application.

## Description

 The backend API provides endpoints for authentication using JWT (login and registration) and handles the manipulation of tasks within the application. The API includes the following functionalities:

- **Authentication:** Users can register new accounts and login using JWTs.
- **Tasks Management:** Users can retrieve tasks categorized as completed, irrelevant, and todo. Additionally, they can modify said tasks by editing their description, titles and deadlines as well as marking them as completed, or setting their relevance.
- **Task Addition:** The API also handles tasks addition.
- **Search Functionality:** Users can search for specific tasks based on keywords.

## Pre-requirements

1. [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Clone this repository to your local machine.
3. Build the docker image:

```bash
docker-compose build
```

## App initialization

```bash
docker-compose up
```

## Additional notes

To interact with the API effectively, ensure the [frontend application](https://github.com/Joniba1/React-todo-frontend) is also activated.
