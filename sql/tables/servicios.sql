CREATE TABLE servicios (
id_servicio INT PRIMARY KEY,
nombre_servicios VARCHAR(50) NOT NULL,
descripcion VARCHAR(255) NOT NULL,
costo_hora DECIMAL(10, 2) NOT NULL,
);