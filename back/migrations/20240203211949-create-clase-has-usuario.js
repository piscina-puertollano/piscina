module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('clase_has_usuario', {
       usuario_idusuario: {
         allowNull: false,
         type: Sequelize.INTEGER,
         references: {
           model: 'Users',
           key: 'id'
         }
       },
       clase_idclase: {
         allowNull: false,
         type: Sequelize.INTEGER,
         references: {
           model: 'clase',
           key: 'idclase'
         }
       }
     });
  },
  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('clase_has_usuario');
  }
 };
 