import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deliveryType',
})
export class DeliveryTypePipe implements PipeTransform {
  public transform(value: string): unknown {
    switch (value) {
      case 'DEPARTURE':
        return 'Entrega';
      case 'REGRESS':
        return 'Devolución';
    }
  }
}
