CREATE TABLE services (
id_service INT PRIMARY KEY,
nombre_services VARCHAR(50) NOT NULL,
description VARCHAR(255) NOT NULL,
cost_hora DECIMAL(10, 2) NOT NULL,
);