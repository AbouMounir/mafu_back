module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comment', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        comment: DataTypes.TEXT,
        created_by: DataTypes.INTEGER,
        updated_by: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        annonce_id: DataTypes.INTEGER,
        comment_id: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN,
        is_delete: DataTypes.BOOLEAN,
    }, {
        tableName: 'Comments',
        timestamps: false,
    });
}
