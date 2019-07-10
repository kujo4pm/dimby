import axios from 'axios';

const fetchInWindowUrl = (bottomLeft, topRight, key) => `https://api.planningalerts.org.au/applications.js?bottom_left_lat=${bottomLeft.lat}&bottom_left_lng=${bottomLeft.long}&key=${key}&top_right_lat=${topRight.lat}&top_right_lng=${topRight.long}`;

const getAlerts = (bottomLeft, topRight) => {
    return axios.get({
        
    })
};