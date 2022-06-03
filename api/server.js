import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { router } from "./routes/router.js";

// The main function of the application.
const main = async () => {
  const app = express();
  const directoryFullName = dirname(fileURLToPath(import.meta.url));
  // To allow cross origin connections so that the webapp can connect to our server
  app.use(cors());

  // Register routes.
  app.use("/", router);

  app.listen(process.env.PORT, () => {
    console.log(`App is running at ${process.env.PORT}`);
    console.log("Press Ctrl-C to terminate...");
  });
};

main().catch(console.error);
