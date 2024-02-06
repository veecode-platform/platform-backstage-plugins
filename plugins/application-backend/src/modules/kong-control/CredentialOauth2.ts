
export class CredentialOauth {
    id: string;
    key: string;
    type: string; 
    clientId: string;
    clientSecret: string;

    constructor(id: string, key: string, clientId: string, clientSecret: string, type: string) {
        this.id = id
        this.key = key
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.type = type
        
    }
}