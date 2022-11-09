const { getAllLaunches, addNewLaunches, existsLaunchWithId, abortedLaunchById } = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}
function httpAborthLaunch(req, res) {
    const launchId = Number(req.params.id)
    if (!existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: "Launch not found"
        })
    }
    const aborted = abortedLaunchById(launchId)
    return res.status(200).json(aborted)

}
function httpAddNewLaunches(req, res) {
    const launch = req.body
    if (!launch.mission || !launch.rocket || !launch.launchDate) {
        return res.status(400).json({
            error: 'Missing required launch property',
        })
    }
    launch.launchDate = new Date(launch.launchDate)

    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid launch date"
        })
    }

    addNewLaunches(launch);
    return res.status(201).json(launch);
}
module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunches,
    httpAborthLaunch
} 
