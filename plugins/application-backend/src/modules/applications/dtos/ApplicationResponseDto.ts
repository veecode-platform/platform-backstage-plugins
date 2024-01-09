import { Application } from "../domain/Application";
import { ResponseEntity } from "../../../core/domain/ResponseEntity";

type ResponseProps = {
  applications?: Application[] | void;
  applicationIt?: Application[] | void;
  application?: Application | void;
  services?: string[] | void;
  partner?: string | void;
}
export class ApplicationResponseDto extends ResponseEntity<ResponseProps> {
  private constructor(props: ResponseProps) {
    super(props);
  }
  static create(props: ResponseProps): ApplicationResponseDto {
    props.application = props.applicationIt?.length && props.applicationIt?.[0] || props.application
    return new ApplicationResponseDto(props);
  }
}