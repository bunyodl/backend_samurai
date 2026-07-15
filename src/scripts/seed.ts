import 'dotenv/config';
import { readFile } from 'node:fs/promises';

import type { EventDto } from '@/modules/event/schemas/resources/event.schema';
import type { UserDto } from '@/modules/user/schemas/resources/user.schema';
import type { VenueDto } from '@/modules/venue/schemas/resources/venue.schema';

import { pool } from '@/db/pool';

import { resolvePath } from '@/shared/libs/resolve-path';

/** Placeholder hash for local seed data only. */
const SEED_PASSWORD_HASH =
  '$2b$10$seededplaceholderhashnotforproductionuse1234567890';

async function loadJson<T>(relativePath: string): Promise<T[]> {
  const content = await readFile(resolvePath(relativePath), 'utf-8');
  return JSON.parse(content) as T[];
}

async function seed(): Promise<void> {
  const [users, venues, events] = await Promise.all([
    loadJson<UserDto>('./db/users.json'),
    loadJson<VenueDto>('./db/venues.json'),
    loadJson<EventDto>('./db/events.json'),
  ]);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query(
      'TRUNCATE event_attendees, events, venues, users CASCADE',
    );

    for (const user of users) {
      await client.query(
        `INSERT INTO users (
           id, first_name, last_name, email, image_url, role, password_hash, created_at, updated_at
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          user.id,
          user.firstName,
          user.lastName,
          user.email,
          user.imageUrl,
          user.role,
          SEED_PASSWORD_HASH,
          user.createdAt,
          user.updatedAt,
        ],
      );
    }

    for (const venue of venues) {
      await client.query(
        `INSERT INTO venues (
           id, name, location, timezone, capacity, created_at, updated_at
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          venue.id,
          venue.name,
          venue.location,
          venue.timezone,
          venue.capacity,
          venue.createdAt,
          venue.updatedAt,
        ],
      );
    }

    for (const event of events) {
      await client.query(
        `INSERT INTO events (
           id, title, description, type, status, venue_id, organizer_id,
           date, tags, created_at, updated_at
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          event.id,
          event.title,
          event.description,
          event.type,
          event.status,
          event.venueId,
          event.organizerId,
          event.date,
          event.tags,
          event.createdAt,
          event.updatedAt,
        ],
      );
    }

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
