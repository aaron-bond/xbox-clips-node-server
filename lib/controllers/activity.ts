import * as XboxLiveAPI from '@xboxreplay/xboxlive-api';
import { Request, Response } from "express";
import { AuthHandler } from './authHandler';

export class Activity {
    private _authHandler = new AuthHandler();
    
    public GetActivityForGamertag(request: Request, response: Response): void {		
        this._authHandler.GetAuthorization()
            .then(auth => this._handleGetAuthorizationSuccess(auth, request, response));
    }
    
    private _handleGetAuthorizationSuccess(auth: XboxLiveAPI.XBLAuthorization, request: Request, response: Response): void {
        XboxLiveAPI.getPlayerActivityHistory(request.params.gamertag, auth)
            .then(activity => this._handleGetActivitySuccess(activity, response))
            .catch(error => this._authHandler.InvalidateAuthentication());
    }

    private _handleGetActivitySuccess(activity: XboxLiveAPI.ActivityHistoryResponse<any>, response: Response): void {
        response.status(200).send(activity);
    }
}