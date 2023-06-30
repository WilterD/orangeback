CREATE TABLE bookings (
  booking_id INT NOT NULL,
  expedition_date TIMESTAMP NOT NULL,
  expiration_date TIMESTAMP NOT NULL,
  client_dni VARCHAR(16) NOT NULL,
  license_plate VARCHAR(16) NOT NULL,
  PRIMARY KEY (booking_id),
  CONSTRAINT fk_client_dni FOREIGN KEY (client_dni) REFERENCES clients(client_dni) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_license_plate FOREIGN KEY (license_plate) REFERENCES vehicles(license_plate) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
