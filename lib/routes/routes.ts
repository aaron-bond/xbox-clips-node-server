import { Request, Response, Application } from "express";

export class RouteProvider {
	public routes(app: Application): void {
		
		app.route("/").get((request: Request, response: Response) => {
			response.status(200).send({
				message: "GET request successful"
			});
		});
	}
}