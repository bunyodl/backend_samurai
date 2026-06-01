import type { ApiResponse } from '@/shared/types/api-response.type';
import type {
  GetVenuesQueryParams,
  GetVenuesResponse,
} from '@/modules/venue/contracts/get-venues.contract';

import type { Request, Response } from 'express-serve-static-core';
import { HTTP_STATUS_CODES } from '@/shared/constants/http-codes';
import { venueService } from '@/modules/venue/venue.service';

export class VenueController {
  async getVenues(
    req: Request<{}, {}, {}, GetVenuesQueryParams>,
    res: Response<ApiResponse<GetVenuesResponse>>,
  ) {
    const responseData = await venueService.getVenues(req.query);

    return res.status(HTTP_STATUS_CODES.OK).json({
      code: HTTP_STATUS_CODES.OK,
      message: 'Venues fetched successfully',
      data: responseData,
      timestamp: Date.now(),
    });
  }
}

export const venueController = new VenueController();
