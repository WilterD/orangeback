CREATE TABLE encargados (
cedula_encargado VARCHAR(15) PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
telefono_principal VARCHAR(15),
telefono_secundario VARCHAR(15),
direccion_encargado VARCHAR(50),
correo_encargado VARCHAR(50),
id_charge INT,
FOREIGN KEY (id_charge) REFERENCES charges(id_charge) ON DELETE CASCADE ON UPDATE CASCADE
);