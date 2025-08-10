export interface Ride {
  employeeId: string;               // owner of ride
  vehicleType: 'Bike' | 'Car';
  vehicleNo: string;
  vacantSeats: number;
  time: string;                     // HH:mm (today)
  pickupPoint: string;
  destination: string;
  bookedEmployees?: string[];       // employee IDs who booked
}
