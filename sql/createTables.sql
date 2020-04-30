CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  password_hash CHAR(60) NOT NULL,
  is_writer BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS recipes (
	recipe_id INT AUTO_INCREMENT PRIMARY KEY,
	author_id INT NOT NULL,
    recipe_name VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_path VARCHAR(255) NOT NULL,
    prep_time TIME NOT NULL,
    cook_time TIME NOT NULL,
    overall_time TIME NOT NULL,
    difficulty VARCHAR(6) NOT NULL,
    is_vegan BOOLEAN NOT NULL DEFAULT FALSE,
    is_vegetarian BOOLEAN NOT NULL DEFAULT FALSE,
    is_dairy_free BOOLEAN NOT NULL DEFAULT FALSE,
    is_gluten_free BOOLEAN NOT NULL DEFAULT FALSE,
    is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
    recipe_text JSON NOT NULL,
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