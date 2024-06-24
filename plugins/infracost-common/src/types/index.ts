import { JsonValue } from '@backstage/types';

/**
 *  
 *  Infracost Store
 * 
 */

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


/**
 * 
 *  Projects
 * 
 */

export type ResourceCounts = {
    [key:string] : string | number
}

export type Summary = {
    totalDetectedResources: number,
    totalSupportedResources: number,
    totalUnsupportedResources: number,
    totalUsageBaseResources: number,
    totalNoPriceResources: number,
    unsupportedResourceCounts: ResourceCounts| {},
    noPriceResourceCounts: ResourceCounts | {}
}

export type CostComponent = {
    name: string,
    unit: string,
    hourlyQuantity: string,
    monthlyQuantity: string,
    price: string,
    hourlyCost: string,
    monthlyCost: string
}

export type SubResources = {
    name: string,
    hourlyCost: string,
    monthlyCost: string,
    costComponents: CostComponent[] | []
}

export type Resource = {
    name: string,
    resourceType: string,
    tags : JsonValue  
    hourlyCost: string,
    monthlyCost: string,
    costComponents: CostComponent[] | [],
    subResources: any[] | [],
    totalHourlyCost: string,
    totalMonthlyCost: string,
    totalMonthlyUsageCost: string 
}

export type Breakdown = {
    resources: Resource[],
    totalHourlyCost: string,
    totalMonthlyCost: string,
    totalMonthlyUsageCost: string,
}

export type Diff = {
    resources?: Resource[] | [],
    totalHourlyCost: string,
    totalMonthlyCost: string,
    totalMonthlyUsageCost: string
}

export type Project = {
    name: string,
    breakdown: Breakdown,
    diff: Diff[],
    summary: Summary
}

export interface Infracost {
    name: string,  
    currency: string,
    projects: Project[],
    totalHourlyCost: string,
    totalMonthlyCost: string,
    totalMonthlyUsageCost: string,
    pastTotalHourlyCost: string,
    pastTotalMonthlyCost: string,
    pastTotalMonthlyUsageCost: string,
    diffTotalHourlyCost: string,
    diffTotalMonthlyCost: string,
    diffTotalMonthlyUsageCost: string,
    timeGenerated: string,
    summary: Summary
}
