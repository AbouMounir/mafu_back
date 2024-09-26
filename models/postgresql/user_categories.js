module.exports = (sequelize, DataTypes) => {
    return sequelize.define('UserCategory', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        created_by: DataTypes.INTEGER,
        updated_by: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
        tableName: 'UserCategories',
        timestamps: false,
    });
}
