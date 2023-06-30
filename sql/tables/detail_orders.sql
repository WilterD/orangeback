CREATE TABLE detail_orders (
id_service INT NOT NULL,
id_activity INT NOT NULL,
id_detail_orden INT NOT NULL,
price FLOAT NOT NULL,
hours_taken INT NOT NULL,
dni_worker VARCHAR(15) NOT NULL,

PRIMARY KEY (id_service, id_activity, id_detail_orden),

CONSTRAINT fk_orden_details FOREIGN KEY (id_detail_orden) REFERENCES orders(id_order)  ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_activities_details_orders FOREIGN KEY (id_activity) REFERENCES activities(id_activity),
CONSTRAINT fk_trabajador_details_orders FOREIGN KEY (dni_worker) REFERENCES workers(dni_worker)
);