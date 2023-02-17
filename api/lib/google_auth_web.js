const { google } = require("googleapis");
const fs = require('fs');
require('dotenv').config()

const scopes = [
    'https://www.googleapis.com/auth/calendar'
];

const main = async() => {
    // const authorizationUrl = oauth2Client.generateAuthUrl({
    //     access_type: 'offline',
    //     scope: scopes,
    //     include_granted_scopes: true
    // });
    // console.log(authorizationUrl)
    // const code = process.env.GOOGLE_AUTH_CODE || '4/0ARtbsJrkaoRCYlZ5yftdQS06RqRfghKeaiP7TtzTKIoNmm_rkw08wmIzo8N9IdTCEBaNqQ'
    // let { tokens } = await oauth2Client.getToken(code);
    // console.log(tokens)
    const webCredentials = process.env.GOOGLE_AUTH_CREDENTIALS || JSON.parse(fs.readFileSync('./credentials/web_credentials.json').toString()).web;
    const oauth2Client = new google.auth.OAuth2(
        webCredentials.client_id,
        webCredentials.client_secret,
        "http://carenest.eba-bj7vrfta.ap-south-1.elasticbeanstalk.com"
    );
    
    oauth2Client.setCredentials(JSON.parse(process.env.GOOGLE_AUTH_TOKEN))

    const calendar = google.calendar('v3');
    console.log('FGHjklknbvccvbn')
    calendar.events.list({
        auth: oauth2Client,
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }).then(res => {
        let events = res.data.items
        events = events.map((event, i) => {
            const {id, status, htmlLink, created, summary, hangoutLink, conferenceData} = event;
            return {
              id, status, htmlLink, created, summary, meetingLink: (hangoutLink || conferenceData?.entryPoints[0]) 
            }
        });
        console.log(events);
    })
}
main()