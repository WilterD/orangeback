CREATE TABLE trabajadores (
    cedula_trabajador VARCHAR(15) PRIMARY KEY,
    nombre_trabajador VARCHAR(50) NOT NULL,
    telefono_trabajador VARCHAR(15),
    direccion_trabajador VARCHAR(50),
    sueldo int NOT NULL,
    id_cargo VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_cargo) REFERENCES cargos(id_cargo) ON DELETE RESTRICT ON UPDATE CASCADE
);