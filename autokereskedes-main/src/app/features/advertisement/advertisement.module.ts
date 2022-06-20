import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdvertisementPageComponent } from './advertisement-page.component';
import { AdvertisementRoutingModule } from './advertisement-routing.module';

@NgModule({
  declarations: [AdvertisementPageComponent],
  imports: [CommonModule, SharedModule, AdvertisementRoutingModule],
})
export class AdvertisementModule {}
