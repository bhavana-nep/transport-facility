import { RouterModule, Routes } from '@angular/router';
import { AddRideComponent } from './components/add-ride.component/add-ride.component';
import { PickRideComponent } from './components/pick-ride.component/pick-ride.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: '/add-ride', pathMatch: 'full' },
  { path: 'add-ride', component: AddRideComponent },
  { path: 'pick-ride', component: PickRideComponent },
  { path: '**', redirectTo: '/add-ride' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
