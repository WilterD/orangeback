CREATE TABLE payments (
  bill_id INTEGER,
  payment_id dom_payments_quantity,
  cost FLOAT NOT NULL,
  payment_date TIMESTAMP NOT NULL,
  payment_method type_payment_method NOT NULL,
  card_number VARCHAR(32) DEFAULT NULL,
  created_at dom_created_at,
  PRIMARY KEY (bill_id, payment_id),
  CONSTRAINT fk_pays_factura FOREIGN KEY (bill_id) REFERENCES bills(bill_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
