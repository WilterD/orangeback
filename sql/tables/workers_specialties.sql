CREATE TABLE workers_specialties (
cedula_trabajador VARCHAR(15) NOT NULL,
id_service INT NOT NULL,
PRIMARY KEY (cedula_trabajador, id_service),

CONSTRAINT fk_trabajador_specialties FOREIGN KEY (cedula_trabajador) REFERENCES trabajadores(cedula_trabajador) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_servicio_specialties FOREIGN KEY (id_service) REFERENCES services(id_service) ON DELETE CASCADE ON UPDATE CASCADE

);