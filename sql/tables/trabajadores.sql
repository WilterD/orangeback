CREATE TABLE trabajadores (
    dni_worker VARCHAR(15),
    nombre_trabajador VARCHAR(50) NOT NULL,
    telefono_trabajador VARCHAR(15),
    direccion_trabajador VARCHAR(50),
    sueldo int NOT NULL,
    id_charge VARCHAR(50) NOT NULL,

    PRIMARY KEY (dni_worker),



    FOREIGN KEY (id_charge) REFERENCES charges(id_charge) ON DELETE RESTRICT ON UPDATE CASCADE,





);