DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS card;

CREATE TABLE user (
  email TEXT PRIMARY KEY NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE card (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_email TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  timestamp DATETIME NOT NULL,
  FOREIGN KEY (user_email) REFERENCES user(email)
)
