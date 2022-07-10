# Waves

Spotify like Webapp with Simple CRUD operations

Hosted In: https://wavesmusic.herokuapp.com/

## Tech Stack

- Node JS (Using ES6 with esm)
- Express JS
- MongoDB
- API Testing - Postman (can test with mocha or chai)
- React Js (Client Side)
- Material UI (UI framework)

## What can it Do?

Backend:

- User Authentication with JWT
- Add Artists
- Add Songs
- Cover photo of the Song (with multer)
- Basic CRUD operations

## Postman Collections

https://documenter.getpostman.com/view/8802598/UzJJtcDk

#### Note

- Could have Used SQL Database, but no good/cheap sql database hosting server online.
- Not using GraphQL for hosting resons, and REST APIs have better usecase here.

## To Run It Locally

Pre-Requisits:

- MongoDB Server
- Node, Npm

```bash

## For Client
cd client

npm install

npm run build

## Back to Main folder

cd ../

# Install all Dependencies
npm install

# Create .env file
touch .env

# To Run it in Development Itself
npm run dev

# To Run in Production
npm start

```

- Contents in .env file

```txt
MONGO_URI =
SECRET =
BCRYPT_SALTROUNDS =
ITEMS_PER_PAGE =
NODE_ENV = production
```

Runs on Localhost port: 8000

## Screen Shots

Login Page

![Screenshot 2022-07-10 at 8 57 24 PM](https://user-images.githubusercontent.com/55324916/178152551-61a0ba38-922b-449e-a71c-8a0ed97dc12f.png)

Registration Page
![Screenshot 2022-07-10 at 9 01 50 PM](https://user-images.githubusercontent.com/55324916/178152555-5cb6c1cb-6dc6-4353-8aa2-538b0bcb786e.png)

Home Page
![Screenshot 2022-07-10 at 9 02 23 PM](https://user-images.githubusercontent.com/55324916/178152561-79c17ac6-ac74-4796-a70b-f17cd375cef7.png)
![Screenshot 2022-07-10 at 9 02 32 PM](https://user-images.githubusercontent.com/55324916/178152562-90b8e584-0725-4d3a-b3a8-7106a1194f31.png)
![Screenshot 2022-07-10 at 9 02 49 PM](https://user-images.githubusercontent.com/55324916/178152566-b3d1160e-d0cf-47c0-b207-237e33c9be74.png)
![Screenshot 2022-07-10 at 9 02 59 PM](https://user-images.githubusercontent.com/55324916/178152570-4f18bcda-69aa-4fcf-99e7-5867ad04103f.png)

Ratings
![Screenshot 2022-07-10 at 9 21 48 PM](https://user-images.githubusercontent.com/55324916/178152601-ae0453b1-4752-4697-b8bc-69c9da244361.png)

Create Song
![Screenshot 2022-07-10 at 9 04 31 PM](https://user-images.githubusercontent.com/55324916/178152574-195290f8-82b4-4a0d-a697-043e9685de5b.png)

Create Artist
![Screenshot 2022-07-10 at 9 06 13 PM](https://user-images.githubusercontent.com/55324916/178152580-06327514-b7fe-4b9c-a0aa-6d21bf8f150e.png)

Search Page
![Screenshot 2022-07-10 at 9 09 15 PM](https://user-images.githubusercontent.com/55324916/178152586-69fc004c-35e2-4fe4-b1f6-1d2ca788f58b.png)

Artist Page
![Screenshot 2022-07-10 at 9 18 48 PM](https://user-images.githubusercontent.com/55324916/178152756-6b66d0be-0303-4de3-95f5-1fa8d5fb55fb.png)

Songs Page
![Screenshot 2022-07-10 at 9 18 24 PM](https://user-images.githubusercontent.com/55324916/178152587-1ed96b4f-18a9-4722-852d-a23f38bbf09b.png)

Profile Page
![Screenshot 2022-07-10 at 9 21 22 PM](https://user-images.githubusercontent.com/55324916/178152596-1d07aded-8fcf-472f-a7c7-a3a9778c4c25.png)

Mobile View
![Screenshot 2022-07-10 at 9 46 42 PM](https://user-images.githubusercontent.com/55324916/178152974-dab22b69-12d2-4bc3-9cb9-4ba32b22e037.png)
