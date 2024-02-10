# Youtube Posts

This is a script to fetch a users youtube posts using their Channel ID and their API Key.

## How to Use

- Rename `.env.example` to `.env`
- Obtain your Channel ID by:
  - Go to your Youtube Channel
  - Under your profile, click Advanced Settings
  - Copy your Channel ID and set it in the `.env` file
- Obtain your Google Developer API KEY by:
  - visit Google Developer Console at https://console.cloud.google.com/
  - Create a project
  - Search for Youtube Data API and enable it
  - Click on the left pane and select `Credentials`
  - Click `Create Credentials` and select `API KEY`
  - Copy the generated key and replace in the `.env` file

- Install the project and run with:
    - `npm install` to install the dependencies
    - `npm test` to test
    - Supply the search term to search

