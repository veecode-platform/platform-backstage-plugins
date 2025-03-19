import { IOption } from "@veecode-platform/backstage-plugin-vee-common";

export interface FixedOptionStateType {
    FixedOptionId?: string,
    type: string,
    options?: IOption[]
  }

  // export interface IOption {
  //    id?:string,
  //    fixed_option_id?: string,
  //    label: string,
  //    prompt: string,
  //    created_at?: Date,
  //    updated_at?: Date,
  // }