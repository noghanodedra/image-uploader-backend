import "reflect-metadata";
import "module-alias/register";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
const fileUpload = require("express-fileupload");
import * as bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

import * as envConfig from "config";
import { Routes } from "routes/upload.routes";

class App {

  public app: express.Application;
  private test_routes: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.dbSetup();
    this.test_routes.routes(this.app);
  }

  private config(): void {
    // enable files upload
    this.app.use(
      fileUpload({
      })
    );
    const corsConfig = {
      origin: envConfig.default.originUrl,
      credentials: true,
    };
    this.app.use(cors(corsConfig));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.disable("x-powered-by"); // disable X-Powered-By header

    const PORT = envConfig.default.port || 4000;
    this.app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}`);
    });
  }

  private dbSetup(): void {
    const connectToDatabase = async (): Promise<void> => {
      const typeormconfig = await getConnectionOptions();
      await createConnection(typeormconfig);
    };
    connectToDatabase().then(async () => {
      console.log("Connected to database");
    }).catch(err => console.log(err));
  }
}
export default new App().app;
