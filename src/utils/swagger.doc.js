const swaggerSpec = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Node MongoDB API",
        version: "1.0.0"
      },
      servers: [
        {
          url: "http://localhost:3000"
        }
      ]
    },
    apis: ["src/routes/*.js"],
  }

module.exports = swaggerSpec;
