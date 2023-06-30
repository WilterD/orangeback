CREATE TABLE bills (
  bill_id INTEGER GENERATED ALWAYS AS IDENTITY,
  bill_date TIMESTAMP NOT NULL,
  discount_value FLOAT NOT NULL,
  total_cost FLOAT NOT NULL,
  order_id INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (bill_id),
  CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
