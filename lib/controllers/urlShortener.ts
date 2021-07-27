import { Request, Response } from "express";
import Axios, { AxiosRequestConfig } from "axios";

export class UrlShortener {
    
    private bitlyKey = "529a1db4eac0bd55698147dac7700d810b348e76";

    public GetShortUrl(req: Request, res: Response): void {		
        
        let config: AxiosRequestConfig = {
            headers: {
                "Authorization": "Bearer " + this.bitlyKey,
                "Content-Type": "application/json"
            }
        };

        console.log(req.body.longUrl);
        
        let body = {
            domain: "bit.ly",
            long_url: req.body.longUrl
        };

        Axios.post("https://api-ssl.bitly.com/v4/bitlinks", body, config)
            .then(response => {
                res.status(200).send(response.data.link);
            })
            .catch(error => {
                console.log(error);
                
                res.status(500).send();
            });
    }    
}