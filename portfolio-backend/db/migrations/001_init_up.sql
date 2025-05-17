CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  image_url TEXT,
  stack TEXT,
  link_github TEXT,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
