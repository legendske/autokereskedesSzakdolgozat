import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule, 
    HomeRoutingModule, 
    SharedModule,
  ],
})
export class HomeModule {}
