CREATE TABLE rsvp (
    id SERIAL PRIMARY KEY,
    fullname TEXT NOT NULL,
    attendance BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);