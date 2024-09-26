import {Sequelize} from "sequelize";

const sequelize = new Sequelize(`postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@pg-mafu-geodaftar-4a04.i.aivencloud.com:12090/defaultdb`,
    {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // <-- Add this line
            },
        }
    }) // Example for postgres


try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
