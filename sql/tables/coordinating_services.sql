CREATE TABLE coordinating_services (
dni_worker VARCHAR(15) NOT NULL,
id_service INT NOT NULL,
reserve_times date NOT NULL,
capacidad INT NOT NULL,
PRIMARY KEY (dni_worker, id_service),
CONSTRAINT fk_trabajador_coordinating_services FOREIGN KEY (dni_worker) REFERENCES trabajadores(dni_worker) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_servicio_coordinating_services FOREIGN KEY (id_service) REFERENCES services(id_service) ON DELETE CASCADE ON UPDATE CASCADE
);