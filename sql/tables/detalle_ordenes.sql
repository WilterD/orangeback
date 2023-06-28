CREATE TABLE detalle_ordenes (
id_detalle_orden INT PRIMARY KEY,
id_orden INT,
id_actividad INT,
precio FLOAT,
horas_tomadas INT,

FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden),
FOREIGN KEY (id_actividad) REFERENCES actividades(id_actividad),
FOREIGN KEY (id_detalle_orden) REFERENCES ordenes(id_orden) ON DELETE CASCADE ON UPDATE CASCADE
);