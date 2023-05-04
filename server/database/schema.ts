const USER_TABLE = `
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
`
const LIKE_TABLE = `
CREATE TABLE likes (
    user_id INT,
    tweet_id INT,
    PRIMARY KEY (user_id, tweet_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE
);
`
const DISLIKE_TABLE = `
CREATE TABLE dislikes (
    user_id INT,
    tweet_id INT,
    PRIMARY KEY (user_id, tweet_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE
);
`
const TWEET_TABLE = `
CREATE TABLE IF NOT EXISTS tweets (
    id INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
`

const COMMENT_TABLE = `
CREATE TABLE IF NOT EXISTS comments (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    tweet_id INT NOT NULL,
    content VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tweet_id) REFERENCES tweets(id)
);
`

export { USER_TABLE, TWEET_TABLE, COMMENT_TABLE, LIKE_TABLE, DISLIKE_TABLE }
