import { mockFetch } from '~/src/shared/libs/mock-fetch';
import type {
  GetVenuesQueryParams,
  GetVenuesResponse,
} from './contracts/get-venues.contract';
import { paginateVenues } from './helpers/paginate-venues';
import { searchVenues } from './helpers/search-venues';
import { sortVenues } from './helpers/sort-venues';
import type { Venue } from './types/venue.type';

class VenueService {
  async getVenues(params: GetVenuesQueryParams): Promise<GetVenuesResponse> {
    const { page, limit, sortBy, order, search } = params;

    const result = await mockFetch('~/db/venues.json');
    const venuesData = JSON.parse(result) as Array<Venue>;

    const filteredVenues = searchVenues(venuesData, search);
    const sortedVenues = sortVenues(filteredVenues, sortBy, order);
    const paginatedVenues = paginateVenues(sortedVenues, page, limit);

    return {
      venues: paginatedVenues,
      venuesCount: filteredVenues.length,
    };
  }
}

export const venueService = new VenueService();
