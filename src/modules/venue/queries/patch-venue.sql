UPDATE venues
SET
  name = COALESCE($2, name),
  location = COALESCE($3, location),
  timezone = COALESCE($4, timezone),
  capacity = COALESCE($5, capacity),
  updated_at = now()
WHERE id = $1
RETURNING *;
