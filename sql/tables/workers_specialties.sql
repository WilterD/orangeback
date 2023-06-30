CREATE TABLE workers_specialties (
cedula_trabajador VARCHAR(15) NOT NULL,
id_servicio INT NOT NULL,
PRIMARY KEY (cedula_trabajador, id_servicio),

CONSTRAINT fk_trabajador_specialties FOREIGN KEY (cedula_trabajador) REFERENCES trabajadores(cedula_trabajador) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_servicio_specialties FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio) ON DELETE CASCADE ON UPDATE CASCADE

);