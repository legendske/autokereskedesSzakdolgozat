import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfilePageComponent } from './profile-page.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule, 
    ProfileRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    SharedModule,
  ],
})
export class ProfileModule {}
