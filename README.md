# Voting System Project

## Overview

The Voting System Project is a software application designed to facilitate the process of casting, counting, and managing votes in various types of elections. This system aims to provide a secure, reliable, and user-friendly platform for both voters and administrators.

## Features

- **User Authentication**: Secure login for voters and administrators.
- **Voting Process**: Easy-to-follow voting process with clear instructions.
- **Real-Time Results**: Instant results display after the voting period ends.
- **Admin Panel**: Tools for administrators to manage elections, candidates, and voter information.
- **Security**: Ensures data integrity and prevents fraudulent activities.

## Technologies Used

- **Frontend**: React, Material UI
- **Backend**: Node.js, Express
- **Database**: Mongo DB

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Steps

1. **Clone the repository**:
    ```sh
    git clone https://github.com/shaunak-10/VoteSafe.git
    cd VoteSafe
    ```
2. **Install dependencies**:
    ```sh
    npm install
    ```
3. **Setup and connect mongoDB atlas database**:
    ```sh
    npm run migrate
    ```
5. **Start frontend server**:
    ```sh
    npm run dev
    ```
6. **Start Backend server**:
    ```sh
    node app.js
    ```
7. **Start blockchain server**:
    ```sh
    npm hardhat init
    ```
8. **Access the application**:
    Open your browser and go to `http://localhost:5173`

## Usage

### For Voters

1. **Register/Login**: Create an account or log in using your credentials.
2. **View Elections**: Browse available elections you are eligible to vote in.
3. **Cast Vote**: Follow the instructions to cast your vote.
4. **View Results**: After the election ends, view the results in real-time.



---
