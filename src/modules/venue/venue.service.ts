import type {
  GetVenuesQuery,
  GetVenuesResponse,
} from '@/modules/venue/schemas/endpoints/get-venues.schema';

import { venueRepository } from './venue.repository';

class VenueService {
  async getMany(params: GetVenuesQuery): Promise<GetVenuesResponse> {
    const [venues, venuesCount] = await Promise.all([
      venueRepository.getMany(params),
      venueRepository.getTotalCount(params.search),
    ]);

    return { venues, venuesCount };
  }
}

export const venueService = new VenueService();
