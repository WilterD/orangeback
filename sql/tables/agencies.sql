CREATE TABLE agencies (
  agency_rif dom_agency_rif,
  business_name dom_name NOT NULL UNIQUE,
  agency_name dom_name NOT NULL UNIQUE,
  manager_dni dom_dni NOT NULL UNIQUE,
  city_id INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (agency_rif),
  CONSTRAINT fk_manager_dni FOREIGN KEY (manager_dni) REFERENCES managers(manager_dni) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_city_id FOREIGN KEY (city_id) REFERENCES cities(city_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
