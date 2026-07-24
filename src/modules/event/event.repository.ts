import type { CreateEventRequestBody } from '@/modules/event/schemas/endpoints/create-event.schema';
import type { GetEventsQuery } from '@/modules/event/schemas/endpoints/get-events.schema';
import type { PatchEventRequestBody } from '@/modules/event/schemas/endpoints/patch-event.schema';
import type { EventRow } from '@/modules/event/types/event-row.type';

import { fetchFromDb } from '@/common/libs/fetch-from-db';
import { readSqlQuery } from '@/common/libs/read-sql-query';

const EVENT_SORT_COLUMNS = {
  title: 'title',
  description: 'description',
  date: 'date',
  createdAt: 'created_at',
} satisfies Record<NonNullable<GetEventsQuery['sortBy']>, keyof EventRow>;

async function readSql(path: string) {
  return await readSqlQuery(path, import.meta.url);
}

class EventRepository {
  async getMany(params: GetEventsQuery): Promise<Array<EventRow>> {
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

    return fetchFromDb<Array<EventRow>>(query, queryParams);
  }

  async getTotalCount(search?: string): Promise<number> {
    const query = search
      ? await readSql('./queries/get-events-count-by-search.sql')
      : await readSql('./queries/get-events-count.sql');

    const result = await fetchFromDb<Array<{ count: string }>>(
      query,
      search ? [`%${search}%`] : undefined,
    );

    return Number(result[0]?.count ?? 0);
  }

  async getById(eventId: string): Promise<EventRow | null> {
    const query = await readSql('./queries/get-event-by-id.sql');
    const rows = await fetchFromDb<Array<EventRow>>(query, [eventId]);

    return rows[0] ?? null;
  }

  async create(body: CreateEventRequestBody): Promise<EventRow> {
    const query = await readSql('./queries/create-event.sql');

    const rows = await fetchFromDb<Array<EventRow>>(query, [
      body.title,
      body.description,
      body.type,
      body.status,
      body.venueId,
      body.organizerId,
      body.date,
      body.tags,
    ]);

    return rows[0]!;
  }

  async patch(
    eventId: string,
    body: PatchEventRequestBody,
  ): Promise<EventRow | null> {
    const query = await readSql('./queries/patch-event.sql');
    const rows = await fetchFromDb<Array<EventRow>>(query, [
      eventId,
      body.title,
      body.description,
      body.type,
      body.status,
      body.venueId,
      body.date,
      body.tags,
    ]);

    return rows[0] ?? null;
  }

  async delete(eventId: string): Promise<EventRow | null> {
    const query = await readSql('./queries/delete-event.sql');
    const rows = await fetchFromDb<Array<EventRow>>(query, [eventId]);

    return rows[0] ?? null;
  }
}
export const eventRepository = new EventRepository();
