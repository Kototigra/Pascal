const { Router } = require('express')

const { getAllRestaurantSearch,getVisibleRestaurants,getAllRestaurantsAdresses, addRating, getCurrentRestaurant, addReservation, minusReservation, getAllRestaurantsApp,
    addReservationToDB,
    delReservationToDB,
    editRestProfile
} = require('../controllers/restaurant.controller')

const restRouter = Router()

restRouter.get('/', getAllRestaurantSearch)
restRouter.get('/allrests', getAllRestaurantsApp)
restRouter.get('/map', getAllRestaurantsAdresses)
restRouter.post('/all', getVisibleRestaurants)
restRouter.put('/edit', editRestProfile ) //katya
restRouter.get("/:id", getCurrentRestaurant)
restRouter.post("/:id/rating", addRating)
restRouter.put("/:id/reservation", addReservation)
restRouter.put("/:id/newReservation", addReservationToDB)
restRouter.delete("/:id/delReservation", delReservationToDB)
restRouter.put("/:id/minus", minusReservation) // типо анти резервация, точнее минус 1

module.exports = restRouter
