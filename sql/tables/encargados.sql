CREATE TABLE encargados (
dni_encargado VARCHAR(15) PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
tlf_main VARCHAR(15),
tlf_secondary VARCHAR(15),
direccion_encargado VARCHAR(50),
mail_encargado VARCHAR(50),
id_charge INT,
FOREIGN KEY (id_charge) REFERENCES charges(id_charge) ON DELETE CASCADE ON UPDATE CASCADE
);