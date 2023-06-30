CREATE TABLE models (
  model_id VARCHAR(64),
  brand VARCHAR(64) NOT NULL,
  description VARCHAR(64) NOT NULL,
  model_kg FLOAT NOT NULL,
  model_year VARCHAR(4) NOT NULL,
  seats_quantity SMALLINT NOT NULL,
  refrigerant_type VARCHAR(50) NOT NULL,
  engine_oil_type VARCHAR(50) NOT NULL,
  oil_box VARCHAR(50) NOT NULL,
  octane INT NOT NULL,
  PRIMARY KEY (id_model)
);
