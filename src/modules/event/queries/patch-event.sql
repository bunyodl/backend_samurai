UPDATE events
SET
  title = COALESCE($2, title),
  description = COALESCE($3, description),
  type = COALESCE($4, type),
  status = COALESCE($5, status),
  venue_id = COALESCE($6, venue_id),
  date = COALESCE($7, date),
  tags = COALESCE($8, tags),
  updated_at = now()
WHERE id = $1
RETURNING *;
