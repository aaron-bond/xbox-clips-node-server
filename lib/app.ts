import * as bodyParser from "body-parser";
import * as express from "express";
import { RouteProvider } from "./routes";

class App {
    public app: express.Application;
    public routeProvider = new RouteProvider();

    public constructor() {
        this.app = express();
        this.config();
        this.routeProvider.routes(this.app);
    }

    private config(): void {

        // support application/json type post data
        this.app.use(bodyParser.json());

        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app;
