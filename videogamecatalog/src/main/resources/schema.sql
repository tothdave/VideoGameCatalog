CREATE TABLE IF NOT EXISTS VideoGameCatalog (
    id IDENTITY PRIMARY KEY,
    name VARCHAR(255),
    developer VARCHAR(255),
    image_url VARCHAR(255),
    genre VARCHAR(255),
    player_mode VARCHAR(255),
    description CLOB
)