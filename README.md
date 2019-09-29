# ClickTime The Pirate Shop Web Application

This is my solution for Question 2 of the ClickTime coding challenge. Note that I did both of the strech goals listed.

This project has three parts:
 - Infrastructure: Dockerfiles located in `infrastructure` directory
 - backend: Express.js application located in `backend` directory
 - frontend: React.js application located in `frontend` directory

The backend application runs on `localhost:3000`.

The frontend application runs on `localhost:3006`.

To run the application, issue the command `make`.

To see in browser, go to `localhost:3006`.

Frontend:
 - React single page application
 - Calls out to express application for sample data
 - Allows users to add products to cart, shows total.

Backend:
 - Express application with two endpoints
 - `localhost:3000/movies` gets you the movie data
 - `localhost:3000/movies/images` gets you the base64 images that go along with movies data
 - Unit tests written in Jest, see below for how to test

Testing:
 - Backend has unit tests in Jest.
 - To run, navigate to backend directory
 - Issue the command `npm install` followed by `npm test`
