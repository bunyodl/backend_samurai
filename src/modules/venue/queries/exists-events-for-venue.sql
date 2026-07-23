SELECT EXISTS (
  SELECT 1 FROM events WHERE venue_id = $1
) AS exists;
