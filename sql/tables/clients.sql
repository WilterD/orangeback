CREATE TABLE clients (
  client_dni dom_dni,
  name dom_name NOT NULL,
  email dom_email NOT NULL,
  main_phone dom_phone_number NOT NULL,
  secondary_phone dom_phone_number NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (client_dni)
);
