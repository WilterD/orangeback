CREATE TABLE vehicles (
  license_plate VARCHAR(16),
  nro_serial VARCHAR(64) UNIQUE NOT NULL,
  nro_motor VARCHAR(64) UNIQUE NOT NULL,
  sale_date DATE NOT NULL,
  color VARCHAR(32) NOT NULL,
  extra_descriptions VARCHAR(255) NOT NULL,
  maintenance_summary VARCHAR(255),
  agency_seller VARCHAR(64) NOT NULL,
  model_id VARCHAR(64) NOT NULL,
  client_dni dom_dni NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (license_plate),
  CONSTRAINT fk_model_id FOREIGN KEY (model_id) REFERENCES models(model_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_client_dni FOREIGN KEY (client_dni) REFERENCES clients(client_dni)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
