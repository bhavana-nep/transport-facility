import { Injectable } from '@angular/core';
import { Ride } from '../models/ride.model';

@Injectable({ providedIn: 'root' })
export class RideService {
  private rides: Ride[] = [];

  // Return shallow copy so consumers don't accidentally mutate internal array
  getRides(): Ride[] {
    return this.rides.slice();
  }

  // Add a ride - owner employeeId must be unique among owners
  addRide(newRide: Ride): { success: boolean; message: string } {
    if (this.rides.some(r => r.employeeId === newRide.employeeId)) {
      return { success: false, message: 'Employee ID already has an active ride (owner must be unique).' };
    }

    // ensure required fields are present (extra guard)
    if (!newRide.employeeId || !newRide.vehicleNo || !newRide.vacantSeats || !newRide.time || !newRide.pickupPoint || !newRide.destination) {
      return { success: false, message: 'All mandatory fields must be filled.' };
    }

    // store with empty bookedEmployees array
    this.rides.push({ ...newRide, bookedEmployees: [] });
    return { success: true, message: 'Ride added.' };
  }

  // Book a ride by index (index must come from current view). Enforces rules:
  // - cannot book own ride
  // - cannot book twice
  // - vacant seats > 0
  bookRide(rideIndex: number, employeeId: string): { success: boolean; message: string } {
    const ride = this.rides[rideIndex];
    if (!ride) return { success: false, message: 'Ride not found.' };

    if (!employeeId) return { success: false, message: 'Employee ID is required to book.' };

    if (ride.employeeId === employeeId) {
      return { success: false, message: 'You cannot book your own ride.' };
    }

    if (ride.bookedEmployees?.includes(employeeId)) {
      return { success: false, message: 'You have already booked this ride.' };
    }

    if (ride.vacantSeats <= 0) {
      return { success: false, message: 'No vacant seats.' };
    }

    ride.vacantSeats -= 1;
    ride.bookedEmployees!.push(employeeId);
    return { success: true, message: 'Ride booked successfully.' };
  }
}
