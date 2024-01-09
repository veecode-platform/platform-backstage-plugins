import { Knex } from "knex";
import { ServicePartner } from "../../domain/ServicePartner";
import { Partner } from "../../../partners/domain/Partner";

export class PostgresServicePartnerRepository {
    constructor(private readonly db: Knex) { }
    async total(): Promise<number> {
        return await (
            await this.db<ServicePartner>('service_partner').select('*')
        ).length;
    }


    static async create(knex: Knex<any, any[]>) {
        return new PostgresServicePartnerRepository(knex);
    }

    async getPartnersByService(service_id: string): Promise<Partner[] | unknown> {
        const partners = await this.db<ServicePartner>('service_partner')
            .innerJoin('partner', 'service_partner.partner_id', 'partner.id')
            .select('partner_id', 'name', 'active', 'email', 'phone')
            .where('service_id', service_id)
            .catch(error => console.error(error));
        console.log('partners: ', partners)
        return partners
    }



}