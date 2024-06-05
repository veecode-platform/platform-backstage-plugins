/* eslint-disable @backstage/no-undeclared-imports */
import { JsonValue } from '@backstage/types';

export type ResourceCounts = {
    [key:string] : string | number
}

export type Summary = {
    total_detected_resources: number,
    total_supported_resources: number,
    total_unsupported_resources: number,
    total_usage_base_resources: number,
    total_no_price_resources: number,
    unsupported_resource_counts: ResourceCounts| {},
    no_price_resource_counts: ResourceCounts | {}
}

export type CostComponent = {
    name: string,
    unit: string,
    hourly_quantity: string,
    monthly_quantity: string,
    price: string,
    hourly_cost: string,
    monthly_cost: string
}

export type SubResources = {
    name: string,
    hourly_cost: string,
    monthly_cost: string,
    cost_components: CostComponent[] | []
}

export type Resource = {
    name: string,
    resource_type: string,
    tags : JsonValue  
    hourly_cost: string,
    monthly_cost: string,
    cost_components: CostComponent[] | [],
    sub_resources: any[] | [],
    total_hourly_cost: string,
    total_monthly_cost: string,
    total_monthly_usage_cost: string 
}

export type Breakdown = {
    resources: Resource[],
    total_hourly_cost: string,
    total_monthly_cost: string,
    total_monthly_usage_cost: string,
}

export type Diff = {
    resources?: Resource[] | [],
    total_hourly_cost: string,
    total_monthly_cost: string,
    total_monthly_usage_cost: string
}

export type Project = {
    name: string,
    breakdown: Breakdown,
    diff: Diff[],
    sumary: Summary
}

export interface InfracostStore {
    name: string,  
    currency: string,
    projects: Project[],
    total_hourly_cost: string,
    total_monthly_cost: string,
    total_monthly_usage_cost: string,
    past_total_hourly_cost: string,
    past_total_monthly_cost: string,
    past_total_monthly_usage_cost: string,
    diff_total_hourly_cost: string,
    diff_total_monthly_cost: string,
    diff_total_monthly_usage_cost: string,
    time_generated: string,
    summary: Summary
}