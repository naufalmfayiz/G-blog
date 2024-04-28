/**
 * Table Users
 * npx sequelize-cli model:generate --name User --attributes email:string,password:string,role:string,phoneNumber:string,address:string
 * 
 * Table Posts
 * npx sequelize-cli model:generate --name Post --attributes title:string,content:text,imgUrl:string,categoryId:integer,authorId:integer
 * 
 * Table Categories
 * npx sequelize-cli model:generate --name Category --attributes name:string
 * 
 * Seed Users
 * npx sequelize-cli seed:generate --name user-admin
 * 
 * Seed Categories
 * npx sequelize-cli seed:generate --name categories
 * 
 * Seed Posts
 * npx sequelize-cli seed:generate --name posts
 * 
 */
