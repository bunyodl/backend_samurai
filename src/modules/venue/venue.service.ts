import type { CreateVenueRequestBody } from '@/modules/venue/schemas/endpoints/create-venue.schema';
import type { GetVenueResponse } from '@/modules/venue/schemas/endpoints/get-venue.schema';
import type {
  GetVenuesQuery,
  GetVenuesResponse,
} from '@/modules/venue/schemas/endpoints/get-venues.schema';
import type { PatchVenueRequestBody } from '@/modules/venue/schemas/endpoints/patch-venue.schema';
import type { VenueDto } from '@/modules/venue/schemas/resources/venue.schema';

import { ConflictException, NotFoundException } from '@/common/exceptions';

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

  async create(body: CreateVenueRequestBody): Promise<VenueDto> {
    const venueRow = await venueRepository.create(body);
    return mapVenueRowToDto(venueRow);
  }

  async patch(
    venueId: string,
    body: PatchVenueRequestBody,
  ): Promise<VenueDto> {
    const venueRow = await venueRepository.patch(venueId, body);

    if (!venueRow) {
      throw new NotFoundException('Venue not found');
    }

    return mapVenueRowToDto(venueRow);
  }

  async delete(venueId: string): Promise<VenueDto> {
    if (await venueRepository.existsEventsForVenue(venueId)) {
      throw new ConflictException('Cannot delete venue with existing events');
    }

    const venueRow = await venueRepository.delete(venueId);

    if (!venueRow) {
      throw new NotFoundException('Venue not found');
    }

    return mapVenueRowToDto(venueRow);
  }
}

export const venueService = new VenueService();
