CREATE TABLE product_details_orders (
id_servicio INT NOT NULL,
id_actividad INT NOT NULL,
id_orden INT NOT NULL,
id_product INT NOT NULL,
precio FLOAT NOT NULL,
cantidad INT NOT NULL,

PRIMARY KEY (id_servicio, id_actividad, id_orden, id_product),

CONSTRAINT fk_product_details_services FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_product_details_activities FOREIGN KEY (id_actividad) REFERENCES actividades(id_actividad) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_product_details_orders FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_product_details_products FOREIGN KEY (id_product) REFERENCES productos(id_product) ON DELETE CASCADE ON UPDATE CASCADE

);