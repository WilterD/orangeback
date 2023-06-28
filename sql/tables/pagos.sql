CREATE TABLE pagos (
id_pago INT PRIMARY KEY,
id_factura INT,
fecha DATE,
modalidad_pago VARCHAR(50),
monto DECIMAL(10, 2),
num_tarjeta VARCHAR(20),
banco_tarjeta VARCHAR(50),
FOREIGN KEY (id_factura) REFERENCES Facturas(id_factura) ON DELETE CASCADE ON UPDATE CASCADE
);