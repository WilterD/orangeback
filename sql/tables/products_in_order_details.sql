CREATE TABLE products_in_order_details (
  service_id INTEGER,
  activity_id INTEGER,
  order_id INTEGER,
  product_id VARCHAR(32),
  price FLOAT NOT NULL,
  quantity INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (service_id, activity_id, order_id, product_id),
  CONSTRAINT fk_order_details FOREIGN KEY (service_id, activity_id, order_id) 
    REFERENCES order_details(service_id, activity_id, order_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products(product_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
