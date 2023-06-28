CREATE TABLE facturas (
id_factura INT PRIMARY KEY AUTO_INCREMENT,
fecha DATE,
valor_descuento INT NOT NULL,
monto_total DECIMAL(10, 2),
id_cliente INT,
id_orden INT,
FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden) ON DELETE CASCADE ON UPDATE CASCADE
);