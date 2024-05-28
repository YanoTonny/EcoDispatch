# EcoDispatch

EcoDispatch is a web application designed to promote sustainable practices among restaurants and other organizations. Users can register their businesses, access early bird information, and contact the EcoDispatch team for support. This project demonstrates the integration of a frontend built with HTML, CSS, and JavaScript, and a backend powered by Node.js and MySQL.

# Table of Contents

Features
Installation
Usage
Endpoints
Environment Variables
Dependencies

# Features

User authentication (registration and login)
Restaurant registration
Contact form for user inquiries
Early access form for users interested in updates

# Installation

Prerequisites
Node.js and npm installed
MySQL server installed
MySQL Workbench or any other MySQL client

# Usage

User Authentication
On the landing page, users can either log in or register.
After logging in, users will be able to access other parts of the website.

Register Your Restaurant
Users can register their restaurant by filling out a form with the restaurant’s details.

Contact Form
Users can send inquiries to the EcoDispatch team through the contact form.

Early Access Form
Users interested in receiving updates can fill out the early access form.

Endpoints
User Registration
URL: /register
Method: POST
Description: Registers a new user.
Body Parameters:
username (string)
email (string)
password (string)
User Login
URL: /login
Method: POST
Description: Authenticates a user.
Body Parameters:
username (string)
password (string)
Restaurant Registration
URL: /registerRestaurant
Method: POST
Description: Registers a new restaurant.
Body Parameters:
restaurantName (string)
ownerName (string)
email (string)
phone (string)
address (string)
description (string)

# Environment Variables

DB_HOST: MySQL database host
DB_USER: MySQL database username
DB_PASSWORD: MySQL database password
DB_NAME: MySQL database
JWT_SECRET: A secret key for signing JWT tokens
PORT: Port on which the server will run (default is 3000)

# Dependencies

express: Fast, minimalist web framework for Node.js
mysql: A node.js driver for MySQL
bcryptjs: Library to help you hash passwords
jsonwebtoken: An implementation of JSON Web Tokens
body-parser: Node.js body parsing middleware
cors: Node.js CORS middleware
dotenv: Loads environment variables from a .env file into process.env
