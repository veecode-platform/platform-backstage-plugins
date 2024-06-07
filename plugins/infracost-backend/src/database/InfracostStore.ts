/* eslint-disable @backstage/no-undeclared-imports */
import { JsonObject } from "@backstage/types"

export type InfracostEstimate ={
    id?: string,
    name: string,
    currency: string,
    projects: JsonObject[],
    total_hourly_cost: string,
    total_monthly_cost: string,
    total_monthly_usage_const: string,
    past_total_hourly_cost: string,
    past_total_monthly_cost: string,
    past_tota_monthly_usage_cost: string,
    diff_total_hourly_cost: string,
    diff_total_monthly_cost: string,
    diff_total_monthly_usage_cost: string,
    sumary: JsonObject,
    time_generated?: string,
    created_at?: string,
    updated_at?: string
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