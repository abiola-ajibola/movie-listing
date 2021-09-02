# Movie Listing

This is a simple wep app for listing the top 500 movies on https://themoviedb.org

## How to Use

### Clone the repo

Using SSH
```bash
git clone git@github.com:abiola-ajibola/movie-listing.git
```
or

Using https
```bash
git clone https://github.com/abiola-ajibola/movie-listing.git
```

### Install all dependencies

```bash
npm install
```

### Run the app in development environment

```bash
npm run dev
```

### Build the app for production

```bash
npm run build
```
### Run Tests

```bash
npm run test
```

## Deploying

The application can be deployed using any service you prefer. Here I have used Netlify with Github integration.

### Using Netlify
1. Signup on Netlify, if you do not already have an account: https://app.netlify.com/signup
2. Install Netlify cli
```bash
npm install netlify-cli -g
```
3. Fork the repository
4. Login to netlify from the cli:
```bash
netlify login
```
Then follow the netlify login flow.
5. Initialize a new netlify site:
```bash
netlify init
```
Choose your preferred deployment options for the app in the netlify cli
6. Push to the `dev` branch to deploy a development/preview app.
7. Push to `main` branch or merge a pull request into the branch to deploy a production version.

### Environment variables
In the development environment create a `.env` file in the project root directory and add `API_KEY` as environment variable, the value should be your TMDB API KEY.
Go to the Netlify web app to set the `API_KEY` environment varaible for production.