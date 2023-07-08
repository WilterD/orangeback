CREATE TABLE activities (
  service_id INTEGER NOT NULL,
  activity_id INTEGER GENERATED ALWAYS AS IDENTITY,
  description TEXT NOT NULL,
  cost_hour FLOAT NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (service_id, activity_id),
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
