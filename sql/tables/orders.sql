CREATE TABLE orders (
  order_id INTEGER GENERATED ALWAYS AS IDENTITY,
  responsible_dni dom_dni DEFAULT NULL,
  responsible_name dom_name DEFAULT NULL,
  entry_time TIMESTAMP NOT NULL,
  estimated_departure TIMESTAMP NOT NULL,
  real_departure TIMESTAMP DEFAULT NULL,                          
  booking_id INTEGER NOT NULL,
  employee_dni dom_dni NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (order_id),
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  FOREIGN KEY (employee_dni) REFERENCES employees(employee_dni) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
