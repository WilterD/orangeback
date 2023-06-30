CREATE TABLE cities (
  city_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name UNIQUE,
  state_id INTEGER NOT NULL,
  PRIMARY KEY (city_id),
  CONSTRAINT fk_state_id FOREIGN KEY (state_id) REFERENCES states(state_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
