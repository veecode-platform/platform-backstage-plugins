export class ApiManagmentError extends Error{
    deepMessage: string;
    code: number;
    type?: "db" | "kong" | "internal";
    dataMessage?: string;

    constructor(message: string | undefined, deepMessage: string, code: number, type?: "db" | "kong" | "internal", dataMessage?:string ){
        super(message);
        this.deepMessage = deepMessage;
        this.code = code;
        this.type = type;
        this.dataMessage = dataMessage;
    }
}