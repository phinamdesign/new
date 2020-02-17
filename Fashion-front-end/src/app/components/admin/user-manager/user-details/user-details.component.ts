import { Component, OnInit } from '@angular/core';
import {Color} from '../../../../models/color';
import {ActivatedRoute, Router} from '@angular/router';
import {ColorService} from '../../../../services/color.service';
import {UserService} from '../../../../services/user.service';
import {User} from '../../../../models/User';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id: string;
  user: User;
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    // tslint:disable-next-line:new-parens
    this.user = new class implements User {
      address: string;
      avatar: string;
      email: string;
      id: string;
      name: string;
      password: string;
      phone: string;
      roles: { id?: string; name?: string };
      username: string;
    };
    this.id = this.route.snapshot.params.id;
    this.userService.getUser(this.id).subscribe(data => {console.log(data); this.user = data; }, error => console.log(error));
  }
  list() {
    this.router.navigate(['user']);
  }

}
