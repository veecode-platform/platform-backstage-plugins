import { InfracostEstimate } from '@veecode-platform/backstage-plugin-infracost-common';

export interface InfracostStore {
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