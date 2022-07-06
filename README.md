# Waves

Spotify like Webapp with Simple CRUD operations

## Tech Stack

- Node JS (Using ES6 with esm)
- Express JS
- MongoDB
- API Testing - Postman (can test with mocha or chai later on...)

## What can it Do?

- User Authentication with JWT
- Add Artists
- Add Songs
- Cover photo of the Song (with multer)

## ER Diagram

## Postman Collections

https://documenter.getpostman.com/view/8802598/UzJJtcDk

#### Notes

Could have Used SQL Database, but no good/cheap sql database hosting server online.

## To Run It Locally

```bash

# Install all Dependencies
$ npm install

# Create .env file
touch .env

# To Run it in Development Itself
$ npm run dev

# To Run in Production
$ npm start

```

- Contents in .env file

```txt
MONGO_URI =
SECRET =
BCRYPT_SALTROUNDS =
ITEMS_PER_PAGE =
NODE_ENV =
```

Runs on Localhost port: 8000
