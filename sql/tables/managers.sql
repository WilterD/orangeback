CREATE TABLE managers (
  manager_dni dom_dni,
  name dom_name NOT NULL,
  main_phone dom_phone_number NOT NULL,
  secondary_phone dom_phone_number NOT NULL,
  address VARCHAR(255) NOT NULL,
  email dom_email NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (manager_dni)
);
