CREATE TABLE personales (
dni_personales VARCHAR(15) NOT NULL,
nombre VARCHAR(50) NOT NULL,
id_charge VARCHAR(50),
telefono VARCHAR(15),
direccion VARCHAR(50),

PRIMARY KEY (dni_personales),

FOREIGN KEY (id_charge) REFERENCES charges(id_charge) ON DELETE CASCADE ON UPDATE CASCADE,

);