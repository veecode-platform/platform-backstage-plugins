import { Knex } from "knex";
import { PartnerApplication } from "../../domain/PartnerApplication";
import { PartnerApplicationMapper } from "../../mappers/PartnerApplicationMapper";

export class PostgresPartnerApplicationRepository {
    constructor(private readonly db: Knex) { }
    async total(): Promise<number> {
        return await (
            await this.db<PartnerApplication>('partner_application').select('*')
        ).length;
    }


    static async create(knex: Knex<any, any[]>) {
        return new PostgresPartnerApplicationRepository(knex);
    }

    async getApplicationsByPartner(partner_id: string): Promise<PartnerApplication[] | unknown> {
        try {
            const applications = await this.db<PartnerApplication>('partner_application')
            .innerJoin('application', 'partner_application.application_id', 'application.id')
            .select('application_id')
            .where('partner_id', partner_id)
        return applications   
        } 
        catch (error:any) {
            throw new Error(error.message);           
        }

    }

    async associate(partnerId: string, application_id: string[]) {
        try {
            for (let i = 0; i < application_id.length; i++) {
                const partner: PartnerApplication = PartnerApplication.create({
                    partner_id: partnerId,
                    application_id: application_id[i]
                })
                const data = await PartnerApplicationMapper.toPersistence(partner)
                await this.db<any>('partner_application').insert(data)  
            } 
        } 
        catch (error:any) {
            throw new Error(error.message);
            
        }
    }
}
