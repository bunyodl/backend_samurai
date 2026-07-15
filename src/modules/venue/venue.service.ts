import { paginateVenues } from '@/modules/venue/helpers/paginate-venues';
import { searchVenues } from '@/modules/venue/helpers/search-venues';
import { sortVenues } from '@/modules/venue/helpers/sort-venues';
import type {
  GetVenuesQuery,
  GetVenuesResponse,
} from '@/modules/venue/schemas/endpoints/get-venues.schema';
import type { VenueDto } from '@/modules/venue/schemas/resources/venue.schema';

import { mockFetch } from '@/shared/libs/mock-fetch';

class VenueService {
  async getVenues(params: GetVenuesQuery): Promise<GetVenuesResponse> {
    const { page, limit, sortBy, sort, search } = params;

    const result = await mockFetch('./db/venues.json');
    const venuesData = JSON.parse(result) as Array<VenueDto>;

    const filteredVenues = searchVenues(venuesData, search);
    const sortedVenues = sortVenues(filteredVenues, sortBy, sort);
    const paginatedVenues = paginateVenues(sortedVenues, page, limit);

    return {
      venues: paginatedVenues,
      venuesCount: filteredVenues.length,
    };
  }
}

export const venueService = new VenueService();
