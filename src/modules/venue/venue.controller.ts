import type { Request, Response } from 'express-serve-static-core';

import type { CreateVenueRequestBody } from '@/modules/venue/schemas/endpoints/create-venue.schema';
import type { DeleteVenueResponse } from '@/modules/venue/schemas/endpoints/delete-venue.schema';
import type {
  GetVenueParams,
  GetVenueResponse,
} from '@/modules/venue/schemas/endpoints/get-venue.schema';
import type {
  GetVenuesQuery,
  GetVenuesResponse,
} from '@/modules/venue/schemas/endpoints/get-venues.schema';
import type {
  PatchVenueParams,
  PatchVenueRequestBody,
  PatchVenueResponse,
} from '@/modules/venue/schemas/endpoints/patch-venue.schema';
import { venueService } from '@/modules/venue/venue.service';

import { HTTP_STATUS } from '@/common/constants/http-codes';
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

  async getById(
    req: Request<GetVenueParams>,
    res: Response<ApiResponse<GetVenueResponse>>,
  ) {
    const data = await venueService.getById(req.params.venueId);
    return sendSuccess(res, { data });
  }

  async create(
    req: Request<{}, {}, CreateVenueRequestBody>,
    res: Response<ApiResponse<GetVenueResponse>>,
  ) {
    const createdVenue = await venueService.create(req.body);

    return sendSuccess(res, {
      data: { venue: createdVenue },
      code: HTTP_STATUS.CREATED,
    });
  }

  async patch(
    req: Request<PatchVenueParams, {}, PatchVenueRequestBody>,
    res: Response<ApiResponse<PatchVenueResponse>>,
  ) {
    const updatedVenue = await venueService.patch(req.params.venueId, req.body);

    return sendSuccess(res, { data: { updatedVenue } });
  }

  async delete(
    req: Request<GetVenueParams>,
    res: Response<ApiResponse<DeleteVenueResponse>>,
  ) {
    const deletedVenue = await venueService.delete(req.params.venueId);
    return sendSuccess(res, { data: { deletedVenue } });
  }
}

export const venueController = new VenueController();
