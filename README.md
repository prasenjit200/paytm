
# Paytm-like Application

## Overview
This project is a dynamic Paytm-like application where users can sign up, receive money, and interact with other users by viewing their profiles and spending their money.

### Features:
- **User Authentication:** 
  - Sign up and sign in functionalities using JWT (JSON Web Tokens).
  - New users receive an initial amount of money after sign up.
  
- **User Interactions:**
  - Users can see other users and manage transactions.
  - Basic money spending and viewing functionalities.

- **Frontend:**
  - **React.js** for building interactive and responsive user interfaces.
  - **Tailwind CSS** for styling, making the site look dynamic and visually appealing.

- **Backend:**
  - **Express.js**: Backend framework to handle routes and APIs.
  - **MongoDB**: Database used for storing user information and transaction details.
  - **Zod**: Schema validation for user input.
  - **JWT**: Secure token-based authentication for users.

## Tech Stack

### Frontend:
- **React.js**: Handles the user interface and interactions.
- **Tailwind CSS**: Provides a utility-first CSS framework to design the frontend.

### Backend:
- **Express.js**: Provides the server and API endpoints.
- **MongoDB**: NoSQL database for storing user data.
- **Zod**: For validation of user input.
- **JWT (JSON Web Token)**: Secure authentication mechanism.

### Key Functionalities:
1. **Sign Up / Sign In:**
   - Users can create accounts and log in securely using JWT.
   - New users are credited with an initial balance.
   
2. **View Other Users:**
   - Users can browse and interact with other user profiles.

3. **Money Transactions:**
   - After signing up, users can spend the balance received during the registration process.

