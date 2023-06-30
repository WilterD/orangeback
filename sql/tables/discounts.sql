CREATE TABLE discounts (
  discount_id INTEGER GENERATED ALWAYS AS IDENTITY,
  percentage FLOAT NOT NULL,
  services_min SMALLINT NOT NULL,
  services_max SMALLINT NOT NULL,
  agency_rif VARCHAR(32),
  PRIMARY KEY (discount_id),
  CONSTRAINT fk_agency_rif FOREIGN KEY (agency_rif) REFERENCES agencies(agency_rif) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
