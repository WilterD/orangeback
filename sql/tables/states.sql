CREATE TABLE states (
	state_id INTEGER GENERATED ALWAYS AS IDENTITY,
	name dom_name NOT NULL UNIQUE,
  created_at dom_created_at,
  PRIMARY KEY (state_id)
);
