//const env = require("dotenv").config();

console.log("env ", process.env);
export const api = `${process.env.REACT_APP_SERVERAPI}`;
// export const api = `${env.API}`;
export const generatePublicUrl = (fileName) => {
  return `http://localhost:4000/public/${fileName}`;
};
