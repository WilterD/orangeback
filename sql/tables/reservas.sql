CREATE TABLE reservas (
id_reserve INT NOT NULL,
fecha_exped DATE NOT NULL,
fecha_expir DATE NOT NULL,
dni_client INT NOT NULL,
id_vehiculo INT NOT NULL,
hora TIME NOT NULL,

PRIMARY KEY (id_reserve),

FOREIGN KEY (dni_client) REFERENCES clients(dni_client) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo) ON DELETE CASCADE ON UPDATE CASCADE
);