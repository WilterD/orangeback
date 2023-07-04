CREATE TABLE discounts (
  discount_id INTEGER GENERATED ALWAYS AS IDENTITY,
  percentage dom_discount_percentage NOT NULL,
  services_min SMALLINT NOT NULL,
  services_max SMALLINT NOT NULL,
  agency_rif dom_agency_rif,
  created_at dom_created_at,
  PRIMARY KEY (discount_id),
  CONSTRAINT fk_agency_rif FOREIGN KEY (agency_rif) REFERENCES agencies(agency_rif) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT check_services_range CHECK (services_min < services_max)
);
