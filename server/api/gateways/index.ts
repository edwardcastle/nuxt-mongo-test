/**
 * /api/gateways
 * Get all gateways with it's peripheral device from database
 **/

import GatewayModel from '@/server/models/Gateway.model';

export default defineEventHandler(() => GatewayModel.find());
