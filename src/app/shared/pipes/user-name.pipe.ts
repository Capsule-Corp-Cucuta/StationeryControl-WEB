import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Pipe({
  name: 'userName',
})
export class UserNamePipe implements PipeTransform {
  transform(value: User): string {
    return value.name;
  }
}
