# Setup

### Install Node.js and npm
To start contributing, you will need **Node.js** and **npm** installed on your machine, which can be installed on any Operating System.
#### [Click here to install Node.js and npm](https://nodejs.org/en/download/package-manager)

Next, in your other terminal/console, type:
`npm install -g npm`

More info about installing Node.js and npm can be found [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).


### Setup local environment
Next, **clone** the repo to your local machine by entering this command in your terminal/console at your desired location:
`git clone https://github.com/UofT-UTSC-CS-sandbox/final-term-project-campusconnect.git`

Open the terminal/console in the repo's directory on your machine. Create a branch using `git checkout -b branch-name`. *Make sure you follow the branch naming scheme described in the README*.

Next, open two instances of the terminal/console. On **only** one of them, `cd` into the `server` directory, open `index.js` and replace the connection string URL inside the `mongoose.connect()` function with:
`mongodb://localhost:27017/ulearn`

Next, back on the same terminal/console, run the following:
`npm install`
`npm start`

The server should now be running on port 3001. Next, switch to your other terminal/console and run the following:
`npm install`
`npm run dev`

Congratulations! The program should be up and running. Open the link provided in the terminal/console in your favourite web browser. Changes should update live.
