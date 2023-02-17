const express = require( 'express' );
const GoogleAuth = require('../lib/google_auth');
const { google } = require("googleapis");
require('dotenv').config()

const router = express.Router();
// const webCredentials = process.env.GOOGLE_AUTH_CREDENTIALS || JSON.parse(fs.readFileSync('./credentials/web_credentials.json').toString()).web;
// const oauth2Client = new google.auth.OAuth2(
//   webCredentials.client_id,
//   webCredentials.client_secret,
//   "http://carenest.eba-bj7vrfta.ap-south-1.elasticbeanstalk.com"
// );
// oauth2Client.setCredentials(JSON.parse(process.env.GOOGLE_AUTH_TOKEN))

// Calendar API
router.get('/events', async(req, res) => {
    try{
      const auth = await GoogleAuth()
      const calendar = google.calendar({version: 'v3', auth});
      const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });
      let events = response.data.items;
      if (!events || events.length === 0) {
        res.status(204).json({msg: 'No events found', data: []});
        return
      }
      res.status(200).json({msg: 'Successfully fetched events', events })
      events = events.map((event, i) => {
        const {id, status, htmlLink, created, summary, hangoutLink, conferenceData} = event;
        return {
          id, status, htmlLink, created, summary, meetingLink: (hangoutLink || conferenceData?.entryPoints[0] || null) 
        }
      });
      // res.status(200).json({msg: 'Successfully fetched events', events })
    }catch(err){
      console.log(err)
      res.status(500).json({msg: 'Failed to process request, server error.', err: err.message})
    }finally{
      res.end()
    }
})
  
router.post('/events', async(req, res) => {
    try{
      const {name, email, summary: eventSummary, description, startTime, attachments} = req.body
      const resource = {
        'summary': eventSummary || 'Consultation with carenest',
        'location': 'Google Meet',
        'description': description || 'Consultation',
        'start': {
          'dateTime': new Date(startTime).toISOString(),
          "timeZone": "Asia/Kolkata"
        },
        'end': {
          'dateTime': new Date(startTime + 1000 * 60 * 30).toISOString(),
          "timeZone": "Asia/Kolkata"
        },
        'attendees': [
          ...process.env['GUESTS']?.split(',')?.map(g => ({email: g.split('-')[0].trim(), displayName: g.split('-')[1].trim()})),
          {'email': process.env['OWNER_EMAIL'], displayName: process.env['OWNER_NAME']},
          {'email': email || "dummy@CareNest.in", displayName: name || null},
        ],
        // 'reminders': {
        //   'useDefault': false
        // },
        sendUpdates: 'all',
        supportsAttachments: true,
        attachments: attachments || [],
        conferenceData: {
          createRequest: {
              requestId: "sample123",
              conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      }  
  
      const auth = await GoogleAuth()
      const calendar = google.calendar({version: 'v3', auth});
      const response = await calendar.events.insert({
        resource, 
        calendarId: 'primary', 
        conferenceDataVersion: 1, 
        sendUpdates: 'all',
        supportsAttachments: true
      })
      const {id, status, htmlLink, created, summary, start, end, hangoutLink, conferenceData} = response?.data;
      res.status(200).json({
          id, status, htmlLink, created, summary,
          startTime: start?.dateTime,
          endTime: end?.dateTime,
          meetingLink: (hangoutLink || conferenceData.entryPoints[0]) 
      })
    }catch(err){
      console.log(err)
      res.status(500).json({msg: 'Failed to process request, server error.'})
    }finally{
      res.end()
    }
})

module.exports = router;