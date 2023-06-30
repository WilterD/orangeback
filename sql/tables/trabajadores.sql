CREATE TABLE trabajadores (
    cedula_trabajador VARCHAR(15) PRIMARY KEY,
    nombre_trabajador VARCHAR(50) NOT NULL,
    telefono_trabajador VARCHAR(15),
    direccion_trabajador VARCHAR(50),
    sueldo int NOT NULL,
    id_charge VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_charge) REFERENCES charges(id_charge) ON DELETE RESTRICT ON UPDATE CASCADE
);