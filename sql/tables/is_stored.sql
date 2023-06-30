CREATE TABLE is_stored (
rif_concesionario VARCHAR(15) NOT NULL,
id_producto INT NOT NULL,
inventory INT NOT NULL,
max_inventory INT NOT NULL,
min_inventory INT NOT NULL,

PRIMARY KEY (rif_concesionario, id_producto),

CONSTRAINT fk_concesionario_is_stored FOREIGN KEY (rif_concesionario) REFERENCES concesionarios(rif_concesionario) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_producto_is_stored FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE ON UPDATE CASCADE

);