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

