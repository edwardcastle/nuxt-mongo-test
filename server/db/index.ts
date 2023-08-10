/**
 * Setting up the connection to the database,
 * First a MONGO_URI variable should be defined on .env file
 * **/

import mongoose from 'mongoose';
import { NitroApp } from 'nitropack';
export default async (_nitroApp: NitroApp): Promise<void> => {
  const config = useRuntimeConfig();
  await mongoose
    .connect(config.MONGO_URI)
    .then(() => console.log('CONNECTED TO DATABASE'))
    .catch((error: Error) => console.log(error));
};
