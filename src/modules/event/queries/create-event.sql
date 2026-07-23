INSERT INTO events (title, description, type, status, venue_id, organizer_id, date, tags)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;
