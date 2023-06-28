CREATE TABLE reservas (
id_reserva INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
fecha_exped DATE NOT NULL,
fecha_expir DATE NOT NULL,
cedula_cliente INT NOT NULL,
id_vehiculo INT NOT NULL,
hora TIME NOT NULL,
FOREIGN KEY (cedula_cliente) REFERENCES clientes(cedula_cliente) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo) ON DELETE CASCADE ON UPDATE CASCADE
);