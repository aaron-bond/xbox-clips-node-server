import { Application, Request, Response } from "express";
import { Clips } from "./controllers/clips";
import { Screenshots } from "./controllers/screenshots";
import { Profile } from "./controllers/profile";
import { Activity } from "./controllers/activity";
import { UrlShortener } from "./controllers/urlShortener";

export class RouteProvider {

    private _clips = new Clips();
    private _screenshots = new Screenshots();
    private _profile = new Profile();
    private _activity = new Activity();
    private _urlShortener = new UrlShortener();

    public routes(app: Application): void {
        app.route("/").get((req: Request, res: Response) => this._handleBaseRequest(req, res));

        app.route("/clips/:gamertag").get((req: Request, res: Response) => this._clips.GetClipsForGamertag(req, res));
        
        app.route("/screenshots/:gamertag").get((req: Request, res: Response) => this._screenshots.GetScreenshotsForGamertag(req, res));

        app.route("/profile/:gamertag").get((req: Request, res: Response) => this._profile.GetPlayerSettings(req, res));

        app.route("/activity/:gamertag").get((req: Request, res: Response) => this._activity.GetActivityForGamertag(req, res));

        app.route("/shorten").post((req: Request, res: Response) => this._urlShortener.GetShortUrl(req, res));
    }

    private _handleBaseRequest(request: Request, response: Response): void {
        response.status(200).send({
            message: "Health check successful"
        });
    }
}
