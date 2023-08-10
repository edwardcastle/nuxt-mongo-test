/**
 * /api/gateways/id
 * Update a gateway
 **/

import { H3Event } from 'h3';
import GatewayModel from '@/server/models/Gateway.model';
import { GatewaySchema } from '~/server/validation';

export default defineEventHandler(async (event: H3Event) => {
  // Get data from body
  const body: any = await readBody(event);
  // Get id from params
  const id: string | undefined = event?.context?.params?.id;

  // Validate body
  const { error } = GatewaySchema.validate(body, {
    abortEarly: true,
    allowUnknown: true,
  });
  if (error) {
    throw createError({
      message: error.message,
      statusCode: 400,
      fatal: false,
    });
  }

  // Update Gateway
  try {
    await GatewayModel.findByIdAndUpdate(id, body);
    return { message: 'Gateway updated' };
  } catch (e: any) {
    throw createError({ message: e.message });
  }
});
