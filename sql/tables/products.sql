CREATE TABLE products (
  product_id VARCHAR(32),
  short_name_product VARCHAR(64) NOT NULL,
  description VARCHAR(255) NOT NULL,
  provider VARCHAR(64) NOT NULL,
  is_ecological BOOLEAN NOT NULL,
  price FLOAT NOT NULL,
  supply_line_id INTEGER NOT NULL,
  PRIMARY KEY (product_id),
  CONSTRAINT fk_supply_line_id (supply_line_id) REFERENCES supply_lines (supply_line_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
