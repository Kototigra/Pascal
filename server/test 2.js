// const {User, Reservation, Restaurant} = require("./db/models");

//     async function test () {
//         const result = await User.findOne({
//             where: {
//                 id: 9
//             },
//             include: {
//                 model: Restaurant,
//                 as: 'rating'
//             }

//         })
//         console.log(result.Rating)

//     }

//     test()

/* const city = 'Москва'
const street = 'Трубная'
const building = '9'
const str = encodeURI(`https://geocode-maps.yandex.ru/1.x/?apikey=8e593647-2d9f-4250-8947-44b467394541&geocode=${city},+${street}+улица,+дом+${building}&format=json`)

console.log(str)
 */


// const pos = "37.458678 55.796395"
// console.log(pos.split(' '))

const street = 'Соловьиная роща' 
const trimStreet = street.trim().split(' ').join('+')
console.log(trimStreet)
