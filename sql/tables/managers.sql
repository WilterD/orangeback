CREATE TABLE managers (
  manager_dni VARCHAR(16),
  name dom_name,
  main_phone VARCHAR(16) NOT NULL,
  secondary_phone VARCHAR(16) NOT NULL,
  address VARCHAR(64) NOT NULL,
  email VARCHAR(64) NOT NULL,
  PRIMARY KEY (dni_manager)
);
