CREATE TABLE is_stored (
rif_agency VARCHAR(15) NOT NULL,
id_producto INT NOT NULL,
inventory INT NOT NULL,
max_inventory INT NOT NULL,
min_inventory INT NOT NULL,

PRIMARY KEY (rif_agency, id_producto),

CONSTRAINT fk_concesionario_is_stored FOREIGN KEY (rif_agency) REFERENCES agency(rif_agency) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_producto_is_stored FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE ON UPDATE CASCADE

);