import type { APIResponse } from '../../shared/types/api-response.type.js';
import type {
  GetVenuesQueryParams,
  GetVenuesResponse,
} from './contracts/get-venues.contract.js';

import type { Request, Response } from 'express-serve-static-core';
import { HTTP_STATUS_CODES } from '../../shared/constants/http-codes.js';
import { venueService } from './venue.service.js';

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
