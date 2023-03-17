import { Validate } from 'class-validator';
import { CustomEthAddressValidator } from './validator/customEthAddressValidator';
import { CustomNetworkValidator } from './validator/customNetworkValidator';
export class GodModeRequestDto {
  @Validate(CustomEthAddressValidator)
  address: string;

  @Validate(CustomNetworkValidator)
  network: string;
}
