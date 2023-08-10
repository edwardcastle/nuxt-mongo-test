# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## SET UP HOSTED DATABASE (OPTION 1)
Open the link and create a db
https://www.mongodb.com/basics/create-database


Create a .env file inside the root project and add this enviromment variable
example

MONGO_URI="mongodb://localhost:21017"
or in case of hosted db
MONGO_URI="mongodb+srv://user:password@cluster0.wnzfueo.mongodb.net/"

## SET UP DATABASE LOCALLY (OPTION 2)
Download and install mongo server
https://www.mongodb.com/try/download/


Download and install mongo shell
https://www.mongodb.com/try/download/shell

Create a database
`open terminal`
```bash
sudo systemctl start mongod

mongosh

use "<NAME OF A DATABASE>"

```
`exit terminal`

