import type { APIResponse } from '~/src/shared/types/api-response.type';
import type {
  GetVenuesQueryParams,
  GetVenuesResponse,
} from './contracts/get-venues.contract';

import type { Request, Response } from 'express-serve-static-core';
import { HTTP_STATUS_CODES } from '~/src/shared/constants/http-codes';
import { venueService } from './venue.service';

export class VenueController {
  async getVenues(
    req: Request<{}, {}, {}, GetVenuesQueryParams>,
    res: Response<APIResponse<GetVenuesResponse>>,
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
