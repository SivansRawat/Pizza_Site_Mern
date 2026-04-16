# Pizza Site MERN

A MERN pizza ordering app with a React client, Express API, MongoDB models, admin pizza/order management, and Stripe checkout.

## Local Setup

1. Install root dependencies:

   ```bash
   npm install
   ```

2. Install client dependencies:

   ```bash
   npm run client-install
   ```

3. Create environment files:

   ```bash
   copy .env.example .env
   copy client\.env.example client\.env
   ```

4. Update `.env` with your MongoDB URI, JWT secret, and Stripe secret key.

5. Update `client/.env` with your Stripe publishable key.

6. Run the full app:

   ```bash
   npm run dev
   ```

The API runs on `http://localhost:8000`, and the React app runs on `http://localhost:3000`.

## Scripts

- `npm run server`: run the Express API with nodemon
- `npm run client`: run the React app
- `npm run dev`: run API and client together
- `npm run build`: install client dependencies and build the React app

## Notes

- Do not commit `.env` files or `node_modules`.
- Existing plain-text user passwords are upgraded to hashed passwords the next time those users log in successfully.
- Rotate any Stripe keys that were previously committed to GitHub.
