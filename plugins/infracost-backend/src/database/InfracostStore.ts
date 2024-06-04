/* eslint-disable @backstage/no-undeclared-imports */
import { JsonValue } from '@backstage/types';

// export type ResourceCounts = {
//     [key:string] : string | number
// }

export type Summary = {
    totalDetectedResources: number,
    totalSupportedResources: number,
    totalUnsupportedResources: number,
    totalUsageBasedResources: number,
    totalNoPriceResources: number,
    // unsupportedResourceCounts: ResourceCounts| {},
    // noPriceResourceCounts: ResourceCounts | {}
}

export type Resource = {
    name: string,
    resourceType: string,
    tags : JsonValue  // check
    hourlyCost: string,
    monthlyCost: string // costComponents ?
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
    diff: Diff[]
}

export interface InfracostStore {
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