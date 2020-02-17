import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-slide-show',
  templateUrl: './top-slide-show.component.html',
  styleUrls: ['./top-slide-show.component.css']
})
export class TopSlideShowComponent implements OnInit {

  info: any;

  constructor(private token: TokenStorageService, private router: Router) {
  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }
}
