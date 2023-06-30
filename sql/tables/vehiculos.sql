CREATE TABLE vehiculos (
placa VARCHAR(10) NOT NULL PRIMARY KEY,
nro_serial VARCHAR(50),
nro_motor VARCHAR(50),
fecha_venta DATE,
color VARCHAR(20),
descriptions_extra VARCHAR(100) NOT NULL,
resumen_mantenimiento VARCHAR(100) NOT NULL,
concesionario_vendedor VARCHAR(100) NOT NULL,
codigo_modelo VARCHAR(50) NOT NULL,
dni_client VARCHAR(15) NOT NULL,

CONSTRAINT fk_vehiculos_modelos
FOREIGN KEY (codigo_modelo) REFERENCES modelos(codigo_modelo),

CONSTRAINT fk_vehiculos_clients
FOREIGN KEY (dni_client) REFERENCES clients(dni_client)
);