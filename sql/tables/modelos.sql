CREATE TABLE modelos (
codigo_modelo VARCHAR(50) NOT NULL PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
octanaje INT NOT NULL,
aceite_caja VARCHAR(50) NOT NULL,
id_marca INT NOT NULL,
tipo_refrigerante VARCHAR(50) NOT NULL,
tipo_aceite_motor VARCHAR(50) NOT NULL,
cantidad_puestos INT NOT NULL,
anio INT NOT NULL,
peso INT NOT NULL,
FOREIGN KEY (id_marca) REFERENCES marcas(id_marca)
);