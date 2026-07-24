SELECT id, first_name, last_name, email, image_url, role, created_at, updated_at
FROM users
WHERE id = $1;
