import { Injectable, BadRequestException } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'network', async: true })
@Injectable()
export class CustomNetworkValidator implements ValidatorConstraintInterface {
  async validate(value: string): Promise<boolean> {
    const networks = [
      'Ethereum Mainnet',
      'Ethereum Goerli',
      'Polygon Mainnet',
      'Polygon Mumbai',
    ]; //TODO: move this to be read from config
    if (!networks.includes(value)) {
      throw new BadRequestException('Invalid/Unsupported Network');
    }
    return true;
  }
}
