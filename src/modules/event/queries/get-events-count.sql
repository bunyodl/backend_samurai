SELECT COUNT(*)
FROM events
WHERE title ILIKE $1
OR description ILIKE $1
OR EXISTS (
    SELECT 1
    FROM unnest(tags) AS tag
    WHERE tag ILIKE $1
);