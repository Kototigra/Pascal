const { Router } = require('express')
const {getReservation} = require("../controllers/user.controller");


const userRouter = Router()


userRouter.get("/:id/reservations", getReservation)


module.exports = {userRouter}