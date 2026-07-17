import type { Request, Response } from 'express-serve-static-core';

import type {
  GetVenuesQuery,
  GetVenuesResponse,
} from '@/modules/venue/schemas/endpoints/get-venues.schema';
import { venueService } from '@/modules/venue/venue.service';

import { HTTP_STATUS } from '@/shared/constants/http-codes';
import type { ApiResponse } from '@/shared/types/api-response.type';

export class VenueController {
  async getMany(
    req: Request<{}, {}, {}, GetVenuesQuery>,
    res: Response<ApiResponse<GetVenuesResponse>>,
  ) {
    const responseData = await venueService.getMany(req.query);

    return res.status(HTTP_STATUS.OK).json({
      code: HTTP_STATUS.OK,
      message: 'Venues fetched successfully',
      data: responseData,
      timestamp: Date.now(),
    });
  }
}

export const venueController = new VenueController();
