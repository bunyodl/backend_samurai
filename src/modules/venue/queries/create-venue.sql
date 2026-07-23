INSERT INTO venues (name, location, timezone, capacity)
VALUES ($1, $2, $3, $4)
RETURNING *;
