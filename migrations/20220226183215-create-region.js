'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Regions', {      
      region_id: {        
        primarykey: true,
        autoincrement: false,
        unique: true,
        type: Sequelize.INTEGER
      },
      system: {
        type: Sequelize.STRING
      },
      economy_level: {
        type: Sequelize.INTEGER
      },
      control: {
        type: Sequelize.STRING
      },
      food_price: {
        type: Sequelize.INTEGER
      },
      food_percent: {
        type: Sequelize.INTEGER
      },
      medical_supplies_price: {
        type: Sequelize.INTEGER
      },
      medical_supplies_percent: {
        type: Sequelize.INTEGER
      },
      hydrogen_price: {
        type: Sequelize.INTEGER
      },
      hydrogen_percent: {
        type: Sequelize.INTEGER
      },
      electronics_price: {
        type: Sequelize.INTEGER
      },
      electronics_percent: {
        type: Sequelize.INTEGER
      },
      solar_price: {
        type: Sequelize.INTEGER
      },
      solar_percent: {
        type: Sequelize.INTEGER
      },
      metal_price: {
        type: Sequelize.INTEGER
      },
      metal_percent: {
        type: Sequelize.INTEGER
      },
      diamond_price: {
        type: Sequelize.INTEGER
      },
      diamond_percent: {
        type: Sequelize.INTEGER
      },
      antimatter_price: {
        type: Sequelize.INTEGER
      },
      antimatter_percent: {
        type: Sequelize.INTEGER
      },
      fusion_price: {
        type: Sequelize.INTEGER
      },
      fusion_percent: {
        type: Sequelize.INTEGER
      },
      machinery_price: {
        type: Sequelize.INTEGER
      },
      machinery_percent: {
        type: Sequelize.INTEGER
      },
      textiles_price: {
        type: Sequelize.INTEGER
      },
      textiles_percent: {
        type: Sequelize.INTEGER
      },
      platinum_price: {
        type: Sequelize.INTEGER
      },
      platinum_percent: {
        type: Sequelize.INTEGER
      },
      biological_price: {
        type: Sequelize.INTEGER
      },
      biological_percent: {
        type: Sequelize.INTEGER
      },
      oxygen_price: {
        type: Sequelize.INTEGER
      },
      oxygen_percent: {
        type: Sequelize.INTEGER
      },
      gold_price: {
        type: Sequelize.INTEGER
      },
      gold_percent: {
        type: Sequelize.INTEGER
      },
      silver_price: {
        type: Sequelize.INTEGER
      },
      silver_percent: {
        type: Sequelize.INTEGER
      },
      water_price: {
        type: Sequelize.INTEGER
      },
      water_percent: {
        type: Sequelize.INTEGER
      },
      armor_price: {
        type: Sequelize.INTEGER
      },
      armor_percent: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Regions');
  }
};