# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# News Aggregator - Running with docker

## How to Run the Application with Docker Compose and clone the source code with github

### 1. Clone the repository

`https://github.com/brijeshborkar/news-aggregator.git`

### 2. Navigate to the project directory

`cd news-aggregator`

### 3.Pull the latest image from Docker Hub

`docker pull brijeshdoc/news-aggregator:latest`

### 4.(Optional) Check whether the image has been pulled from docker hub

`docker images`

### 5.Start the application using Docker Compose

`docker compose up -d`

### 6.(optional) If you dont have docker compose then u can run the manual image build

`docker run -d -p 8080:80 brijeshdoc/news-aggregator:latest`

### Open your browser and visit

`http://localhost:8080`
