CREATE TABLE Productos (
id_producto INT PRIMARY KEY,
codigo VARCHAR(50) NOT NULL,
nombre_corto VARCHAR(50) NOT NULL,
descriptions VARCHAR(255) NOT NULL,
proveedor VARCHAR(50),
es_ecologico BOOLEAN,
price DECIMAL(10, 2),
existencia INT,
nivel_minimo INT,
nivel_maximo INT
);