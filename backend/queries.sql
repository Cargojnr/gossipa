-- USERS
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  bio TEXT,
  profile_picture VARCHAR,
  active_status BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  stealth_mode BOOLEAN DEFAULT FALSE,           -- "stealth mode" flag
  login_code VARCHAR(6),                        -- for one-time login code
  login_code_expires VARCHAR,               -- expiry for login_code
  reset_token TEXT,                       
  reset_token_expires TIMESTAMPTZ,               
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LOGIN AUDIT (you insert on successful login)
CREATE TABLE IF NOT EXISTS login_audit (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ip_address TEXT,
  user_agent TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- SECRETS (if you use it; join with users)
CREATE TABLE IF NOT EXISTS secrets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  secret TEXT NOT NULL,
  category VARCHAR(50),
  color VARCHAR(30),
  reactions JSONB DEFAULT '{}'::jsonb,
  reported BOOLEAN DEFAULT FALSE,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- AUDIOS (if you use it; join with users)
CREATE TABLE IF NOT EXISTS audios (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255),
  path VARCHAR(255),
  url VARCHAR(255),
  uploadDate TIMESTAMPTZ DEFAULT NOW(),
  userId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW(),
  reactions JSONB DEFAULT '{}'::jsonb,
  reported BOOLEAN DEFAULT FALSE
);

-- EAVEDROPS (your “followers”)
CREATE TABLE IF NOT EXISTS eavedrops (
  id SERIAL PRIMARY KEY,
  audience_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (audience_id, target_id)
);

-- bookmarks (since you queried this)
CREATE TABLE IF NOT EXISTS bookmarks (
  id SERIAL PRIMARY KEY,
  user_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  secert_id INTEGER REFERENCES secrets(id) ON DELETE CASCADE,
  audio_id INTEGER REFERENCES audios(id),
  post_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FEEDBACKS (feedback table)
CREATE TABLE IF NOT EXISTS feedbacks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  review TEXT,
  rating VARCHAR ,
  idea TEXT
);

-- REPORTS (reports table)
CREATE TABLE IF NOT EXISTS reports (
  id SERIAL PRIMARY KEY,
  reported_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  secret_id INTEGER NOT NULL REFERENCES secrets(id) ON DELETE CASCADE,
  audio_id INTEGER NOT NULL REFERENCES audios(id) ON DELETE CASCADE,
  comment_id INTEGER NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  reported_by INTEGER,
  reason TEXT,
  status VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);




ALTER TABLE "Audios"
ADD COLUMN IF NOT EXISTS reactions JSONB DEFAULT '{}';
ALTER TABLE comments ADD COLUMN audio_id INTEGER REFERENCES "Audios"(id);
