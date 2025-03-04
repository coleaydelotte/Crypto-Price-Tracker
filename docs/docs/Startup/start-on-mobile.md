---
title: "Starting on Mobile"
---

# Running the Next.js App On Mobile
First you are going to need to change your present working directory to `web-app` so execute the following command:
```bash
cd web-app
```
### Install Dependencies
Before running the app, install the required dependencies:

```bash
npm install
# or
yarn install
```

### Start the Development Server
```bash
npm run dev
# or
yarn dev
```
Once ran the app will be available [here](http://localhost:3000).

### Build and Start for Production
To create an optimized build:
```bash
npm run build
# or
yarn run build
```
Then Running the production server:
```bash
npm start
# or
yarn start
```
### Getting your local Ipv4 address
Next depending on your operating system will determine your next command
```bash
# For windows:
ipconfig
# For Mac/Unix-Based Systems
ipconfig getifaddr en0
```
### Opening the app
On your mobile device now you can go to the following address; (When replacing `<your-local-ipv4-address>` replace the entire thing)
```url
http://<your-local-ipv4-address>:3000
```