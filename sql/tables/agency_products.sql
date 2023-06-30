CREATE TABLE agency_products (
  agency_rif dom_agency_rif NOT NULL,
  product_id VARCHAR(32) NOT NULL,
  on_stock INTEGER NOT NULL,
  max_capacity INTEGER NOT NULL,
  min_capacity INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (agency_rif, product_id),
  CONSTRAINT fk_agency_rif FOREIGN KEY (agency_rif) REFERENCES agencies(agency_rif)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
