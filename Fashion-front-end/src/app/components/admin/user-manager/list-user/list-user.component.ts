import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ColorService} from '../../../../services/color.service';
import {Router} from '@angular/router';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: Observable<any>;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.users = this.userService.getListUser();
  }
  deleteUser(id: string) {
    const choice = confirm('are you sure to delete this color');
    if (choice) {
      this.userService.deleteUserById(id).subscribe(data => {console.log(data); this.reloadData(); },
        error => console.log(error));
    }
  }
  userDetail(id: string) {
    this.router.navigate(['user-detail', id]);
  }
}
