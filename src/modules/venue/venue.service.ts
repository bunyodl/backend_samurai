import { mockFetch } from '@/shared/libs/mock-fetch';
import type {
  GetVenuesQueryParams,
  GetVenuesResponse,
} from '@/modules/venue/contracts/get-venues.contract';
import { paginateVenues } from '@/modules/venue/helpers/paginate-venues';
import { searchVenues } from '@/modules/venue/helpers/search-venues';
import { sortVenues } from '@/modules/venue/helpers/sort-venues';
import type { Venue } from '@/modules/venue/types/venue.type';

class VenueService {
  async getVenues(params: GetVenuesQueryParams): Promise<GetVenuesResponse> {
    const { page, limit, sortBy, sort, search } = params;

    const result = await mockFetch('./db/venues.json');
    const venuesData = JSON.parse(result) as Array<Venue>;

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
