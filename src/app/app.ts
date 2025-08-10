import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    title = 'Hello, transport_facility ';

  constructor(private readonly router:Router){}
  
  goToAddRide(){
  this.router.navigate(['/add']);
  }

 goToPickRide() {
  this.router.navigate(['/pick-ride']);
 }
}
