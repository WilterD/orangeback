CREATE TABLE trabajadores (
id_nombre VARCHAR(50) NOT NULL,
id_cargo VARCHAR(50) NOT NULL,
id_telefono VARCHAR(15),
id_direccion VARCHAR(50),
sueldo int NOT NULL,

FOREIGN KEY (id_cargo) REFERENCES cargos(id_cargo) ON DELETE RESTRICT ON UPDATE CASCADE,

FOREIGN KEY (id_nombre) REFERENCES personales(nombre) ON DELETE CASCADE ON UPDATE CASCADE,

FOREIGN KEY (id_telefono) REFERENCES personales(telefono) ON DELETE CASCADE ON UPDATE CASCADE,

FOREIGN KEY (id_direccion) REFERENCES personales(direccion) ON DELETE CASCADE ON UPDATE CASCADE

);