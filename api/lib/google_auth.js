const fs = require("fs");
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const { auth } = require("googleapis/build/src/apis/youtubereporting");
require('dotenv').config()

const temp = '../'
const TOKEN_PATH = path.join(__dirname , temp+"credentials/token.json")
const CREDENTIALS_PATH = path.join(__dirname , temp+"credentials/desktop_credentials.json")
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

console.log(fs.readFileSync(TOKEN_PATH).toString() || process.env.GOOGLE_AUTH_TOKEN)

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function loadSavedCredentialsIfExist() {
  try {
    const content = fs.readFileSync(TOKEN_PATH).toString() || process.env.GOOGLE_AUTH_TOKEN;
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    console.log('--------- Error occured while loading saved token ---------')
    console.log(err)
    return null;
  }
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

module.exports = authorize;