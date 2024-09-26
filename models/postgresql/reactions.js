module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Reaction', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        target_id: DataTypes.INTEGER,
        target_type: DataTypes.ENUM('Annonce', 'Comment'),
        reaction_type: DataTypes.ENUM('Like', 'Dislike'),
        created_by: DataTypes.INTEGER,
        updated_by: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
        tableName: 'Reactions',
        timestamps: false,
    });
}
