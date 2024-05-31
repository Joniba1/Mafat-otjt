# TodoList Frontend Application

This repository contains the frontend-side for the TodoList React application. It communicates with the TodoList Backend API and provides a user interface for managing tasks.

## Description

This application provides a user friendly interface for interacting with the backend API endpoints.

Additionally, the home page includes a percentile tasks graph feature. This graph visualizes tasks due time.

## Pre-requirements

1. [Docker Desktop](https://www.docker.com/products/docker-desktop).
2. Clone this repository to your local machine.
3. build the docker image:

```bash
docker build -t frontend-image .
```
## App intialization

```bash
docker run -p 5173:5173 frontend-image
```

## Usage

Once the frontend application is running, you can access it in your web browser by navigating [here](http://localhost:5173).

## Additional notes

To interact with the API effectively, ensure the [backend application](https://github.com/Joniba1/React-todo-backend) is also activated.
