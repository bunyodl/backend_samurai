import { mapEventRowToDto } from '@/modules/event/helpers/map-event-row';
import type { GetEventsQuery } from '@/modules/event/schemas/endpoints/get-events.schema';
import type { EventDto } from '@/modules/event/schemas/resources/event.schema';
import type { EventRow } from '@/modules/event/types/event-row.type';

import { fetchFromDb } from '@/shared/libs/fetch-from-db';
import { readSqlQuery } from '@/shared/libs/read-sql-query';

const EVENT_SORT_COLUMNS = {
  title: 'title',
  description: 'description',
  date: 'date',
  createdAt: 'created_at',
} as const;

class EventsRepository {
  async getEvents(params: GetEventsQuery): Promise<Array<EventDto>> {
    const sortColumn =
      EVENT_SORT_COLUMNS[params.sortBy ?? 'date'] ?? EVENT_SORT_COLUMNS.date;
    const sortOrder = params.sort?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    let query: string;

    if (params.search) {
      query = `
        SELECT * FROM events
        WHERE title ILIKE $1
        OR description ILIKE $1
        OR EXISTS (
          SELECT 1
          FROM unnest(tags) AS tag
          WHERE tag ILIKE $1
        )
        ORDER BY ${sortColumn} ${sortOrder}
        LIMIT $2 OFFSET $3
        `;
    } else {
      query = `
        SELECT * FROM events
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

    const rows = await fetchFromDb<Array<EventRow>>(query, queryParams);
    return rows.map(mapEventRowToDto);
  }

  async getEventsCount(search?: string): Promise<number> {
    let query: string;

    if (!search) {
      query = `
      SELECT COUNT(*) FROM events
      `;
    } else {
      query = await readSqlQuery(
        './queries/get-events-count.sql',
        import.meta.url,
      );
    }

    const result = await fetchFromDb<Array<{ count: string }>>(
      query,
      search ? [`%${search}%`] : undefined,
    );

    return Number(result[0]?.count ?? 0);
  }

  async findEventById(eventId: string): Promise<EventDto | null> {
    const rows = await fetchFromDb<Array<EventRow>>(
      `
        SELECT * FROM events
        WHERE id = $1
        `,
      [eventId],
    );

    const row = rows[0];
    return row ? mapEventRowToDto(row) : null;
  }
}

export const eventsRepository = new EventsRepository();
