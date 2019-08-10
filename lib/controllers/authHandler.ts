import * as XboxLiveAuth from '@xboxreplay/xboxlive-auth';
import * as XboxLiveAPI from '@xboxreplay/xboxlive-api';

export class AuthHandler {

	private _userHash: string = "";
    private _XSTSToken: string =  "";    
    private _tokenExpires: Date = null;

    public constructor() {
        this._authenticate();
    }

    /**
     * Gets the Authorization object needed for API access
     * @returns {XboxLiveAPI.XBLAuthorization} The object holding the UserHash and XSTS Token
     */
    public GetAuthorization(): Promise<XboxLiveAPI.XBLAuthorization> {
        let promise = new Promise<XboxLiveAPI.XBLAuthorization>((resolve) => {

            this._authenticate().then(() => {
                let auth: XboxLiveAPI.XBLAuthorization = {
                    userHash: this._userHash,
                    XSTSToken: this._XSTSToken
                };
            
                resolve(auth);
            });
        });

        return promise;
    }

    /**
     * Invalidates the saved authentication so that the next request will perform a fresh auth
     */
    public InvalidateAuthentication(): void {
        this._userHash = "";
        this._XSTSToken = "";
        this._tokenExpires = new Date;
    }

    private _authenticate(): Promise<void> {
        let promise = new Promise<void>((resolve) => {

            // If the token is still valid, we can just use it as-is
            if (this._tokenExpires > new Date) {
                resolve();
            }
            else {
                XboxLiveAuth.authenticate(process.env.EMAIL, process.env.PASS)
                    .then(response => { 
                        this._handleAuthSuccess(response);

                        resolve();
                    })
                    .catch(error => this._handleAuthFailed(error));
            }
        });       

        return promise;
    }

	private _handleAuthSuccess(response: XboxLiveAuth.AuthUserResponse): void {
		this._userHash = response.userHash;
		this._XSTSToken = response.XSTSToken;
		this._tokenExpires = new Date(response.expiresOn);
	}

	private _handleAuthFailed(error): void {
        console.error(error);        
    }    
}