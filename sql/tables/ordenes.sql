CREATE TABLE ordenes (
id_orden INT NOT NULL AUTO_INCREMENT,
id_servicio INT NOT NULL,
id_vehiculo INT NOT NULL,
id_dueño INT NOT NULL,
autorizacion_recogida VARCHAR(50),
fecha_entrada DATE NOT NULL,
hora_entrada TIME NOT NULL,
fecha_salida_estimada DATE NOT NULL,
hora_salida_estimada TIME NOT NULL,
fecha_salida_real DATE,
hora_salida_real TIME,
id_personal_recogida INT,
PRIMARY KEY (id_orden),
FOREIGN KEY (id_servicio) REFERENCES Servicio(id_servicio) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_vehiculo, id_dueño) REFERENCES Vehiculo(id_vehiculo, id_dueño) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_personal_recogida) REFERENCES Personal(id_personal) ON DELETE CASCADE ON UPDATE CASCADE
);