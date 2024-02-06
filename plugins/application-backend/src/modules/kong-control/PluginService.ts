import axios from "axios";

export class PluginService{

    public async configAclKongService(kongUrl: string,serviceName: string, allowed: string[], hidegroupsheader: boolean){
        try {
            const url = `http://${kongUrl}/services/${serviceName}/plugins`
            const response = await axios.post(url, {
               enabled: true,
               name: 'acl',
               config: {
                   allow: allowed,
                   hide_groups_header: hidegroupsheader
               }
           })
           return response.data;  
        } 
        catch (error:any) {
           throw new Error(error.message);           
        }

    }


    public async updateclKongService(kongUrl: string,serviceName: string, allowed: string[], idPluginAcl:string, hidegroupsheader: boolean){
        try {
            const url = `http://${kongUrl}/services/${serviceName}/plugins/${idPluginAcl}`
            const response = await axios.post(url, {
               enabled: true,
               name: 'acl',
               config: {
                   allow: allowed,
                   hide_groups_header: hidegroupsheader
               }
           })
           return response.data;
            
        } 
        catch (error:any) {
            throw new Error(error.message)
        }
    }
    public async removeAclKongService(kongUrl: string, serviceName: string, idAcl: string){
        try {
            const url = `http://${kongUrl}/services/${serviceName}/plugins/${idAcl}`
            const response = await axios.delete(url)
            return response.data;
        } 
        catch (error:any) {
            throw new Error(error.message)
        }
    }


}