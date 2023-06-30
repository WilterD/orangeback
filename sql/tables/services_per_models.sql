CREATE TABLE services_per_models (
  service_id INTEGER NOT NULL,
  model_id VARCHAR(64) NOT NULL,
  mileage FLOAT NOT NULL,
  use_time INTEGER NOT NULL,
  PRIMARY KEY (service_id, model_id),
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_model_id FOREIGN KEY (model_id) REFERENCES models(model_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
