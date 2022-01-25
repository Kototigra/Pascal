const users = [
  {
    name: 'user1',
    email: 'user1@mail.ru',
    password: '$2a$11$2ywb9l3WZclMGkZUrZBszectN7oDLcO4s.h5LQqRWWWhP8r4/.vES',
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
  {
    name: 'user2',
    email: 'user2@mail.ru',
    password: '$2a$11$DHQ209YyBExGy2sU3G00zOEfcVFhdNzgYzYcFaC7AjtpvsFShUk/q',
    createdAt: '2022-01-16 21:30:24.393 +0300',
    updatedAt: '2022-01-16 21:30:24.393 +0300',
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

