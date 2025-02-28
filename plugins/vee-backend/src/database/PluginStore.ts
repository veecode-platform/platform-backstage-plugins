import { IPlugin } from "@veecode-platform/backstage-plugin-vee-common";
import { DatabaseVeeStore } from "./DatabaseVeeStore";
import { IPluginStore } from "./types";
import { PLUGINS_TABLE } from "../utils/constants/tables";

export class PluginStore extends DatabaseVeeStore implements IPluginStore {
    
    private async existsPlugin(plugin:IPlugin):Promise<boolean>{ 
        const exists = await this.db.transaction( async trx => {
            const result = await trx(PLUGINS_TABLE)
            .where('name',plugin.name)
            .first();
            return result !== undefined
        })
        return exists
    };

    async listPlugins(): Promise<IPlugin[] | null> {
        try{
            const plugins = await this.db.select('*').from(PLUGINS_TABLE);
            return plugins ?? []
        }catch(error:any){
            this.logger.error(error.message);
            return null
        }
    }

    async getPluginById(pluginId: string): Promise<IPlugin[] | null> {
        try{
            const plugin = await this.db(PLUGINS_TABLE)
            .where('id',pluginId);
            return plugin && plugin.length > 0 ? plugin[0] : null;
        }
        catch(error:any){
            this.logger.error(error.message);
            return null
        }
    }

    async createPlugin(plugin: IPlugin): Promise<IPlugin | null> {
        try{
            if(await this.existsPlugin(plugin)){
               return await this.updatePlugin(plugin)
            }
            return await this.db.transaction( async trx => {
                await trx(PLUGINS_TABLE)
                .insert({
                    name: plugin.name,
                    annotations: JSON.stringify(plugin.annotations)
                })
                .onConflict(['name'])
                .ignore();

                const [pluginCreated] = await trx(PLUGINS_TABLE)
                .where({
                    name: plugin.name
                });

                return pluginCreated as IPlugin || null
            })
        }
        catch(error:any){
            this.logger.error(error.message);
            return null
        }
    }

    async updatePlugin(plugin: IPlugin): Promise<IPlugin | null> {
        try{
            return await this.db.transaction(async trx => {
                const updatePluginRowsCount = await trx(PLUGINS_TABLE)
                .where('id',plugin.id)
                .update({
                    name: plugin.name,
                    annotations: JSON.stringify(plugin.annotations)
                })

                if(updatePluginRowsCount === 1) return plugin;
                return null 
            })
        }
        catch(error:any){
            this.logger.error(error.message);
            return null
        }
    }

    async deletePlugin(pluginId: string): Promise<boolean> {
       try{
        const operation = await this.db(PLUGINS_TABLE)
        .where('id',pluginId)
        .delete();
        
        return !!operation;
       }
       catch(error:any){
        this.logger.error(error.mensage);
        return false
       }
    }

}