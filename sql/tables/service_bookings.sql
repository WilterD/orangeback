CREATE TABLE service_bookings (
  booking_id INTEGER,
  service_id INTEGER,
  PRIMARY KEY (booking_id, service_id),
  CONSTRAINT fk_booking_id FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
)