CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    telegram_id INREGER,
    full_name TEXT,
    username TEXT,
    feathers INTEGER DEFAULT 0,
    damage INTEGER DEFAULT 1
);