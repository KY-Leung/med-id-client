import React, { Component } from 'react';
import queryString from 'query-string';

class Api {
    
    static getAccessToken() {
        let parsed = queryString.parse(window.location.search);
        return parsed.access_token;
    }

    static getUserInfo = () => {
        let accessToken = Api.getAccessToken();
        console.log(accessToken);
        fetch('https://api.fitbit.com/1/user/-/profile.json', {
            headers: {'Authorization': 'Bearer ' + accessToken}
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
    }

    static getTokenState = () => {
        let accessToken = Api.getAccessToken();
        fetch('https://api.fitbit.com/oauth2/introspect?token=' + accessToken, {
            headers: {'Authorization': 'Bearer ' + accessToken, 'Content-Type': 'application/x-www-form-urlencoded'},
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }

    static getDailyActivity = async () => {
        let accessToken = Api.getAccessToken();
        let userInfo = Api.getUserInfo();
        fetch('https://api.fitbit.com/1/user/' + userInfo.user.encodedId + '/activities/date/2018-05-04.json', {
            headers: {'Authorization': 'Bearer ' + accessToken, 'Content-Type': 'application/x-www-form-urlencoded'},
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }

    static getHeartRateTimeSeries = async () => {
        let accessToken = Api.getAccessToken();
        let userInfo = Api.getUserInfo();
        fetch('https://api.fitbit.com/1/user/' + userInfo.user.encodedId + '/activities/heart/date/2018-05-04/1d.json', {
            headers: {'Authorization': 'Bearer ' + accessToken, 'Content-Type': 'application/x-www-form-urlencoded'},
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }
}

export default Api;