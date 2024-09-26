module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AnnonceAdditionalInfo', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        annonce_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        main_images: DataTypes.STRING, // Assuming URL is string
        others_images: DataTypes.TEXT,
        status: DataTypes.BOOLEAN,
        is_delete: DataTypes.BOOLEAN,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
        tableName: 'AnnoncesAdditionalInfos',
        timestamps: false,
    });
}
