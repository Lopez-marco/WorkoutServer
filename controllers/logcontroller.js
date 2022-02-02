const Express = require("express")
const router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")
const { logModel, LogModel } = require("../models")

/* 
** Create a log
*/
router.post("/create", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log
    const {id } = req.user
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newLog = await WorkoutLogModel.create(logEntry)
        res.status(200).json(newLog)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
** Get user's logs
*/
router.get("/", validateJWT, async (req, res) => {
    const { id } = req.user
    try {
        const myLogs = await WorkoutLogModel.findAll({
            where: {
                owner_id: id
            }
        })
        res.status(200).json(myLogs)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
** Get user's logs by id
*/
router.get("/:id", validateJWT, async (req, res) => {
    const logId = req.params.id
    const userId = req.user.id

    const query = {
        where: {
            id: logId,
            owner_id: userId
        }
    }

    try {
        let userLogs = await LogModel.findOne(query)
        if (userLogs) {
            res.status(200).json(userLogs)
        } else {
            res.status(404).json({
                message: 'Log Id not found'
            })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
** Update a log
*/
router.put("/:id", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log
    const logId = req.params.id
    const userId = req.user.id

    const query = {
        where: {
            id: logId,
            owner_id: userId
        }
    }

    const updatedLog = {
        description: description,
        definition,
        result
    }

    try {
        let update = await LogModel.update(updatedLog, query)
        console.log(update)
        if (update[0]) {
            res.status(200).json({
                message: `Log for Id ${logId} has been updated`,
                updatedLog
            })
        } else {
            res.status(404).json({
                message: 'Log Id not updated'
            })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
** Delete a log
*/
router.delete("/:id", validateJWT, async (req, res) => {
    const logId = req.params.id
    const userId = req.user.id

    const query = {
        where: {
            id: logId,
            owner_id: userId
        }
    }

    try {
        let logRemoved = await LogModel.destroy(query)
        if (logRemoved) {
            res.status(200).json({
                message: `Log for Id ${logId} has been removed`
            })
        } else {
            res.status(404).json({
                message: 'Log Id not removed'
            })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get('/practice', validateJWT, (req, res) => {
    res.send('Practice route!')
})

/*
** About
*/
router.get('/about', (req, res) => {
    res.send('The About route!')
})

/*
** Practice Route
*/
router.get('/practice', validateJWT, (req, res) => {
    res.send('Practice route!')
})

module.exports = router