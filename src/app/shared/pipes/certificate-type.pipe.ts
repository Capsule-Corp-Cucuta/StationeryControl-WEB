import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'certificateType',
})
export class CertificateTypePipe implements PipeTransform {
  public transform(value: string): unknown {
    switch (value) {
      case 'CA_NV':
        return 'CA de Nacido Vivo';
      case 'NV':
        return 'Nacido vivo';
      case 'CA_DEF':
        return 'CA de Defuncion';
      case 'DEF':
        return 'Defuncion';
    }
  }
}
