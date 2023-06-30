CREATE TABLE modelos (
codigo_modelo VARCHAR(50),
marca VARCHAR(50) NOT NULL,
nombre VARCHAR(50) NOT NULL,
peso INT NOT NULL,
anio INT NOT NULL,
tipo_refrigerante VARCHAR(50) NOT NULL,
cantidad_puestos INT NOT NULL,
tipo_aceite_motor VARCHAR(50) NOT NULL,
aceite_caja VARCHAR(50) NOT NULL,
octanaje INT NOT NULL,

PRIMARY KEY (codigo_modelo)
);