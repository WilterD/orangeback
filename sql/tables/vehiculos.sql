CREATE TABLE vehiculos (
placa VARCHAR(10) NOT NULL PRIMARY KEY,
nro_serial VARCHAR(50),
nro_motor VARCHAR(50),
fecha_venta DATE,
color VARCHAR(20),
descripcion_extra VARCHAR(100) NOT NULL,
resumen_mantenimiento VARCHAR(100) NOT NULL,
concesionario_vendedor VARCHAR(100) NOT NULL,
codigo_modelo VARCHAR(50) NOT NULL,
cedula_cliente VARCHAR(15) NOT NULL
);