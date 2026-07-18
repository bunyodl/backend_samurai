import type { CreateVenueRequestBody } from '@/modules/venue/schemas/endpoints/create-venue.schema';
import type { GetVenueResponse } from '@/modules/venue/schemas/endpoints/get-venue.schema';
import type {
  GetVenuesQuery,
  GetVenuesResponse,
} from '@/modules/venue/schemas/endpoints/get-venues.schema';
import type { PatchVenueRequestBody } from '@/modules/venue/schemas/endpoints/patch-venue.schema';
import type { VenueDto } from '@/modules/venue/schemas/resources/venue.schema';

import { NotFoundException } from '@/common/exceptions';
import { NotImplementedException } from '@/common/exceptions/not-implemented.exception';

import { mapVenueRowToDto } from './helpers/map-venue-row';
import { venueRepository } from './venue.repository';

class VenueService {
  async getMany(params: GetVenuesQuery): Promise<GetVenuesResponse> {
    const [venueRows, venuesCount] = await Promise.all([
      venueRepository.getMany(params),
      venueRepository.getTotalCount(params.search),
    ]);

    const venues = venueRows.map(mapVenueRowToDto);
    return { venues, venuesCount };
  }

  async getById(venueId: string): Promise<GetVenueResponse> {
    const venueRow = await venueRepository.getById(venueId);

    if (!venueRow) {
      throw new NotFoundException('Venue not found');
    }

    return { venue: mapVenueRowToDto(venueRow) };
  }

  async create(_body: CreateVenueRequestBody): Promise<VenueDto> {
    // TODO(you): implement
    throw new NotImplementedException('VenueService.create is not implemented');
  }

  async patch(
    _venueId: string,
    _body: PatchVenueRequestBody,
  ): Promise<VenueDto> {
    // TODO(you): implement
    throw new NotImplementedException('VenueService.patch is not implemented');
  }

  async delete(_venueId: string): Promise<VenueDto> {
    // TODO(you): implement
    throw new NotImplementedException('VenueService.delete is not implemented');
  }
}

export const venueService = new VenueService();
