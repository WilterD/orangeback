CREATE TABLE ordenes (
id_orden INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
cedula_responsable VARCHAR(15) NOT NULL,
nombre_responsable VARCHAR(50) NOT NULL,
fecha_entrada DATE NOT NULL,
hora_entrada TIME NOT NULL,
fecha_salida_estimada DATE NOT NULL,
hora_salida_estimada TIME NOT NULL,
fecha_salida_real DATE,                          
hora_salida_real TIME,
id_reserva INT,
cedula_trabajador VARCHAR(15),
id_servicio INT NOT NULL,
FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (cedula_trabajador) REFERENCES trabajadores(cedula_trabajador) ON DELETE CASCADE ON UPDATE CASCADE
);