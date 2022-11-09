const express = require('express')

const {
    httpGetAllLaunches,
    httpAddNewLaunches,
    httpAborthLaunch
} = require('./launches.controller')

const launchesRouter = express.Router();

launchesRouter.get('/launches', httpGetAllLaunches);
launchesRouter.post('/launches', httpAddNewLaunches);
launchesRouter.delete('/launches/:id',httpAborthLaunch);
module.exports = launchesRouter
