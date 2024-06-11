export type JsonObject = { [key: string]: any };

export type InfracostEstimate ={
    id?: string,
    name: string,
    currency: string,
    projects: JsonObject[],
    total_hourly_cost: string,
    total_monthly_cost: string,
    total_monthly_usage_cost: string,
    past_total_hourly_cost: string,
    past_total_monthly_cost: string,
    past_total_monthly_usage_cost: string,
    diff_total_hourly_cost: string,
    diff_total_monthly_cost: string,
    diff_total_monthly_usage_cost: string,
    summary: JsonObject,
    time_generated?: Date,
    created_at?: Date,
    updated_at?: Date
}

export interface InfracosteStore {
    createInfracostProjectsEstimate(
        estimate:InfracostEstimate
    ):Promise<InfracostEstimate|null>,

    listInfracostProjectsEstimate()
    :Promise<InfracostEstimate[]|null>,

    getInfracostProjectsEstimatebyName(
        name:string
    ):Promise<InfracostEstimate|null>;

    updateInfracostProjectsEstimate(
        estimate:InfracostEstimate
    ):Promise<InfracostEstimate|null>

    deleteInfracostProjectsEstimate(
        name:string
    ):Promise<boolean>
}