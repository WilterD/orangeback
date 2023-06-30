CREATE TABLE detalle_orders (
id_service INT NOT NULL,
id_activity INT NOT NULL,
id_order INT NOT NULL,
precio FLOAT NOT NULL,
horas_tomadas INT NOT NULL,
dni_worker VARCHAR(15) NOT NULL,

PRIMARY KEY (id_service, id_activity, id_detalle_orden),

CONSTRAINT fk_orden_detalles FOREIGN KEY (id_order) REFERENCES orders(id_order),
CONSTRAINT fk_actividad_details_ordens FOREIGN KEY (id_activity) REFERENCES activities(id_activity),
CONSTRAINT fk_details_orders FOREIGN KEY (id_detalle_orden) REFERENCES orders(id_order) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_trabajador_details_ordens FOREIGN KEY (dni_worker) REFERENCES trabajadores(dni_worker)
);