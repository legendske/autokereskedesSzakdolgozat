import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'advertisement',
  templateUrl: './advertisement-page.component.html',
})
export class AdvertisementPageComponent {
  constructor(private userService: UserService) {}

  get user() {
    return this.userService.user;
  }
}
