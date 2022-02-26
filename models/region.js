'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Region.init({
    region_id: {      
      primarykey: true,
      autoincrement: false,
      unique: true,
      type: DataTypes.INTEGER
    },
    system: DataTypes.STRING,
    economy_level: DataTypes.INTEGER,
    control: DataTypes.STRING,
    food_price: DataTypes.INTEGER,
    food_percent: DataTypes.INTEGER,
    medical_supplies_price: DataTypes.INTEGER,
    medical_supplies_percent: DataTypes.INTEGER,
    hydrogen_price: DataTypes.INTEGER,
    hydrogen_percent: DataTypes.INTEGER,
    electronics_price: DataTypes.INTEGER,
    electronics_percent: DataTypes.INTEGER,
    solar_price: DataTypes.INTEGER,
    solar_percent: DataTypes.INTEGER,
    metal_price: DataTypes.INTEGER,
    metal_percent: DataTypes.INTEGER,
    diamond_price: DataTypes.INTEGER,
    diamond_percent: DataTypes.INTEGER,
    antimatter_price: DataTypes.INTEGER,
    antimatter_percent: DataTypes.INTEGER,
    fusion_price: DataTypes.INTEGER,
    fusion_percent: DataTypes.INTEGER,
    machinery_price: DataTypes.INTEGER,
    machinery_percent: DataTypes.INTEGER,
    textiles_price: DataTypes.INTEGER,
    textiles_percent: DataTypes.INTEGER,
    platinum_price: DataTypes.INTEGER,
    platinum_percent: DataTypes.INTEGER,
    biological_price: DataTypes.INTEGER,
    biological_percent: DataTypes.INTEGER,
    oxygen_price: DataTypes.INTEGER,
    oxygen_percent: DataTypes.INTEGER,
    gold_price: DataTypes.INTEGER,
    gold_percent: DataTypes.INTEGER,
    silver_price: DataTypes.INTEGER,
    silver_percent: DataTypes.INTEGER,
    water_price: DataTypes.INTEGER,
    water_percent: DataTypes.INTEGER,
    armor_price: DataTypes.INTEGER,
    armor_percent: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Region',
  });
  return Region;
};