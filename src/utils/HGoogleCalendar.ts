import React, { ReactNode, SyntheticEvent } from 'react';
import ApiCalendar from 'react-google-calendar-api';

const config = {
    "clientId": "350340458199-m1lm1915cd7kmqg2onsbptm6sc69mho1.apps.googleusercontent.com",
    "apiKey": "AIzaSyDcfI6tMTEMLXfS63u8N6aWhgvSeVlISXc",
    "scope": "https://www.googleapis.com/auth/calendar",
    "discoveryDocs": [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
}

const HGoogleCalendar = new ApiCalendar(config)
export default HGoogleCalendar