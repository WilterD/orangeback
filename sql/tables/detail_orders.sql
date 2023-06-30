CREATE TABLE detail_orders (
id_service INT NOT NULL,
id_activity INT NOT NULL,
id_order INT NOT NULL,
price FLOAT NOT NULL,
hours_taken INT NOT NULL,
dni_worker VARCHAR(15) NOT NULL,

PRIMARY KEY (id_service, id_activity, id_detail_orden),

CONSTRAINT fk_orden_details FOREIGN KEY (id_order) REFERENCES orders(id_order),
CONSTRAINT fk_actividad_details_ordens FOREIGN KEY (id_activity) REFERENCES activities(id_activity),
CONSTRAINT fk_details_orders FOREIGN KEY (id_detail_orden) REFERENCES orders(id_order) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_trabajador_details_ordens FOREIGN KEY (dni_worker) REFERENCES trabajadores(dni_worker)
);