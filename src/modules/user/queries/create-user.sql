INSERT INTO users (first_name, last_name, email, image_url, role, password_hash)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;