-- Domains and Types
CREATE DOMAIN dom_name VARCHAR(64);
CREATE DOMAIN dom_email VARCHAR(64);
CREATE DOMAIN dom_dni VARCHAR(16);
CREATE DOMAIN dom_agency_rif VARCHAR(32);
CREATE DOMAIN dom_phone_number VARCHAR(16);
CREATE DOMAIN dom_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
CREATE DOMAIN dom_reservation_time AS INTEGER
  CHECK (VALUE BETWEEN 1 AND 7);
CREATE DOMAIN dom_payments_quantity AS INTEGER
  CHECK (VALUE BETWEEN 1 AND 2);
CREATE DOMAIN dom_discount_percentage AS INTEGER
  CHECK (VALUE BETWEEN 0 AND 100);
CREATE TYPE type_payment_method AS ENUM ('E', 'D', 'T', 'TD', 'TC');

-- 1

CREATE TABLE admins (
  admin_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL,
  email dom_email UNIQUE NOT NULL,
  password VARCHAR(64) NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (admin_id)
);

-- 2

CREATE TABLE states (
	state_id INTEGER GENERATED ALWAYS AS IDENTITY,
	name dom_name NOT NULL UNIQUE,
  created_at dom_created_at,
  PRIMARY KEY (state_id)
);

-- 3

CREATE TABLE cities (
  city_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name NOT NULL UNIQUE,
  state_id INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (city_id),
  CONSTRAINT fk_state_id FOREIGN KEY (state_id) REFERENCES states(state_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

-- 4

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

-- 5

CREATE TABLE agencies (
  agency_rif dom_agency_rif,
  business_name dom_name NOT NULL UNIQUE,
  agency_name dom_name NOT NULL UNIQUE,
  manager_dni dom_dni NOT NULL UNIQUE,
  city_id INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (agency_rif),
  CONSTRAINT fk_manager_dni FOREIGN KEY (manager_dni) REFERENCES managers(manager_dni) 
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT fk_city_id FOREIGN KEY (city_id) REFERENCES cities(city_id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 6

CREATE TABLE discounts (
  discount_id INTEGER GENERATED ALWAYS AS IDENTITY,
  percentage FLOAT NOT NULL,
  services_min SMALLINT NOT NULL,
  services_max SMALLINT NOT NULL,
  agency_rif dom_agency_rif,
  created_at dom_created_at,
  PRIMARY KEY (discount_id),
  CONSTRAINT fk_agency_rif FOREIGN KEY (agency_rif) REFERENCES agencies(agency_rif) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

-- 7

CREATE TABLE jobs (
  job_id INTEGER GENERATED ALWAYS AS IDENTITY,
  description VARCHAR(64) NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (job_id)
);

-- 8

CREATE TABLE employees (
  employee_dni dom_dni NOT NULL,
  name dom_name NOT NULL,
  phone dom_phone_number NOT NULL,
  address VARCHAR(64) NOT NULL,
  salary FLOAT NOT NULL,
  agency_rif dom_agency_rif NOT NULL,
  job_id INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (employee_dni),
  CONSTRAINT fk_agency_rif FOREIGN KEY (agency_rif) REFERENCES agencies(agency_rif) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_job_id FOREIGN KEY (job_id) REFERENCES jobs(job_id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 9

CREATE TABLE clients (
  client_dni dom_dni,
  name dom_name NOT NULL,
  email dom_email NOT NULL,
  main_phone dom_phone_number NOT NULL,
  secondary_phone dom_phone_number NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (client_dni)
);

-- 10

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

-- 11

CREATE TABLE vehicles (
  license_plate VARCHAR(16),
  nro_serial VARCHAR(64) UNIQUE NOT NULL,
  nro_motor VARCHAR(64) UNIQUE NOT NULL,
  sale_date DATE NOT NULL,
  color VARCHAR(32) NOT NULL,
  extra_descriptions VARCHAR(255) NOT NULL,
  maintenance_summary VARCHAR(255),
  agency_seller VARCHAR(64) NOT NULL,
  model_id VARCHAR(64) NOT NULL,
  client_dni dom_dni NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (license_plate),
  CONSTRAINT fk_model_id FOREIGN KEY (model_id) REFERENCES models(model_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_client_dni FOREIGN KEY (client_dni) REFERENCES clients(client_dni)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 12

CREATE TABLE services (
  service_id INTEGER,
  description VARCHAR(255) NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (service_id)
);

-- 13

CREATE TABLE activities (
  activity_id INTEGER GENERATED ALWAYS AS IDENTITY,
  service_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  cost_hour FLOAT NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (service_id, activity_id),
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 14

CREATE TABLE services_per_models (
  service_id INTEGER NOT NULL,
  model_id VARCHAR(64) NOT NULL,
  mileage FLOAT NOT NULL,
  use_time INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (service_id, model_id),
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_model_id FOREIGN KEY (model_id) REFERENCES models(model_id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 15

CREATE TABLE employees_specialties (
  employee_dni dom_dni,
  service_id INTEGER,
  created_at dom_created_at,
  PRIMARY KEY (employee_dni, service_id),
  CONSTRAINT fk_employee_dni FOREIGN KEY (employee_dni) REFERENCES employees(employee_dni) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 16

CREATE TABLE employees_coordinate_services (
  employee_dni dom_dni NOT NULL,
  service_id INTEGER NOT NULL,
  reservation_time dom_reservation_time NOT NULL,
  capacity INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (employee_dni, service_id),
  CONSTRAINT fk_employee_dni FOREIGN KEY (employee_dni) REFERENCES employees(employee_dni) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 17

CREATE TABLE bookings (
  booking_id INT NOT NULL,
  expedition_date TIMESTAMP NOT NULL,
  expiration_date TIMESTAMP NOT NULL,
  client_dni dom_dni NOT NULL,
  license_plate VARCHAR(16) NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (booking_id),
  CONSTRAINT fk_client_dni FOREIGN KEY (client_dni) REFERENCES clients(client_dni) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_license_plate FOREIGN KEY (license_plate) REFERENCES vehicles(license_plate) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 18

CREATE TABLE bookings_per_services (
  booking_id INTEGER,
  service_id INTEGER,
  created_at dom_created_at,
  PRIMARY KEY (booking_id, service_id),
  CONSTRAINT fk_booking_id FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 19

CREATE TABLE orders (
  order_id INTEGER GENERATED ALWAYS AS IDENTITY,
  responsible_dni dom_dni DEFAULT NULL,
  responsible_name dom_name DEFAULT NULL,
  entry_time TIMESTAMP NOT NULL,
  estimated_departure TIMESTAMP NOT NULL,
  real_departure TIMESTAMP DEFAULT NULL,                          
  booking_id INTEGER NOT NULL,
  employee_dni dom_dni NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (order_id),
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (employee_dni) REFERENCES employees(employee_dni) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 20

CREATE TABLE order_details (
  service_id INTEGER NOT NULL,
  activity_id INTEGER NOT NULL,
  order_id INTEGER NOT NULL,
  cost_hour FLOAT NOT NULL,
  hours_taken INTEGER NOT NULL,
  employee_dni dom_dni NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (service_id, activity_id, order_id),
  CONSTRAINT fk_12 FOREIGN KEY (service_id, activity_id) 
    REFERENCES activities(service_id, activity_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_employee_dni FOREIGN KEY (employee_dni) REFERENCES employees(employee_dni)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 21

CREATE TABLE bills (
  bill_id INTEGER GENERATED ALWAYS AS IDENTITY,
  bill_date TIMESTAMP NOT NULL,
  discount_value FLOAT NOT NULL,
  total_cost FLOAT NOT NULL,
  order_id INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (bill_id),
  CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 22

CREATE TABLE payments (
  bill_id INTEGER,
  payment_id dom_payments_quantity,
  cost FLOAT NOT NULL,
  payment_date TIMESTAMP NOT NULL,
  payment_method type_payment_method NOT NULL,
  card_number VARCHAR(32) DEFAULT NULL,
  created_at dom_created_at,
  PRIMARY KEY (bill_id, payment_id),
  CONSTRAINT fk_pays_factura FOREIGN KEY (bill_id) REFERENCES bills(bill_id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 23

CREATE TABLE card_banks (
  card_number VARCHAR(32),
  bank VARCHAR(32) NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (card_number),
  CONSTRAINT fk_card_number FOREIGN KEY (card_number) REFERENCES payments(card_number) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 24

CREATE TABLE supply_lines (
  supply_line_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name UNIQUE NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (supply_line_id)
);

-- 25

CREATE TABLE products (
  product_id VARCHAR(32),
  short_name_product dom_name NOT NULL,
  description VARCHAR(255) NOT NULL,
  provider VARCHAR(64) NOT NULL,
  is_ecological BOOLEAN NOT NULL,
  price FLOAT NOT NULL,
  supply_line_id INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (product_id),
  CONSTRAINT fk_supply_line_id FOREIGN KEY (supply_line_id) REFERENCES supply_lines(supply_line_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 26

CREATE TABLE products_per_agencies (
  agency_rif dom_agency_rif NOT NULL,
  product_id VARCHAR(32) NOT NULL,
  on_stock INTEGER NOT NULL,
  max_capacity INTEGER NOT NULL,
  min_capacity INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (agency_rif, product_id),
  CONSTRAINT fk_agency_rif FOREIGN KEY (agency_rif) REFERENCES agencies(agency_rif)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- 27

CREATE TABLE products_in_order_details (
  service_id INTEGER,
  activity_id INTEGER,
  order_id INTEGER,
  product_id VARCHAR(32),
  price FLOAT NOT NULL,
  quantity INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (service_id, activity_id, order_id, product_id),
  CONSTRAINT fk_order_details FOREIGN KEY (service_id, activity_id, order_id) 
    REFERENCES order_details(service_id, activity_id, order_id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products(product_id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);
