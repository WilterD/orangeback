CREATE TABLE product_details_orders (
  service_id INT NOT NULL,
  activity_id INT NOT NULL,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  price FLOAT NOT NULL,
  cantidad INTEGER NOT NULL,
  PRIMARY KEY (service_id, activity_id, order_id, product_id),
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_activity_id FOREIGN KEY (activity_id) REFERENCES activities(activity_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES productos(product_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
