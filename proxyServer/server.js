import cors from 'cors';
import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import {Base64} from "js-base64";



const CLIENT_ID = "3667ac15a3e0b621d8d0";
const CLIENT_SECRET = "5bcaed3ae249e0968aaadcdb9411373975f9ee23";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function(req, res){

    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code
    await  fetch('https://github.com/login/oauth/access_token' + params, {
        method: "POST",
        headers: {
            accept: "application/json"
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        res.json(data);
    }).catch(error => {
        console.error(error.message)
    })
})

app.get("/getUserData", async function(req, res){
    req.get("Authorization");
    const authorization = Base64.decode(req.get("Authorization"));
    const data = await (await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            authorization: authorization
        }
    })).json();
    res.json(data);
})

app.get('/getRepos', async (req, res) => {
    try {
        const authorization = Base64.decode(req.get("Authorization"));
        const url = `https://api.github.com/user/repos`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: authorization
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
    }
});
app.get('/getUserRepos', async (req, res) => {
    try {
        const username = req.query.username;
        const url = `https://api.github.com/users/${username}/repos`;
        const response = await fetch(url, {
            method: 'GET'
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
    }
});

app.get('/getUsers', async (req, res) => {
    try {
        const authorization = Base64.decode(req.get("Authorization"));
        const url = `https://api.github.com/users`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: authorization
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
    }
});
app.get('/getUser', async (req, res) => {
    try {
        const authorization = Base64.decode(req.get("Authorization"));
        const url = `https://api.github.com/users${req.query.username ? "/"+req.query.username : ''}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: authorization
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
    }
});

app.listen(4000, function () {
    console.log("Server is started on port 4000!");
})