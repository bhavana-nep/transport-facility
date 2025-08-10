import { Component, NgModule, OnInit } from '@angular/core';
import { RideService } from '../../services/ride.service';
import { Ride } from '../../models/ride.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pick-ride.component',
  imports: [NgFor,FormsModule,NgIf],
  templateUrl: './pick-ride.component.html',
  styleUrl: './pick-ride.component.css'
})
export class PickRideComponent implements OnInit {
  rides: Ride[] = [];
  bookingEmployeeId = '';
  filterVehicle = '';
  filterTime = '';
  message = '';

  constructor(private readonly rideService: RideService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.rides = this.rideService.getRides();
  }

  onBook(index: number) {
    if (!this.bookingEmployeeId) {
      this.message = 'Enter your Employee ID to book.';
      return;
    }
    const res = this.rideService.bookRide(index, this.bookingEmployeeId);
    this.message = res.message;
    this.refresh();
  }

  getFiltered(): Ride[] {
    return this.rides.filter(r => {
      let ok = true;
      if (this.filterVehicle) ok = ok && r.vehicleType === this.filterVehicle;
      if (this.filterTime) ok = ok && this.isWithin60(r.time, this.filterTime);
      return ok;
    });
  }

  private isWithin60(t1: string, t2: string): boolean {
    if (!t1 || !t2) return false;
    const toDate = (s: string) => {
      const [h, m] = s.split(':').map(Number);
      const d = new Date();
      d.setHours(h, m, 0, 0);
      return d.getTime();
    };
    const diffMin = Math.abs((toDate(t1) - toDate(t2)) / 60000);
    return diffMin <= 60;
  }
}