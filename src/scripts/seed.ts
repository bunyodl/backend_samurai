import 'dotenv/config';

import { readFile } from 'node:fs/promises';
import type { PoolClient } from 'pg';
import { pool } from '@/db/pool';
import type { EventApiModel } from '@/modules/event/types/event.type';
import type { User } from '@/modules/user/types/user.type';
import type { Venue } from '@/modules/venue/types/venue.type';
import { resolvePath } from '@/shared/libs/resolve-path';

async function loadJson<T>(relativePath: string): Promise<T[]> {
  const content = await readFile(resolvePath(relativePath), 'utf-8');
  return JSON.parse(content) as T[];
}

async function resetSequence(client: PoolClient, table: string): Promise<void> {
  await client.query(
    `SELECT setval(
      pg_get_serial_sequence($1, 'id'),
      COALESCE((SELECT MAX(id) FROM ${table}), 1)
    )`,
    [table],
  );
}

async function seed(): Promise<void> {
  const [users, venues, events] = await Promise.all([
    loadJson<User>('./db/users.json'),
    loadJson<Venue>('./db/venues.json'),
    loadJson<EventApiModel>('./db/events.json'),
  ]);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query(
      'TRUNCATE events, venues, users RESTART IDENTITY CASCADE',
    );

    for (const user of users) {
      await client.query(
        `INSERT INTO users (id, name, email, role)
         OVERRIDING SYSTEM VALUE
         VALUES ($1, $2, $3, $4)`,
        [user.id, user.name, user.email, user.role],
      );
    }

    for (const venue of venues) {
      await client.query(
        `INSERT INTO venues (id, name, location, capacity)
         OVERRIDING SYSTEM VALUE
         VALUES ($1, $2, $3, $4)`,
        [venue.id, venue.name, JSON.stringify(venue.location), venue.capacity],
      );
    }

    for (const event of events) {
      await client.query(
        `INSERT INTO events (
           id, title, description, venue_id, organizer_id, date, tags, price
         )
         OVERRIDING SYSTEM VALUE
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          event.id,
          event.title,
          event.description,
          event.venueId,
          event.organizerId,
          event.date,
          event.tags,
          event.price,
        ],
      );
    }

    await resetSequence(client, 'users');
    await resetSequence(client, 'venues');
    await resetSequence(client, 'events');

    await client.query('COMMIT');

    process.stdout.write(
      `Seeded ${users.length} users, ${venues.length} venues, ${events.length} events\n`,
    );
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

async function main(): Promise<void> {
  try {
    await seed();
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

void main();
