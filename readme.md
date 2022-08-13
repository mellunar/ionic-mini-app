This repository was created to be a learning process of [Elf](https://ngneat.github.io/elf/) and Vercel Serverless Functions.

It's possible to preview it on browser: https://ionic-mini-app.vercel.app

To be able to run it you need to fork this repository, and create a secret key to be able to have access to IGDB API. Read their documentation to learn how to do it: https://api-docs.igdb.com

Steps to follow after:

- Create a Vercel project, then add the keys you just created to the project build settings.
- Create a local `.env` file, and also add these keys to it.

- Install Vercel cli
  `npm i -g vercel`

- Install Ionic CLI
  `npm install -g @ionic/cli`

- Install node modules
  `npm i`

- Now you're ready to run locally
  `vercel dev`

By default, Vercel runs on port 3000
