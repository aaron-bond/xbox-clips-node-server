import { Application, Request, Response } from "express";
import { Clips } from "./controllers/clips";

export class RouteProvider {

    private _clips = new Clips();

    public routes(app: Application): void {
        app.route("/").get((req: Request, res: Response) => this._handleBaseRequest(req, res));

        app.route("/clips").get((req: Request, res: Response) => this._clips.GetClipsForGamertag(req, res));
    }

    private _handleBaseRequest(request: Request, response: Response): void {
        response.status(200).send({
            message: "Health check successful"
        });
    }
}
