import { GitlabPipelinesStatus } from "../../../utils/enums/GitlabPipelinesStatus";

export interface JobProps {
    id: string,
    name: string,
    variable: string,
    tooltip:string,
    status: GitlabPipelinesStatus
  }