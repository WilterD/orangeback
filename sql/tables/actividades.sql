CREATE TABLE actividades (
id_actividad INT PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
costo FLOAT,
id_servicio INT,
descripcion VARCHAR(200),


CONSTRAINT fk_actividades_servicios FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio)


);