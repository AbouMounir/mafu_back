module.exports = (sequelize, DataTypes) => {
    return sequelize.define('UserAdditionalInfo', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        user_id: DataTypes.INTEGER,
        reputation: DataTypes.INTEGER,
        annonce_published: DataTypes.INTEGER,
        rank: DataTypes.INTEGER,
        player_id: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
        tableName: 'UsersAdditionalInfos',
        timestamps: false,
    });
}
