import { H3Event } from 'h3';
import GatewayModel from '@/server/models/Gateway.model';
import { GatewaySchema } from '~/server/validation';

export default defineEventHandler(async (event: H3Event) => {
  // Get data from body
  const body = await readBody(event);

  // Validate body
  const { error } = GatewaySchema.validate(body);
  if (error) {
    throw createError({
      message: error.message,
      statusCode: 400,
      fatal: false,
    });
  }
  // Create Gateway
  try {
    const object: { _id: string } | null = await GatewayModel.exists({
      serialNumber: body.serialNumber,
    });
    if (!object) {
      await GatewayModel.create(body);
      return { message: 'Gateway created' };
    }
    return { message: 'Already exist' };
  } catch (e: any) {
    throw createError({
      message: e.message,
    });
  }
});
