module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Zone', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        zone_path: DataTypes.GEOMETRY('POLYGON'),
        created_by: DataTypes.INTEGER,
        updated_by: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
        tableName: 'Zones',
        timestamps: false,
    });
}
