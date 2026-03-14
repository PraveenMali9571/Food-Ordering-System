import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food Ordering API",
      version: "1.0.0",
      description: "API documentation for Food Ordering System"
    },
    servers: [
      {
        url: "https://food-ordering-system-krw7.onrender.com"
      }
    ]
  },
apis: ["./allSrc/**/*.ts"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;