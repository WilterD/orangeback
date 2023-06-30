CREATE TABLE orders (
  order_id INTEGER GENERATED ALWAYS AS IDENTITY,
  responsible_dni VARCHAR(16) DEFAULT NULL,
  responsible_name VARCHAR(32) DEFAULT NULL,
  entry_time TIMESTAMP NOT NULL,
  estimated_departure TIMESTAMP NOT NULL,
  real_departure TIMESTAMP DEFAULT NULL,                          
  booking_id INTEGER NOT NULL,
  employee_dni VARCHAR(16) NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  FOREIGN KEY (employee_dni) REFERENCES employees(employee_dni) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
