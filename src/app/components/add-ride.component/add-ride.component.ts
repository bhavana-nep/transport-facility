import { Component } from '@angular/core';
import { Ride } from '../../models/ride.model';
import { RideService } from '../../services/ride.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-ride.component',
  imports: [FormsModule],
  templateUrl: './add-ride.component.html',
  styleUrl: './add-ride.component.css'
})
export class AddRideComponent {
 ride: Ride = {
    employeeId: '',
    vehicleType: 'Bike',
    vehicleNo: '',
    vacantSeats: 1,
    time: '',
    pickupPoint: '',
    destination: ''
  };

  message = '';

  constructor(private readonly rideService: RideService) {}

  onSubmit() {
    // Basic validation for current-day-only: we accept HH:mm only (UI time input)
    // If time is empty or malformed, service will reject.
    const res = this.rideService.addRide(this.ride);
    this.message = res.message;
    if (res.success) {
      // reset form
      this.ride = {
        employeeId: '',
        vehicleType: 'Bike',
        vehicleNo: '',
        vacantSeats: 1,
        time: '',
        pickupPoint: '',
        destination: ''
      };
    }
  }
}
