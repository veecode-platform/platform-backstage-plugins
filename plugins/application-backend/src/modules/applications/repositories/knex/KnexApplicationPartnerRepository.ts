import { Knex } from "knex";
import { ApplicationPartner} from "../../domain/ApplicationPartner";
import { ApplicationPartnerMapper } from "../../mappers/ApplicationPartnerMapper";

export class PostgresApplicationPartnerRepository {
    constructor(private readonly db: Knex) { }
    async total(): Promise<number> {
        return (
            await this.db<ApplicationPartner>('application_partner').select('*')
        ).length;
    }


    static async create(knex: Knex<any, any[]>) {
        return new PostgresApplicationPartnerRepository(knex);
    }

    async getApplicationsByPartner(partnerId: string): Promise<ApplicationPartner[] | unknown> {
        const service = await this.db<ApplicationPartner>('application_partner')
            .innerJoin('partner', 'application_partner.partner_id', 'partner.id')
            .select('partner_id')
            .where('partner_id', partnerId)
            .catch(error => console.error(error));
        console.log('service: ', service)
        return service
    }


    async associate(applicationId: string, partnerId: string) {
        const applicationPartner: ApplicationPartner = ApplicationPartner.create({
            application_id: applicationId,
            partner_id: partnerId
        })
        console.log('application service', applicationPartner)
        const data = await ApplicationPartnerMapper.toPersistence(applicationPartner)
        console.log(data)
        await this.db<any>('application_partner').insert(data)
        .catch(error => console.error(error));


    }
}