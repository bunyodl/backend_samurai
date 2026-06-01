import { fetchFromDb } from '@/shared/libs/fetch-from-db';
import { readSqlQuery } from '@/shared/libs/read-sql-query';
import type { GetEventsQueryParams } from '@/modules/event/contracts/get-events.contract';
import type { EventApiModel } from '@/modules/event/types/event.type';

class EventsRepository {
  async getEvents(params: GetEventsQueryParams): Promise<Array<EventApiModel>> {
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
        ORDER BY ${params.sortBy ?? 'id'} ${params.sort?.toUpperCase() ?? 'ASC'}
        LIMIT $2 OFFSET $3
        `;
    } else {
      query = `
        SELECT * FROM events
        ORDER BY ${params.sortBy ?? 'id'} ${params.sort?.toUpperCase() ?? 'ASC'}
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

    return await fetchFromDb<Array<EventApiModel>>(query, queryParams);
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

    const result = await fetchFromDb(
      query,
      search ? [`%${search}%`] : undefined,
    );

    return Number(result?.[0].count);
  }

  async findEventById(eventId: number): Promise<EventApiModel | null> {
    const result = await fetchFromDb<EventApiModel | null>(
      `
        SELECT * FROM events
        WHERE id = $1
        `,
      [eventId],
    );

    return result ?? null;
  }
}

export const eventsRepository = new EventsRepository();
