CREATE TABLE pagos (
id_pago INT PRIMARY KEY,
id_bill INT NOT NULL,
fecha DATE NOT NULL,
modalidad_pago VARCHAR(50) NOT NULL,
monto DECIMAL(10, 2) NOT NULL,
num_tarjeta VARCHAR(20),
banco_tarjeta VARCHAR(50),
CONSTRAINT fk_pagos_factura FOREIGN KEY (id_bill) REFERENCES bills(id_bill) ON DELETE CASCADE ON UPDATE CASCADE
);