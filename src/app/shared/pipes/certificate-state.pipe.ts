import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'certificateState',
})
export class CertificateStatePipe implements PipeTransform {
  public transform(value: string): unknown {
    switch (value) {
      case 'IDLE':
        return 'Sin uso';
      case 'ASSIGNED':
        return 'Asignado';
      case 'GUARDED':
        return 'Guardado';
      case 'STRAY':
        return 'Extraviado';
      case 'ANNULLED':
        return 'Anulado';
      case 'WITH_INCONGRUENCES':
        return 'Con incongruencias';
    }
  }
}
