CREATE DOMAIN dom_name VARCHAR(64) NOT NULL;

-- 1

CREATE TABLE users (
  user_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name,
  email VARCHAR(64) UNIQUE NOT NULL,
  password VARCHAR(64) NOT NULL,
  PRIMARY KEY (user_id)
);

-- 2

CREATE TABLE states(
	state_id INTEGER GENERATED ALWAYS AS IDENTITY,
	name dom_name UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (state_id)
);

-- 3

CREATE TABLE cities (
  city_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name dom_name UNIQUE,
  state_id INTEGER NOT NULL,
  PRIMARY KEY (city_id),
  CONSTRAINT fk_state_id FOREIGN KEY (state_id) REFERENCES states(state_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

-- 4

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

-- 5

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

-- 6

CREATE TABLE jobs (
  job_id INTEGER GENERATED ALWAYS AS IDENTITY,
  description VARCHAR(64) NOT NULL,
  PRIMARY KEY (job_id)
);

-- 7

CREATE TABLE managers (
  manager_dni VARCHAR(16),
  name dom_name,
  main_phone VARCHAR(16) NOT NULL,
  secondary_phone VARCHAR(16) NOT NULL,
  address VARCHAR(64) NOT NULL,
  email VARCHAR(64) NOT NULL,
  PRIMARY KEY (dni_manager)
);

-- 8

CREATE TABLE employees (
  employee_dni VARCHAR(15) NOT NULL,
  name dom_name,
  phone VARCHAR(16) NOT NULL,
  address VARCHAR(64) NOT NULL,
  salary FLOAT NOT NULL,
  agency_rif INTEGER NOT NULL,
  job_id INTEGER NOT NULL,
  PRIMARY KEY (employee_dni),
  CONSTRAINT fk_agency_rif FOREIGN KEY (agency_rif) REFERENCES agencies(agency_rif) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_job_id FOREIGN KEY (job_id) REFERENCES jobs(job_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

-- 9

CREATE TABLE clients (
  client_dni VARCHAR(16),
  name dom_name,
  email VARCHAR(50),
  main_phone VARCHAR(16) NOT NULL,
  secondary_phone VARCHAR(16) NOT NULL,
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
  refrigerant_type VARCHAR(64) NOT NULL,
  engine_oil_type VARCHAR(64) NOT NULL,
  oil_box VARCHAR(64) NOT NULL,
  octane INT NOT NULL,
  PRIMARY KEY (id_model)
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
  client_dni VARCHAR(16) NOT NULL,
  PRIMARY KEY (license_plate),
  CONSTRAINT fk_model_id FOREIGN KEY (model_id) REFERENCES models(model_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_client_dni FOREIGN KEY (client_dni) REFERENCES clients(client_dni)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

-- 12

CREATE TABLE bookings (
  booking_id INT NOT NULL,
  expedition_date TIMESTAMP NOT NULL,
  expiration_date TIMESTAMP NOT NULL,
  client_dni VARCHAR(16) NOT NULL,
  license_plate VARCHAR(16) NOT NULL,
  PRIMARY KEY (booking_id),
  CONSTRAINT fk_client_dni FOREIGN KEY (client_dni) REFERENCES clients(client_dni) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_license_plate FOREIGN KEY (license_plate) REFERENCES vehicles(license_plate) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

-- 13

CREATE TABLE services (
  service_id INT,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_service)
);

-- 14

CREATE TABLE activities (
  activity_id INTEGER GENERATED ALWAYS AS IDENTITY,
  service_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  cost_hour FLOAT NOT NULL,
  PRIMARY KEY (service_id, activity_id),
  CONSTRAINT fk_service_id FOREIGN KEY (id_service) REFERENCES services(id_service) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

-- 15

CREATE TABLE orders (
  order_id INTEGER GENERATED ALWAYS AS IDENTITY,
  responsible_dni VARCHAR(16) DEFAULT NULL,
  responsible_name VARCHAR(32) DEFAULT NULL,
  entry_time TIMESTAMP NOT NULL,
  estimated_departure TIMESTAMP NOT NULL,
  real_departure TIMESTAMP DEFAULT NULL,                          
  booking_id INTEGER NOT NULL,
  employee_dni VARCHAR(16) NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  FOREIGN KEY (employee_dni) REFERENCES employees(employee_dni) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

-- 16

CREATE TABLE bills (
  bill_id INTEGER GENERATED ALWAYS AS IDENTITY,
  date_bill TIMESTAMP NOT NULL,
  discount_value FLOAT NOT NULL,
  total_cost FLOAT NOT NULL,
  order_id INTEGER NOT NULL,
  PRIMARY KEY (bill_id),
  CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

-- 17

CREATE TABLE supply_lines (
  supply_line_id INTEGER GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(64) UNIQUE NOT NULL,
  PRIMARY KEY (supply_line_id)
);

-- 18

CREATE TABLE products (
  product_id VARCHAR(32),
  short_name_product VARCHAR(64) NOT NULL,
  description VARCHAR(255) NOT NULL,
  provider VARCHAR(64) NOT NULL,
  is_ecological BOOLEAN NOT NULL,
  price FLOAT NOT NULL,
  supply_line_id INTEGER NOT NULL,
  PRIMARY KEY (product_id),
  CONSTRAINT fk_supply_line_id (supply_line_id) REFERENCES supply_lines (supply_line_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

-- 19

CREATE TABLE agency_products (
  agency_rif INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  on_stock INTEGER NOT NULL,
  max_capacity INTEGER NOT NULL,
  min_capacity INTEGER NOT NULL,
  PRIMARY KEY (agency_rif, product_id),
  CONSTRAINT fk_agency_rif FOREIGN KEY (agency_rif) REFERENCES agencies (agency_rif)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT gk_product_id FOREIGN KEY (product_id) REFERENCES products (product_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
);

-- 20

CREATE TABLE employee_specialties (
  employee_dni VARCHAR(16),
  service_id INTEGER,
  PRIMARY KEY (employee_dni, service_id),
  CONSTRAINT fk_employee_dni FOREIGN KEY (employee_dni) REFERENCES employee(employee_dni) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- 21

CREATE TABLE services_per_models (
  service_id INTEGER NOT NULL,
  model_id VARCHAR(64) NOT NULL,
  mileage FLOAT NOT NULL,
  use_time INTEGER NOT NULL,
  PRIMARY KEY (service_id, model_id),
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_model_id FOREIGN KEY (model_id) REFERENCES models(model_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

-- 22

CREATE TABLE product_details_orders (
  service_id INT NOT NULL,
  activity_id INT NOT NULL,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  price FLOAT NOT NULL,
  cantidad INTEGER NOT NULL,
  PRIMARY KEY (service_id, activity_id, order_id, product_id),
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_activity_id FOREIGN KEY (activity_id) REFERENCES activities(activity_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES productos(product_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

-- 23

CREATE TABLE coordinating_services (
  employee_dni VARCHAR(16) NOT NULL,
  service_id INT NOT NULL,
  reservation_time date NOT NULL,
  capacity INT NOT NULL,
  PRIMARY KEY (employee_dni, service_id),
  CONSTRAINT fk_employee_dni FOREIGN KEY (employee_dni) REFERENCES workers(employee_dni) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

-- 24

CREATE TABLE pays (
id_pay INT,
id_bill INT NOT NULL,
pay_date DATE NOT NULL,
payment_method VARCHAR(50) NOT NULL,
amount DECIMAL(10, 2) NOT NULL,
card_number VARCHAR(20),
bank_card VARCHAR(50),

PRIMARY KEY (id_pay),

CONSTRAINT fk_pays_factura FOREIGN KEY (id_bill) REFERENCES bills(id_bill) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE detail_orders (
id_service INT NOT NULL,
id_activity INT NOT NULL,
id_detail_orden INT NOT NULL,
price FLOAT NOT NULL,
hours_taken INT NOT NULL,
dni_worker VARCHAR(15) NOT NULL,

PRIMARY KEY (id_service, id_activity, id_detail_orden),

CONSTRAINT fk_orden_details FOREIGN KEY (id_detail_orden) REFERENCES orders(id_order)  ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_activities_details_orders FOREIGN KEY (id_activity) REFERENCES activities(id_activity),
CONSTRAINT fk_trabajador_details_orders FOREIGN KEY (dni_worker) REFERENCES workers(dni_worker)
);