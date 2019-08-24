import * as XboxLiveAPI from '@xboxreplay/xboxlive-api';
import { Request, Response } from "express";
import { AuthHandler } from './authHandler';

export class Screenshots {
    private _authHandler = new AuthHandler();

    public GetScreenshotsForGamertag(request: Request, response: Response): void {        
        this._authHandler.GetAuthorization()
            .then(auth => this._handleGetAuthorizationSuccess(auth, request, response));
    }

    private _handleGetAuthorizationSuccess(auth: XboxLiveAPI.XBLAuthorization, request: Request, response: Response): void {
        XboxLiveAPI.getPlayerScreenshots(request.params.gamertag, auth)
            .then(clips => this._handleGetScreenshotsSuccess(clips, response))
            .catch(error => this._authHandler.InvalidateAuthentication());
    }

    private _handleGetScreenshotsSuccess(screenshots: XboxLiveAPI.PlayerScreenshotsResponse, response: Response): void {
        response.status(200).send(screenshots);
    }     
}