import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

export const setupSwagger = (app: Express) => {
  const specs = swaggerJsdoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Docs",
        version: "1.0.0",
      },
    },
    apis: ["./src/routes/*.ts"],
  });

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
