CREATE TABLE services (
  service_id INTEGER GENERATED ALWAYS AS IDENTITY,
  description VARCHAR(255) NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (service_id)
);
