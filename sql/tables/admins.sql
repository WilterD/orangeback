CREATE TABLE admins (
  admin_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL,
  email dom_email UNIQUE NOT NULL,
  password VARCHAR(64) NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (admin_id)
);
