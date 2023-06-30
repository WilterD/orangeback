CREATE TABLE supply_lines (
  supply_line_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(64) UNIQUE NOT NULL,
  PRIMARY KEY (supply_line_id)
);