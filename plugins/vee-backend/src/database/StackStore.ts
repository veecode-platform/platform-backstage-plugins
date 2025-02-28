import { IStack } from "@veecode-platform/backstage-plugin-vee-common";
import { DatabaseVeeStore } from "./DatabaseVeeStore";
import { IStackStore } from "./types";
import { STACKS_TABLE } from "../utils/constants/tables";

export class StackStore extends DatabaseVeeStore implements IStackStore {

    private async existsStack(stack:IStack):Promise<boolean>{
        const exists = await this.db.transaction( async trx => {
            const result = await trx(STACKS_TABLE)
            .where('name',stack.name)
            .first();
            return result !== undefined
        });
        return exists
    }

    async listStacks(): Promise<IStack[] | null> {
        try{
            const stacks = await this.db.select('*').from(STACKS_TABLE);
            return stacks ?? []
        }
        catch(error:any){
            this.logger.error(error.message);
            return null
        }
    }

    async getStackById(stackId: string): Promise<IStack | null> {
        try{
            const stack = await this.db(STACKS_TABLE)
            .where('id',stackId);
            return stack && stack.length > 0 ? stack[0]: null;
        }
        catch(error:any){
            this.logger.error(error.message);
            return null
        }
    }

    async createStack(stack: IStack): Promise<IStack | null> {
        try{
            if(await this.existsStack(stack)){
                return await this.updateStack(stack)
            }
            return await this.db.transaction(async trx => {
                await trx(STACKS_TABLE)
                .insert({
                    name: stack.name,
                    source: stack.source,
                    icon: stack.icon ?? null,
                    plugins: JSON.stringify(stack.plugins)
                })
                .onConflict(['name'])
                .ignore();

                const [stackCreated] = await trx(STACKS_TABLE)
                .where({
                    name: stack.name
                });

                return stackCreated as IStack || null
            })
            
        }
        catch(error:any){
            this.logger.error(error.message);
            return null
        }
    }

    async updateStack(stack: IStack): Promise<IStack | null> {
        try{
           return await this.db.transaction( async trx => {
            const updateStackRowCount = await trx(STACKS_TABLE)
            .where('id',stack.id)
            .update({
                name: stack.name,
                source: stack.source,
                icon: stack.icon ?? null,
                plugins: JSON.stringify(stack.plugins)
            })

            if(updateStackRowCount === 1) return stack;
            return null
           })
        }
        catch(error:any){
            this.logger.error(error.message);
            return null
        }
    }

    async deleteStack(stackId: string): Promise<boolean> {
        try{
            const operation = await this.db(STACKS_TABLE)
            .where('id',stackId)
            .delete();
            return !!operation
        }
        catch(error:any){
            this.logger.error(error.message);
            return false
        }
    }
}