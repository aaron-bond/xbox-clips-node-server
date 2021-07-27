import * as XboxLiveAPI from '@xboxreplay/xboxlive-api';
import { Request, Response } from "express";
import { AuthHandler } from "./authHandler";

export class Profile {
    private _authHandler = new AuthHandler();

    private _settings =  [
        'GameDisplayPicRaw',
        'Gamerscore',
        'Gamertag',
        'AccountTier',
        'XboxOneRep',
        'PreferredColor',
        'RealName',
        'Bio',
        'Location',
        'ModernGamertag',
        'ModernGamertagSuffix',
        'UniqueModernGamertag',
        'RealNameOverride',
        'TenureLevel',
        'Watermarks',
        'IsQuarantined',
        'DisplayedLinkedAccounts'
    ];

    public GetPlayerSettings(request: Request, response: Response): void {
        this._authHandler.GetAuthorization()
            .then(auth => this._handleGetAuthorizationSuccess(auth, request, response));
    }
    
    private _handleGetAuthorizationSuccess(auth: XboxLiveAPI.XBLAuthorization, request: Request, response: Response): void {
        XboxLiveAPI.getPlayerSettings(request.params.gamertag, auth, this._settings as any)
            .then(settings => this._handleGetSettingsSuccess(settings, response))
            .catch(error =>  this._authHandler.InvalidateAuthentication());
    }

    private _handleGetSettingsSuccess(settings: XboxLiveAPI.SettingsNode, response: Response): void {
        response.status(200).send(settings);
    }
}