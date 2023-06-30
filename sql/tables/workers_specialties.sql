CREATE TABLE workers_specialties (
dni_trabajador VARCHAR(15) NOT NULL,
id_service INT NOT NULL,
PRIMARY KEY (dni_trabajador, id_service),

CONSTRAINT fk_trabajador_specialties FOREIGN KEY (dni_trabajador) REFERENCES trabajadores(dni_trabajador) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_servicio_specialties FOREIGN KEY (id_service) REFERENCES services(id_service) ON DELETE CASCADE ON UPDATE CASCADE

);