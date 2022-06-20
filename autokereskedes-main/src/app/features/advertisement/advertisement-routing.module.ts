import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementPageComponent } from './advertisement-page.component';

const routes: Routes = [{ path: 'advertisement', component: AdvertisementPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertisementRoutingModule {}