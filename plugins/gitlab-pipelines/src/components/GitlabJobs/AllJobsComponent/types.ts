import { JobAnnotationProps } from "../../../utils/types";

export interface JobItemProps {
    items: JobAnnotationProps[] | [],
    updateData: ()=> void
  }