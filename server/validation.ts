// @ts-ignore
import Joi from 'joi';

// Gateway schema validation
export const GatewaySchema = Joi.object({
  serialNumber: Joi.string().required(),
  name: Joi.string().required(),
  ipv4: Joi.string().required(),
  peripheralDevices: Joi.array(),
});
