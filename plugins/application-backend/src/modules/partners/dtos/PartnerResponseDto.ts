import { ResponseEntity } from '../../../core/domain/ResponseEntity';
import { Partner } from '../domain/Partner';

type ResponseProps = {
  partners?: Partner[] | void;
  partnerIt?: Partner[] | void;
  partner?: Partner | void;
};
export class PartnerResponseDto extends ResponseEntity<ResponseProps> {
  private constructor(props: ResponseProps) {
    super(props);
  }
  static create(props: ResponseProps): PartnerResponseDto {
    props.partner =
      (props.partnerIt?.length && props.partnerIt?.[0]) || props.partner;
    return new PartnerResponseDto(props);
  }
}
