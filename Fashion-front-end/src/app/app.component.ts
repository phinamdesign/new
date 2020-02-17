import {Component, HostListener, OnInit} from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;
  isShow = false;
  topPosToStartShowing = 200;
  isShowBt: boolean;
  isLoggedIn = false;
  isAdminRole = false;
  username: string;
  info: { name: string; avatar: string; userId: string; authorities: string[]; token: string; username: string };
  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.gotoTop();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
    this.info = {
      name: this.tokenStorage.getName(),
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      authorities: this.tokenStorage.getAuthorities(),
      userId: this.tokenStorage.getUserId(),
      avatar: this.tokenStorage.getAvatar()
    };
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.roles = this.info.authorities;

      this.isAdminRole = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }
  }
  setIsShow(isShow: boolean) {
    this.isShow = isShow;
  }

  // logout() {
  //   this.tokenStorageService.signOut();
  //   window.location.reload();
  // }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShowBt = true;
    } else {
      this.isShowBt = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
