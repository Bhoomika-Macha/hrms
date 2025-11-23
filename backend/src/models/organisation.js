module.exports = (sequelize, DataTypes) => {
  const Organisation = sequelize.define('Organisation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'organisations',
    timestamps: false
  });

  return Organisation;
};
