CREATE TABLE detalle_ordenes (
id_servicio INT NOT NULL,
id_actividad INT NOT NULL,
id_orden INT NOT NULL,
precio FLOAT NOT NULL,
horas_tomadas INT NOT NULL,
cedula_trabajador VARCHAR(15) NOT NULL,

PRIMARY KEY (id_servicio, id_actividad, id_detalle_orden),

CONSTRAINT fk_orden_detalles FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden),
CONSTRAINT fk_actividad_details_ordens FOREIGN KEY (id_actividad) REFERENCES actividades(id_actividad),
CONSTRAINT fk_details_ordenes FOREIGN KEY (id_detalle_orden) REFERENCES ordenes(id_orden) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_trabajador_details_ordens FOREIGN KEY (cedula_trabajador) REFERENCES trabajadores(cedula_trabajador)
);