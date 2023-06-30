CREATE TABLE models (
  model_id VARCHAR(64),
  brand VARCHAR(64) NOT NULL,
  description VARCHAR(64) NOT NULL,
  model_kg FLOAT NOT NULL,
  model_year VARCHAR(4) NOT NULL,
  seats_quantity SMALLINT NOT NULL,
  refrigerant_type VARCHAR(32) NOT NULL,
  engine_oil_type VARCHAR(32) NOT NULL,
  oil_box VARCHAR(32) NOT NULL,
  octane INT NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (model_id)
);
