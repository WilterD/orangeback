CREATE TABLE supply_lines (
  supply_line_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name UNIQUE NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (supply_line_id)
);