CREATE TABLE agencies (
  agency_rif VARCHAR(32),
  business_name dom_name UNIQUE,
  agency_name dom_name UNIQUE,
  manager_dni VARCHAR(16) NOT NULL UNIQUE,
  city_id INTEGER NOT NULL,
  PRIMARY KEY (agency_rif),
  CONSTRAINT fk_manager_dni FOREIGN KEY (manager_dni) REFERENCES managers(manager_dni) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_city_id FOREIGN KEY (city_id) REFERENCES cities(city_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
