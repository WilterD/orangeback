CREATE TABLE agency_products (
  agency_rif INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  on_stock INTEGER NOT NULL,
  max_capacity INTEGER NOT NULL,
  min_capacity INTEGER NOT NULL,
  PRIMARY KEY (agency_rif, product_id),
  CONSTRAINT fk_agency_rif FOREIGN KEY (agency_rif) REFERENCES agencies (agency_rif)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT gk_product_id FOREIGN KEY (product_id) REFERENCES products (product_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
);
