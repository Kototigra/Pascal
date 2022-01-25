const {User, Reservation, Restaurant} = require("../db/models");

const getCurrentUser = async(req, res) => {
    const {id} = req.params

    const currentUser = await User.findByPk(id)

    res.json(currentUser);
}

const getReservation = async(req, res) => {

    const { id } = req.params;

    const currentReservations = await User.findOne({
        // raw: true,
        where: { id },
        include: 
            {
                model: Restaurant,
                as: 'reserv'

            },
    })
    console.log(currentReservations)
    res.json(currentReservations);
}




module.exports = {
    getCurrentUser,
    getReservation
}
