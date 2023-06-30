CREATE TABLE bills (
  bill_id INTEGER GENERATED ALWAYS AS IDENTITY,
  date_bill TIMESTAMP NOT NULL,
  discount_value FLOAT NOT NULL,
  total_cost FLOAT NOT NULL,
  order_id INTEGER NOT NULL,
  PRIMARY KEY (bill_id),
  CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
