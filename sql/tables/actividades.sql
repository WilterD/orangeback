CREATE TABLE actividades (
id_servicio INT,
id_actividad INT,
nombre VARCHAR(50) NOT NULL,
costo FLOAT,
descripcion VARCHAR(200),
PRIMARY KEY (id_servicio, id_actividad),
CONSTRAINT fk_actividades_servicios FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio) ON DELETE CASCADE ON UPDATE CASCADE,
);