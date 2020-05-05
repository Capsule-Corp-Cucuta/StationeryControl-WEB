import { Pipe, PipeTransform } from '@angular/core';

import { UserType } from '../../core/models/user.model';

@Pipe({
  name: 'userType',
})
export class UserTypePipe implements PipeTransform {
  public transform(value: string): unknown {
    console.log(value);

    switch (value) {
      case 'ADMINISTRATOR':
        return 'Administrador';
      case 'IDS':
        return 'IDS';
      case 'DANE':
        return 'DANE';
      case 'DEPARTMENTAL':
        return 'Departamental';
      case 'MUNICIPAL':
        return 'Municipal';
      case 'INSTITUTIONAL':
        return ' Institucional';
    }
  }
}
