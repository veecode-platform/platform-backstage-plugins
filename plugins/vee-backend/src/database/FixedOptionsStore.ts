import { IFixedOption } from "@veecode-platform/backstage-plugin-vee-common";
import { DatabaseVeeStore } from "./DatabaseVeeStore";
import { FIXED_OPTIONS_TABLE } from "../utils/constants/tables";
import { IFixedOptionsStore } from "./types";


export class FixedOptionsStore extends DatabaseVeeStore implements IFixedOptionsStore {
   
    private async existsType(fixedOption:IFixedOption):Promise<boolean>{
        const exists = await this.db.transaction( async trx => {
            const result = await trx(FIXED_OPTIONS_TABLE)
            .where('type', fixedOption.type)
            .first();
            return result !== undefined
        });
        return exists
    }
    
    async listFixedOptions():Promise<IFixedOption[]|null>{
        try{
            const fixedOptions = await this.db.select('*').from(FIXED_OPTIONS_TABLE)
            return fixedOptions ?? []
        }catch(error:any){
            this.logger.error(error.message);
            return null
        }
    }

    async getFixedOptionById(fixedOptionId:string):Promise<IFixedOption|null>{
        try{
            const fixedOption = await this.db(FIXED_OPTIONS_TABLE)
            .where('id', fixedOptionId);
            return fixedOption && fixedOption.length > 0 ? fixedOption[0] : null;
        }
        catch(error:any){
            this.logger.error(error.message);
            return null
        }
    }

    async createFixedOption(fixedOption:IFixedOption){
        try{
          if(await this.existsType(fixedOption)){
            return await this.updateFixedOption(fixedOption)
          }
         return await this.db.transaction( async trx => {
            await trx(FIXED_OPTIONS_TABLE)
            .insert({
                type: fixedOption.type,
                options: JSON.stringify(fixedOption.options)
            })
            .onConflict(['type'])
            .ignore();

            const [fixedOptionCreated] = await trx(FIXED_OPTIONS_TABLE)
            .where({
                type: fixedOption.type
            });

            return fixedOptionCreated as IFixedOption || null;
         })
            
        }
        catch(error:any){
            this.logger.error(error.message);
            return null
          }
    }

    async updateFixedOption(fixedOption:IFixedOption){
        try{
            return await this.db.transaction( async trx => {
                const updateFixedOptionRowsCount = await trx(FIXED_OPTIONS_TABLE)
                .where('id',fixedOption.id)
                .update({
                    type: fixedOption.type,
                    options: JSON.stringify(fixedOption.options)
                })
                
                if(updateFixedOptionRowsCount === 1) return fixedOption;
                return null;
            })
        }
        catch(error:any){
            this.logger.error(error.message);
            return null;
        }
    }

    async deleteFixedOption(fixedOptionId:string){
      try{
        const operation = await this.db(FIXED_OPTIONS_TABLE)
        .where('id',fixedOptionId)
        .delete();
        return !!operation;
      }
      catch(error:any){
        this.logger.error(error.message);
        return false;
      }
    }
}