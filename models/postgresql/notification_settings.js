module.exports = (sequelize, DataTypes) => {
    return sequelize.define('NotificationSetting', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        annonce_category: DataTypes.INTEGER,
        annonce_type: DataTypes.INTEGER,
        active: DataTypes.BOOLEAN,
    }, {
        tableName: 'NotificationSettings',
        timestamps: false,
    });
}
