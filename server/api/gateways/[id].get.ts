/**
 * /api/gateways/id
 * Get a gateway
 **/

import { H3Event } from 'h3';
import GatewayModel from '~/server/models/Gateway.model';

export default defineEventHandler(async (event: H3Event) => {
  // Get id from params
  const id: string | undefined = event?.context?.params?.id;

  // Get Gateway from db
  try {
    return await GatewayModel.findById(id);
  } catch (e: any) {
    throw createError({ message: e.message });
  }
});
