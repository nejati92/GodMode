import { Validate, IsString } from 'class-validator';
import { CustomEthAddressValidator } from './validator/customEthAddressValidator';
import { CustomNetworkValidator } from './validator/customNetworkValidator';
export class GodModeClassifierRequestDto {
  @Validate(CustomEthAddressValidator)
  address: string;

  @Validate(CustomNetworkValidator)
  network: string;

  @IsString()
  threshold: string;

  @Validate(CustomNetworkValidator)
  tokenType: string;
}
