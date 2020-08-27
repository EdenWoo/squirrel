import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserFacade } from '@sq/libs/stores/user/user.facade';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@sq/libs/stores/interfaces/user';

@Component({
  selector: 'sq-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$ = this.userFacade.users$;
  displayedColumns = ['fullName', 'email', 'dateOfBirth', 'gender', 'address'];
  dataSource: MatTableDataSource<User>;
  users: User[];

  constructor(private formBuilder: FormBuilder, private userFacade: UserFacade) {
    this.users$.subscribe((users) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
    });
  }

  ngOnInit(): void {}
}
