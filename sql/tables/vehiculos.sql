CREATE TABLE vehiculos (
placa VARCHAR(10) NOT NULL PRIMARY KEY,
nro_motor VARCHAR(50),
nro_serial VARCHAR(50),
fecha_venta DATE,
color VARCHAR(20),
descripcion_extra VARCHAR(100) NOT NULL,
resumen_mantenimiento VARCHAR(100) NOT NULL,
concesionario_vendedor VARCHAR(100) NOT NULL
);