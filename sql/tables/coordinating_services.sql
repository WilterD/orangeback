CREATE TABLE coordinating_services (
dni_trabajador VARCHAR(15) NOT NULL,
id_service INT NOT NULL,
reserve_times date NOT NULL,
capacidad INT NOT NULL,
PRIMARY KEY (dni_trabajador, id_service),
CONSTRAINT fk_trabajador_coordinating_services FOREIGN KEY (dni_trabajador) REFERENCES trabajadores(dni_trabajador) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_servicio_coordinating_services FOREIGN KEY (id_service) REFERENCES services(id_service) ON DELETE CASCADE ON UPDATE CASCADE
);