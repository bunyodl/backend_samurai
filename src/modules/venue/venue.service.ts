import { mockFetch } from '../../shared/libs/mock-fetch.js';
import type {
  GetVenuesQueryParams,
  GetVenuesResponse,
} from './contracts/get-venues.contract.js';
import { paginateVenues } from './helpers/paginate-venues.js';
import { searchVenues } from './helpers/search-venues.js';
import { sortVenues } from './helpers/sort-venues.js';
import type { Venue } from './types/venue.type.js';

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
