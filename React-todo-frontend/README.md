# TodoList Frontend Application

This repository contains the frontend-side for the TodoList React application. It communicates with the TodoList Backend API and provides a user interface for managing tasks.

## Description

This application provides a user friendly interface for managing tasks, including functionalities such as creating, editing, deleting, and retrieving tasks from the backend API.

Additionally, the home page includes a percentile tasks graph feature. This graph visualizes tasks due time.

## Getting Started

To initiate the frontend for the first time, follow the next steps:

1. If you haven't already [download Docker Desktop](https://www.docker.com/products/docker-desktop).
2. Clone this repository to your local machine.
3. Navigate to the cloned repository directory in your CMD or terminal.
4. Execute the following commands:

```bash
docker build -t frontend-image .
```
```bash
docker run -p 5173:5173 frontend-image
```

For subsequent executions, utilizing this command is enough:

```bash
docker run -p 5173:5173 frontend-image
```

## Usage

Once the frontend application is running, you can access it in your web browser by navigating [here](http://localhost:5173).