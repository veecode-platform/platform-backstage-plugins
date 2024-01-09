import { Service } from '../domain/Service';
import { ResponseEntity } from '../../../core/domain/ResponseEntity';

type ResponseProps = {
  services?: Service[] | void;
  serviceIt?: Service[] | void;
  service?: Service | void;
};
export class ServiceResponseDto extends ResponseEntity<ResponseProps> {
  private constructor(props: ResponseProps) {
    super(props);
  }
  static create(props: ResponseProps): ServiceResponseDto {
    props.service =
      (props.serviceIt?.length && props.serviceIt?.[0]) || props.service;
    return new ServiceResponseDto(props);
    
  }
}
