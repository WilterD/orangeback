CREATE TABLE workers_specialties (
dni_worker VARCHAR(15) NOT NULL,
id_service INT NOT NULL,
PRIMARY KEY (dni_worker, id_service),

CONSTRAINT fk_trabajador_specialties FOREIGN KEY (dni_worker) REFERENCES trabajadores(dni_worker) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_servicio_specialties FOREIGN KEY (id_service) REFERENCES services(id_service) ON DELETE CASCADE ON UPDATE CASCADE

);