
export class Credential {
    id: string;
    key: string;
    type: string; 


    constructor(id: string, key: string, type: string) {
        this.id = id
        this.key = key
        this.type = type
        
    }
}