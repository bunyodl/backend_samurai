import { NotImplementedException } from '@/common/exceptions/not-implemented.exception';
import { fetchFromDb } from '@/common/libs/fetch-from-db';
import { readSqlQuery } from '@/common/libs/read-sql-query';

import type { CreateVenueRequestBody } from './schemas/endpoints/create-venue.schema';
import type { GetVenuesQuery } from './schemas/endpoints/get-venues.schema';
import type { PatchVenueRequestBody } from './schemas/endpoints/patch-venue.schema';
import type { VenueRow } from './types/venue-row.type';

const VENUE_SORT_COLUMNS = {
  name: 'name',
  capacity: 'capacity',
  location: 'location',
  createdAt: 'created_at',
} satisfies Record<NonNullable<GetVenuesQuery['sortBy']>, keyof VenueRow>;

class VenueRepository {
  async getMany(params: GetVenuesQuery): Promise<Array<VenueRow>> {
    const sortColumn =
      VENUE_SORT_COLUMNS[params.sortBy ?? 'createdAt'] ??
      VENUE_SORT_COLUMNS.createdAt;
    const sortOrder = params.sort?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    let query: string;

    if (params.search) {
      query = `
        SELECT * FROM venues
        WHERE name ILIKE $1
        OR location ILIKE $1
        ORDER BY ${sortColumn} ${sortOrder}
        LIMIT $2 OFFSET $3
        `;
    } else {
      query = `
        SELECT * FROM venues
        ORDER BY ${sortColumn} ${sortOrder}
        LIMIT $1 OFFSET $2
        `;
    }

    const queryParams = params.search
      ? [
          `%${params.search}%`,
          params.limit ?? 10,
          ((params.page ?? 1) - 1) * (params.limit ?? 10),
        ]
      : [params.limit ?? 10, ((params.page ?? 1) - 1) * (params.limit ?? 10)];

    return fetchFromDb<Array<VenueRow>>(query, queryParams);
  }

  async getTotalCount(search?: string): Promise<number> {
    let query: string;

    if (!search) {
      query = `
      SELECT COUNT(*) FROM venues
      `;
    } else {
      query = await readSqlQuery(
        './queries/get-venues-count.sql',
        import.meta.url,
      );
    }

    const result = await fetchFromDb<Array<{ count: string }>>(
      query,
      search ? [`%${search}%`] : undefined,
    );

    return Number(result[0]?.count ?? 0);
  }

  async getById(venueId: string): Promise<VenueRow | null> {
    const rows = await fetchFromDb<Array<VenueRow>>(
      `
        SELECT * FROM venues
        WHERE id = $1
        `,
      [venueId],
    );

    return rows[0] ?? null;
  }

  async create(_body: CreateVenueRequestBody): Promise<VenueRow> {
    // TODO(you): implement
    throw new NotImplementedException(
      'VenueRepository.create is not implemented',
    );
  }

  async patch(
    _venueId: string,
    _body: PatchVenueRequestBody,
  ): Promise<VenueRow> {
    // TODO(you): implement
    throw new NotImplementedException(
      'VenueRepository.patch is not implemented',
    );
  }

  async delete(_venueId: string): Promise<VenueRow> {
    // TODO(you): implement
    throw new NotImplementedException(
      'VenueRepository.delete is not implemented',
    );
  }
}

export const venueRepository = new VenueRepository();
