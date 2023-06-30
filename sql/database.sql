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
