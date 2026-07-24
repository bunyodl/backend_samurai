SELECT COUNT(*)
FROM venues
WHERE name ILIKE $1
OR location ILIKE $1;
