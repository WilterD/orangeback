CREATE TABLE coordinating_services (
cedula_trabajador VARCHAR(15) NOT NULL,
id_servicio INT NOT NULL,
reserve_times date NOT NULL,
capacidad INT NOT NULL,
PRIMARY KEY (cedula_trabajador, id_servicio),
CONSTRAINT fk_trabajador_coordinating_services FOREIGN KEY (cedula_trabajador) REFERENCES trabajadores(cedula_trabajador) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_servicio_coordinating_services FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio) ON DELETE CASCADE ON UPDATE CASCADE
);