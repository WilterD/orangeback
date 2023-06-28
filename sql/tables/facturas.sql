CREATE TABLE facturas (
id_factura INT PRIMARY KEY AUTO_INCREMENT,
id_cliente INT,
fecha DATE,
monto_total DECIMAL(10, 2),
valor_descuento INT NOT NULL,
FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE ON UPDATE CASCADE
);