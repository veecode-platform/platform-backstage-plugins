import axios from "axios";
import { KongServiceBase } from "./KongServiceBase";

export class CredentialsOauth extends KongServiceBase {

    public async generateCredentials(idConsumer: string, name: string) {
        const url = `${await this.getUrl()}/consumers/${idConsumer}/oauth2`
        try {

            const response = await axios.post(url, {
                name: name
            });
            return response.data;
        } catch (error) {
            return error
        }
    }

    public async findAllCredentials(idConsumer: string) {
        const url = `${await this.getUrl()}/consumers/${idConsumer}/oauth2`
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            return error
        }
    }
    public async deleteCredentialById(idConsumer: string, idCredential: string) {
        const url = `${await this.getUrl()}/consumers/${idConsumer}/oauth2/${idCredential}`
        try {
            const response = await axios.delete(url);
            return response.data;

        } catch (error) {
            return error;
        }

    }

}