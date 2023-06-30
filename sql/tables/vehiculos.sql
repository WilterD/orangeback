CREATE TABLE vehiculos (
placa VARCHAR(10) NOT NULL,
nro_serial VARCHAR(50) NOT NULL,
nro_motor VARCHAR(50) NOT NULL,
fecha_venta DATE NOT NULL,
color VARCHAR(20) NOT NULL,
descriptions_extra VARCHAR(100) NOT NULL,
resumen_mantenimiento VARCHAR(100) NOT NULL,
concesionario_vendedor VARCHAR(100) NOT NULL,
id_model VARCHAR(50) NOT NULL,
dni_client VARCHAR(15) NOT NULL,

PRIMARY KEY (placa),

CONSTRAINT fk_vehiculos_models
FOREIGN KEY (id_model) REFERENCES models(id_model),

CONSTRAINT fk_vehiculos_clients
FOREIGN KEY (dni_client) REFERENCES clients(dni_client)
);