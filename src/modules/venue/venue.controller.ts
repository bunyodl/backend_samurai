import type { Request, Response } from 'express-serve-static-core';

import type {
  GetVenuesQuery,
  GetVenuesResponse,
} from '@/modules/venue/schemas/endpoints/get-venues.schema';
import { venueService } from '@/modules/venue/venue.service';

import { sendSuccess } from '@/common/libs/send-success';
import type { ApiResponse } from '@/common/types/api-response.type';

export class VenueController {
  async getMany(
    req: Request<{}, {}, {}, GetVenuesQuery>,
    res: Response<ApiResponse<GetVenuesResponse>>,
  ) {
    const data = await venueService.getMany(req.query);
    return sendSuccess(res, { data });
  }
}

export const venueController = new VenueController();
