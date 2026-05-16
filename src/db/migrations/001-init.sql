DO $$
BEGIN
    CREATE TYPE user_role AS ENUM ('organizer', 'attendee');
EXCEPTION
-- If the type already exists, do nothing.
-- duplicate_object is the keyword for error code
    WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'attendee'
);

CREATE TABLE IF NOT EXISTS venues (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location TEXT NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0)
);

CREATE TABLE IF NOT EXISTS events (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    venue_id INT NOT NULL REFERENCES venues(id),
    organizer_id INT NOT NULL REFERENCES users(id),
    date TIMESTAMPTZ NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0)
);
