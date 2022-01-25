const ratings = [
  {
    userId: 1,
    restaurantId: 1,
    score: 3,
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
  {
    userId: 1,
    restaurantId: 2,
    score: 2,
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
  {
    userId: 1,
    restaurantId: 3,
    score: 5,
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
  {
    userId: 1,
    restaurantId: 4,
    score: 3,
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
  {
    userId: 1,
    restaurantId: 5,
    score: 4,
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
  {
    userId: 1,
    restaurantId: 6,
    score: 2,
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
  {
    userId: 1,
    restaurantId: 7,
    score: 4,
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
  {
    userId: 1,
    restaurantId: 8,
    score: 4,
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
  {
    userId: 1,
    restaurantId: 9,
    score: 3,
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
  {
    userId: 1,
    restaurantId: 10,
    score: 4,
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
  {
    userId: 1,
    restaurantId: 11,
    score: 2,
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
  {
    userId: 1,
    restaurantId: 12,
    score: 2,
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
  {
    userId: 1,
    restaurantId: 13,
    score: 2,
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
  {
    userId: 1,
    restaurantId: 14,
    score: 5,
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ratings', ratings, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ratings', null, {});
  },
};
