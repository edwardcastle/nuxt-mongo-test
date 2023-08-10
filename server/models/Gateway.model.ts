/**
 * Getaway model:
 * - unique serial number (string);
 * - human-readable name (string);
 * - IPv4 address (to be validated);
 * - multiple associated peripheral devices;
 * **/

import mongoose from 'mongoose';

// Gateway schema
const schema: mongoose.Schema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    ipv4: {
      type: String,
      required: true,
    },
    peripheralDevices: [],
  },
  { timestamps: true },
);

export default mongoose.model('Gateway', schema);
