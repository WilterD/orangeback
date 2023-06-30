CREATE TABLE brands (
id_brand INT,
name_brand VARCHAR(50) NOT NULL,
PRIMARY KEY (id_brand)
);

CREATE TABLE clients (
dni_client VARCHAR(15),
name_client VARCHAR(50) NOT NULL,
tlf_main VARCHAR(15),
tlf_secondary VARCHAR(15),
mail_client VARCHAR(50),

PRIMARY KEY (dni_client)

);

CREATE TABLE charges (
id_charge VARCHAR(20) NOT NULL,
descriptions VARCHAR(50) NOT NULL,

PRIMARY KEY (id_charge)

);

CREATE TABLE workers (
    dni_worker VARCHAR(15),
    worker_name VARCHAR(50) NOT NULL,
    tlf_worker VARCHAR(15),
   address_worker VARCHAR(50),
    salary int NOT NULL,
    id_charge VARCHAR(50) NOT NULL,

    PRIMARY KEY (dni_worker),

    FOREIGN KEY (id_charge) REFERENCES charges(id_charge) ON DELETE RESTRICT ON UPDATE CASCADE

);

CREATE TABLE services (
id_service INT,
services_name VARCHAR(50) NOT NULL,
descriptions VARCHAR(255) NOT NULL,
cost_hora DECIMAL(10, 2) NOT NULL,

PRIMARY KEY (id_service)

);

CREATE TABLE workers (
    dni_worker VARCHAR(15),
    worker_name VARCHAR(50) NOT NULL,
    tlf_worker VARCHAR(15),
   address_worker VARCHAR(50),
    salary int NOT NULL,
    id_charge VARCHAR(50) NOT NULL,

    PRIMARY KEY (dni_worker),

    FOREIGN KEY (id_charge) REFERENCES charges(id_charge) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE workers_specialties (
dni_worker VARCHAR(15) NOT NULL,
id_service INT NOT NULL,
PRIMARY KEY (dni_worker, id_service),

CONSTRAINT fk_trabajador_specialties FOREIGN KEY (dni_worker) REFERENCES workers(dni_worker) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_servicio_specialties FOREIGN KEY (id_service) REFERENCES services(id_service) ON DELETE CASCADE ON UPDATE CASCADE

);

CREATE TABLE models (
id_model VARCHAR(50),
brand VARCHAR(50) NOT NULL,
brand_name VARCHAR(50) NOT NULL,
model_kg INT NOT NULL,
model_year INT NOT NULL,
refrigerant_type VARCHAR(50) NOT NULL,
number_posts INT NOT NULL,
engine_oil_type VARCHAR(50) NOT NULL,
oil_box VARCHAR(50) NOT NULL,
octane INT NOT NULL,

PRIMARY KEY (id_model)
);

CREATE TABLE vehicles (
plate VARCHAR(10) NOT NULL,
nro_serial VARCHAR(50) NOT NULL,
nro_motor VARCHAR(50) NOT NULL,
sale_date DATE NOT NULL,
color VARCHAR(20) NOT NULL,
descriptions_extra VARCHAR(100) NOT NULL,
summary_maintenance VARCHAR(100) NOT NULL,
agency_seller VARCHAR(100) NOT NULL,
id_model VARCHAR(50) NOT NULL,
dni_client VARCHAR(15) NOT NULL,

PRIMARY KEY (plate),

CONSTRAINT fk_vehiculos_models
FOREIGN KEY (id_model) REFERENCES models(id_model),

CONSTRAINT fk_vehiculos_clients
FOREIGN KEY (dni_client) REFERENCES clients(dni_client)
);


CREATE TABLE supply_lines (
id_supply INT,
name_supply VARCHAR(50) NOT NULL,

PRIMARY KEY (id_supply)

);

CREATE TABLE states(
	id_states INTEGER GENERATED ALWAYS AS IDENTITY,
	name_states TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id_states)
);

CREATE TABLE citys (
id_city INT,
name_city VARCHAR(50) NOT NULL,
id_states INT,

PRIMARY KEY (id_city),

FOREIGN KEY (id_states) REFERENCES states(id_states)
);
