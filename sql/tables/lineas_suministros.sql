CREATE TABLE lineas_suministros (
id_linea INT PRIMARY KEY,
id_factura INT,
id_producto INT,
cantidad INT,
precio_unitario DECIMAL(10, 2),
monto_total DECIMAL(10, 2),
FOREIGN KEY (id_factura) REFERENCES facturas(id_factura) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE ON UPDATE CASCADE
);