CREATE TABLE facturas (
id_factura INT PRIMARY KEY,
fecha DATE,
valor_descuento INT NOT NULL,
monto_total DECIMAL(10, 2),
id_orden INT,
FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden) ON DELETE CASCADE ON UPDATE CASCADE
);