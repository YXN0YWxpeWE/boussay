const express = require("express");
const app = express.Router();

const { verifyToken, verifyClient } = require("../tokenManager/tokenVerify.js");

app.get("/fortnite/api/stats/accountId/:accountId/bulk/window/alltime", verifyToken, (req, res) => {
    res.json({
        "startTime": 0,
        "endTime": 0,
        "stats": {},
        "accountId": req.user.accountId
    })
})

app.post("/fortnite/api/feedback/*", verifyToken, (req, res) => {
    res.status(200);
    res.end();
})

app.post("/fortnite/api/statsv2/query", verifyToken, (req, res) => {
    res.json([]);
})

app.post("/statsproxy/api/statsv2/query", verifyToken, (req, res) => {
    res.json([]);
})

app.get("/api/v1/events/Fortnite/download/*", verifyToken, (req, res) => {
    res.json({})
})

module.exports = app;