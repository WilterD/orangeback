CREATE TABLE products (
  product_id VARCHAR(32),
  short_name_product dom_name NOT NULL,
  description VARCHAR(255) NOT NULL,
  provider VARCHAR(64) NOT NULL,
  is_ecological BOOLEAN NOT NULL,
  price FLOAT NOT NULL,
  supply_line_id INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (product_id),
  CONSTRAINT fk_supply_line_id FOREIGN KEY (supply_line_id) REFERENCES supply_lines(supply_line_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
