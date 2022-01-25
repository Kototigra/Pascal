const bcrypt = require('bcrypt')
const axios = require('axios');
const { Admin, Restaurant, User, Adress, Picture } = require('../db/models')


const signUp = async (req, res) => {
  const { name, email, password } = req.body
  console.log(name, email, password);
  if (name && email && password) {
    try {
      const hashPassword = await bcrypt.hash(password, 11)
      const newUser = await User.create({
        name,
        email,
        password: hashPassword,
      })
      console.log(newUser);
      req.session.user = {
        id: newUser.get({ plain: true }).id,
        name: newUser.name,
      }
      console.log({ id: newUser.get({ plain: true }).id, name: newUser.name });
      return res.json({ id: newUser.get({ plain: true }).id, name: newUser.name })
    } catch (error) {
      return res.sendStatus(500)
    }
  }
  return res.sendStatus(400)
}

const signIn = async (req, res) => {
  const { password, email } = req.body
  if (password && email) {
    try {
      let currentUser = await User.findOne({ where: { email }, raw: true })
      if (!currentUser) {
        currentUser = await Admin.findOne({ where: { email }, raw: true })
        const rest = await Restaurant.findOne({ where: { id: currentUser.restaurantId } })
        console.log(rest);
        if (currentUser && (await bcrypt.compare(password, currentUser.password))) {

          req.session.user = {
            id: currentUser.id,
            name: currentUser.name,
            isAdmin: 'isAdmin',
            restaurantId: rest.id
          }
          return res.json({ id: currentUser.id, name: currentUser.name, isAdmin: 'isAdmin', restaurantId: rest.id })
        }
      }
      if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
        req.session.user = {
          id: currentUser.id,
          name: currentUser.name,
        }
        return res.json({ id: currentUser.id, name: currentUser.name })
      }
      return res.sendStatus(401)
    } catch (error) {

      return res.sendStatus(500)
    }
  }
  return res.sendStatus(400)
}

const signOut = async (req, res) => {
  res.clearCookie("auth")
  req.session.destroy()
  return res.sendStatus(200)
}

const signUpAdmin = async (req, res) => {
  const { name, email, password, title, categoryId, cuisineId, avarageCoast, capacity, city, street, building, image } = req.body
  console.log('lol');
  console.log(name, email, password, title, categoryId, cuisineId, avarageCoast, capacity, city, street, building, image);
  if (name && email && password) {
    try {
      const newRest = await Restaurant.create({
        title,
        categoryId,
        cuisineId,
        avarageCoast,
        capacity,
        bookedTables: 0
      })

      console.log('kek');
      const hashPassword = await bcrypt.hash(password, 11)
      const newUser = await Admin.create({
        name,
        email,
        password: hashPassword,
        restaurantId: newRest.id
      })
      // ------------ // katya

      const newImage = await Picture.create({
        path: image,
        restaurantId: newRest.id
      })

      console.log(newImage);



      city.split

      console.log('********')
      const url = encodeURI(`https://geocode-maps.yandex.ru/1.x/?apikey=8e593647-2d9f-4250-8947-44b467394541&geocode=${city},+${street}+улица,+дом+${building}&format=json`)
      const response = await axios.get(url)
      const result = await response
      const [longitude, latitude,] = result.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')
      const adress = await Adress.create({ city, street, building, latitude, longitude, restaurantId: newRest.id })
      //  katya
      req.session.user = {
        id: newUser.get({ plain: true }).id,
        name: newUser.name,
        isAdmin: 'isAdmin',
        restaurantId: newRest.id
      }

      return res.json({ id: newUser.get({ plain: true }).id, name: newUser.name, isAdmin: 'isAdmin', restaurantId: newRest.id })
    } catch (error) {
      console.log(error);
      return res.sendStatus(500)
    }
  }
  return res.sendStatus(400)
}

const checkAuth = async (req, res) => {
  console.log(33333);
  try {

    let user = await User.findByPk(req.session.user.id)
    console.log('lol1', user);
    if (!user) {
      user = await Admin.findByPk(req.session.user.id)
      console.log('lol1', user.isAdmin);
      console.log(user);
      return res.json({ id: user.id, name: user.name, isAdmin: 'isAdmin', restaurantId: user.restaurantId })
    } else if (user) {
      return res.json({ id: user.id, name: user.name })
    }
    return res.redirect('/')



    // console.log('=====>', user);
    // console.log(22222);
    // if (user.isAdmin) {
    //   return res.json({ id: user.id, name: user.name, isAdmin: user.isAdmin, restaurantId: user.restaurantId })
    // } else {

    //   return res.json({ id: user.id, name: user.name })
    // }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500)
  }
}


module.exports = {
  signIn,
  signOut,
  signUp,
  signUpAdmin,
  checkAuth
}
