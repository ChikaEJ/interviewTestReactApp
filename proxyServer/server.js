import cors from 'cors';
import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import {Base64} from "js-base64";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res) {

    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code
    await fetch('https://github.com/login/oauth/access_token' + params, {
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

app.get("/getUserData", async function (req, res) {
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

app.get('/getUser', async (req, res) => {
    try {
        const authorization = Base64.decode(req.get("Authorization"));
        const url = `https://api.github.com/users${req.query.username ? "/" + req.query.username : ''}`;
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
app.get("/userUpdate", async (req, res) => {
    try {
        const {company, name, location} = req.query;
        const authorization = Base64.decode(req.get("Authorization"));
        const url = "https://api.github.com/user";
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                Authorization: authorization,
                "Content-Type": "application/json",
                "X-GitHub-Api-Version": "2022-11-28",
            },
            body: JSON.stringify({
                company,
                name,
                location,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error updating user: ${response.statusText}`);
        }

        const data = await response.json();
        res.json({message: "User updated successfully", data});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error updating user"});
    }
});

app.listen(PORT, function () {
    console.log(`Server is started on port ${PORT}!`);
})