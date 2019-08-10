import * as XboxLiveAuth from '@xboxreplay/xboxlive-auth';
import * as XboxLiveAPI from '@xboxreplay/xboxlive-api';
import { Request, Response } from "express";
import { AuthHandler } from './authHandler';

export class Clips {
    private _authHandler = new AuthHandler();
    
    public GetClipsForGamertag(request: Request, response: Response): void {		
        this._authHandler.GetAuthorization()
            .then(auth => this._handleGetAuthorizationSuccess(auth, request, response));
    }
    
    private _handleGetAuthorizationSuccess(auth: XboxLiveAPI.XBLAuthorization, request: Request, response: Response): void {
        XboxLiveAPI.getPlayerGameclips(request.params.gamertag, auth)
            .then(clips => this._handleGetClipsSuccess(clips, response))
            .catch(error => this._authHandler.InvalidateAuthentication());
    }

    private _handleGetClipsSuccess(clips: XboxLiveAPI.PlayerGameclipsResponse, response: Response): void {
        response.status(200).send(clips);
    }    
}