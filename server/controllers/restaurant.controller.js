const { Op } = require('sequelize')
const { Adress, Category, Cuisine, Rating, Restaurant, Reservation, Picture } = require('../db/models')

const getAllRestaurantSearch = async (req, res) => {
  const search = req.body.title
  const allRestaurants = await Restaurant.findAll({ where: { title: { [Op.iLike]: `%${search}%` } } })
  setTimeout(() => {
    res.json({ allRestaurants })
  }, 2000)
}

// ****** Получение адресов всех ресторанов ******
const getAllRestaurantsAdresses = async (req, res) => {
  const aresses = await Adress.findAll({ attributes: ['latitude', 'longitude'], raw: true })
  res.json({ aresses })
}

// ****** Получение всех ресторанов ******
const getAllRestaurantsApp = async (req, res) => {
  const allRestaurantsApp = await Restaurant.findAll(
    {
      raw: true,
      include: [
        {
          model: Category,
          attributes: ['title'],
        },
        {
          model: Cuisine,
          attributes: ['title'],
        },
        {
          model: Adress,
          attributes: ['city', 'street', 'building', 'latitude', 'longitude'],
        },
      ],
    })

  const allPictures = await Picture.findAll({
    attributes: ['id', 'restaurantId', 'path'],
    raw: true
  })

  const allRatings = await Rating.findAll({
    attributes: ['score', 'restaurantId'],
    raw: true
  })

  const alrRestaurantsMapped = allRestaurantsApp.map((el) => ({
    ...el,
    category: el['Category.title'],
    cuisine: el['Cuisine.title'],
    address: `${el['Adress.city']}, ${el['Adress.street']} ${el['Adress.building']}`,
    picture: allPictures.find(item => item.restaurantId === el.id)?.path,
    rating: allRatings
      .filter(item => item.restaurantId === el.id)
      .map(item => item.score)
  }))

  // console.log('alrRestaurantsMapped 888 ###', alrRestaurantsMapped);
  res.json(alrRestaurantsMapped);
}


const getCurrentRestaurant = async (req, res) => {
  const { id } = req.params;

  const currentRestaurant = await Restaurant.findByPk(id, {
    include: [
      {
        model: Adress,
        attributes: ['city', 'street', 'building', 'latitude', 'longitude',],
      },
      {
        model: Category,
        attributes: ['id', 'title'],
      },
      {
        model: Cuisine,
        attributes: ['id', 'title'],
      },
    ],
    raw: true,
  });

  const currentRestaurantPicures = await Picture.findAll({
    where: { restaurantId: id },
    attributes: ['path'],
    raw: true
  })

  const currentRestaurantRating = await Rating.findAll({
    where: { restaurantId: id },
    attributes: ['score'],
    raw: true
  })

  const currentRestaurantData = {
    ...currentRestaurant,
    category: currentRestaurant['Category.title'],
    cuisine: currentRestaurant['Cuisine.title'],
    address: `${currentRestaurant['Adress.city']}, ${currentRestaurant['Adress.street']} ${currentRestaurant['Adress.building']}`,
    pictures: currentRestaurantPicures,
    rating: currentRestaurantRating.map((el) => el.score)
  };

  res.json(currentRestaurantData);
}

// ****** Получение всех ресторанов в области видимости ******
const getVisibleRestaurants = async (req, res) => {
  // console.log('$$$', req.body)
  const latitude = req.body.coord.map(el => el[0])
  // console.log(latitude)
  const result = await Adress.findAll({
    where: {
      latitude: {
        [Op.in]: latitude
      }
    },
    include: {
      model: Restaurant,
      attributes: ['title', 'avarageCoast', 'capacity', 'bookedTables'],
      include: [
        {
          model: Category,
          attributes: ['id', 'title'],
        },
        {
          model: Cuisine,
          attributes: ['id', 'title'],
        }
      ],
    },
    raw: true
  })
  // console.log('$$$')
  const restaurantsId = result.map((el) => el.restaurantId)

  const currentRestaurantPicture = await Picture.findAll({
    where: {
      restaurantId:
        { [Op.in]: restaurantsId }
    },
    raw: true
  })

  const currentRestaurantRating = await Rating.findAll({
    where: {
      restaurantId:
        { [Op.in]: restaurantsId }
    },
    attributes: ['score', 'restaurantId'],
    raw: true
  })

  const restaurantsByCoordData = result.map((el) => ({
    ...el,
    title: el['Restaurant.title'],
    avarageCoast: el['Restaurant.avarageCoast'],
    capacity: el['Restaurant.capacity'],
    bookedTables: el['Restaurant.bookedTables'],
    category: el['Restaurant.Category.title'],
    cuisine: el['Restaurant.Cuisine.title'],
    address: `${el.city}, ${el.street} ${el.building}`,
    picture: currentRestaurantPicture.find(item => item.restaurantId === el.restaurantId)?.path,
    rating: currentRestaurantRating
      .filter(item => item.restaurantId === el.restaurantId)
      .map(item => item.score)
  }))

  res.json(restaurantsByCoordData)
}

const addRating = async (req, res) => {
  const { id } = req.params;
  const { score } = req.body;
  try {
    const result = await Rating.create({ userId: req.session.user.id, restaurantId: id, score });

    const currentRestaurantRating = await Rating.findAll({
      where: { restaurantId: id },
      attributes: ['score'],
      raw: true
    })

    const rating = currentRestaurantRating.map((el) => el.score);
    res.json(rating);
  } catch (error) {
    console.log(error);
  }

}

const minusReservation = async (req, res) => {
  const { id } = req.params;

  try {
    await Restaurant.decrement('bookedTables', { where: { id: Number(id) } });

    const updatedRestaurantData = await Restaurant.findByPk(id, { raw: true });

    res.json(updatedRestaurantData.bookedTables);
  } catch (error) {
    console.log(error);
  }
}


const addReservation = async (req, res) => {
  const { id } = req.params;

  try {
    await Restaurant.increment('bookedTables', { where: { id: Number(id) } });

    const updatedRestaurantData = await Restaurant.findByPk(id, { raw: true });

    res.json(updatedRestaurantData.bookedTables);
  } catch (error) {
    console.log(error);
  }
}

const addReservationToDB = async (req, res) => {
  const { id } = req.params;

  try {
    const newReservation = await Reservation.create({ userId: req.session?.user.id, restaurantId: id });
    await Restaurant.increment('bookedTables', { where: { id: Number(id) } });

    const updatedRestaurantData = await Restaurant.findByPk(id, { raw: true });

    res.json(updatedRestaurantData.bookedTables);
  } catch (error) {
    console.log(error);
  }
}


const delReservationToDB = async (req, res) => {
  const { id } = req.params;
  try {
    await Reservation.destroy(
        {where: {userId: req.session?.user.id  , restaurantId: id}}
    )
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
  }

}

//katya edit
const editRestProfile = async(req,res) => {  
  const {title, categoryId, cuisineId, avarageCoast, capacity, city, street, building} = req.body.payload
  const result = await Restaurant.update({title, categoryId, cuisineId, avarageCoast, capacity}, {where: {id: req.body.restId}})
  const adress = await Adress.update({city, street, building}, {where: {restaurantId: req.body.restId}})
  const restik = await Restaurant.findByPk(req.body.restId)   
  res.json(restik)
}

module.exports = {
  getAllRestaurantSearch,
  getCurrentRestaurant,
  addRating,
  addReservation,
  getAllRestaurantsAdresses,
  getVisibleRestaurants,
  minusReservation,
  getAllRestaurantsApp,
  addReservationToDB,
  delReservationToDB,
  editRestProfile
}
