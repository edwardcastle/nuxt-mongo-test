/**
 * /api/gateways/id
 * Delete a gateway
 **/

import { H3Event } from 'h3';
import GatewayModel from '~/server/models/Gateway.model';

export default defineEventHandler(async (event: H3Event) => {
  // Get id from params
  const id: string | undefined = event?.context?.params?.id;

  // Remove Gateway from db
  try {
    await GatewayModel.findByIdAndDelete(id);
    return { message: 'Gateway deleted' };
  } catch (e: any) {
    throw createError({ message: e.message });
  }
});
