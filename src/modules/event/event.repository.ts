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

  async getById(eventId: string): Promise<EventRow | null> {
    const rows = await fetchFromDb<Array<EventRow>>(
      `
        SELECT * FROM events
        WHERE id = $1
        `,
      [eventId],
    );

    return rows[0] ?? null;
  }

  async create(body: CreateEventRequestBody): Promise<EventRow> {
    const query = await readSqlQuery(
      './queries/create-event.sql',
      import.meta.url,
    );

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
    const query = await readSqlQuery(
      './queries/patch-event.sql',
      import.meta.url,
    );
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
    const query = await readSqlQuery(
      './queries/delete-event.sql',
      import.meta.url,
    );
    const rows = await fetchFromDb<Array<EventRow>>(query, [eventId]);

    return rows[0] ?? null;
  }
}
export const eventRepository = new EventRepository();
