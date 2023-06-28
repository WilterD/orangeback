CREATE TABLE reservas (
id_reserva INT NOT NULL AUTO_INCREMENT,
id_cliente INT NOT NULL,
id_vehiculo INT NOT NULL,
fecha_exped DATE NOT NULL,
fecha_expir DATE NOT NULL,
hora TIME NOT NULL,
PRIMARY KEY (id_reserva),
FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo) ON DELETE CASCADE ON UPDATE CASCADE
);