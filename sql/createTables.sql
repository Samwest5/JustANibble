CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  password_hash CHAR(60) NOT NULL,
  is_writer BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS recipes (
	recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_name VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    prep_time TIME NOT NULL,
    cook_time TIME NOT NULL,
    overall_time TIME NOT NULL,
    difficulty VARCHAR(6) NOT NULL,
    favorite BOOLEAN NOT NULL DEFAULT FALSE,
    author_id INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users (user_id),
    CHECK (difficulity LIKE "EASY" OR difficulty LIKE "MEDIUM" OR difficulty LIKE "HARD")
);

CREATE TABLE IF NOT EXISTS likes (
	likes_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
		ON UPDATE CASCADE
        ON DELETE CASCADE
	,
	FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id)
		ON UPDATE CASCADE
        ON DELETE CASCADE
);

ALTER TABLE users ADD CONSTRAINT unique_username UNIQUE (user_name);