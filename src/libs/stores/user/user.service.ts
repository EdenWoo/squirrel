import { User } from '@sq/libs/stores/interfaces/user';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// tslint:disable-next-line:no-bitwise
const randomString = (length) => [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');

@Injectable({ providedIn: 'root' })
export class UserService {
  addUser(user: User): Observable<User> {
    // fake return from backend
    return of({ ...user, id: randomString(10) } as User);
  }
}
