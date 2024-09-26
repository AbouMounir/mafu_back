module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Annonce', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        position: DataTypes.TEXT,
        location: DataTypes.GEOMETRY('POINT'),
        severity: DataTypes.INTEGER,
        annonce_type_id: DataTypes.INTEGER,
        annonce_category_id: DataTypes.INTEGER,
        longitude: DataTypes.DOUBLE,
        latitude: DataTypes.DOUBLE,
        zone_id: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN,
        is_delete: DataTypes.BOOLEAN,
        created_by: DataTypes.INTEGER,
        updated_by: DataTypes.INTEGER,
        validated_by: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
        tableName: 'Annonces',
        timestamps: false,
    });
}
