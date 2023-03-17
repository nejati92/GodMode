import { Injectable, BadRequestException } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isAddress } from 'ethers';

@ValidatorConstraint({ name: 'address', async: true })
@Injectable()
export class CustomEthAddressValidator implements ValidatorConstraintInterface {
  async validate(value: string): Promise<boolean> {
    if (!isAddress(value)) {
      throw new BadRequestException('Invalid Address');
    }
    return true;
  }
}
