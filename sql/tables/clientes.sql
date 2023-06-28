CREATE TABLE clientes (
cedula_cliente VARCHAR(15) PRIMARY KEY,
nombre_cliente VARCHAR(50) NOT NULL,
telefono_principal VARCHAR(15),
telefono_secundario VARCHAR(15),
direccion VARCHAR(100),
correo_cliente VARCHAR(50)
);