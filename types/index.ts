/** Interfaces **/

// Peripheral device interface
export interface PeripheralDevicesType {
  uid: number | null;
  vendor: string | null;
  status: boolean | null;
  createdDate: string;
}

// Gateway interface
export interface GatewayType {
  _id?: string;
  serialNumber: string;
  name: string;
  ipv4: string;
  peripheralDevices: PeripheralDevicesType[];
}
