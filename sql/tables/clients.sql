CREATE TABLE clients (
  client_dni VARCHAR(16),
  name dom_name,
  email VARCHAR(50),
  main_phone VARCHAR(16) NOT NULL,
  secondary_phone VARCHAR(16) NOT NULL,
  PRIMARY KEY (client_dni)
);
