CREATE TABLE activities (
  activity_id INTEGER GENERATED ALWAYS AS IDENTITY,
  service_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  cost_hour FLOAT NOT NULL,
  PRIMARY KEY (service_id, activity_id),
  CONSTRAINT fk_service_id FOREIGN KEY (id_service) REFERENCES services(id_service) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
