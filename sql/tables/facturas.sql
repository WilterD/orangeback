CREATE TABLE facturas (
id_factura INT PRIMARY KEY,
fecha DATE,
valor_descuento INT NOT NULL,
monto_total DECIMAL(10, 2),
id_order INT,
FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE ON UPDATE CASCADE
);