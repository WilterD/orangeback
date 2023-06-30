CREATE TABLE cities (
  city_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL UNIQUE,
  state_id INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (city_id),
  CONSTRAINT fk_state_id FOREIGN KEY (state_id) REFERENCES states(state_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
