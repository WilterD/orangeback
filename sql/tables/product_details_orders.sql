CREATE TABLE product_details_orders (
id_service INT NOT NULL,
id_activity INT NOT NULL,
id_orden INT NOT NULL,
id_product INT NOT NULL,
precio FLOAT NOT NULL,
cantidad INT NOT NULL,

PRIMARY KEY (id_service, id_activity, id_orden, id_product),

CONSTRAINT fk_product_details_services FOREIGN KEY (id_service) REFERENCES services(id_service) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_product_details_activities FOREIGN KEY (id_activity) REFERENCES activities(id_activity) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_product_details_orders FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_product_details_products FOREIGN KEY (id_product) REFERENCES productos(id_product) ON DELETE CASCADE ON UPDATE CASCADE

);