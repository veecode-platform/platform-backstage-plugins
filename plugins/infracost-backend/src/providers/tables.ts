/* eslint-disable @backstage/no-undeclared-imports */
import { JsonObject } from "@backstage/types"

/**
 * @public
 */

export type DbInfracostEstimateRow ={
    id: string,
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
    time_generated: string,
    created_at: string,
    updated_at: string
}