-- admins

INSERT INTO admins (
  name,
  email,
  password
) VALUES
  ('Wilter Díaz', 'wddiaz.20@est.ucab.edu.ve', '$2b$10$uCAyTLRklMt/MbuGmrwRq.xE.8Wjlwio5K7H8CwIh00rYsf36UuSi'),
  ('Héctor Ferrer', 'heferrer.19@est.ucab.edu.ve', '$2b$10$uCAyTLRklMt/MbuGmrwRq.xE.8Wjlwio5K7H8CwIh00rYsf36UuSi'),
  ('Victor Freitas', 'vmfreitas.21@est.ucab.edu.ve', '$2b$10$uCAyTLRklMt/MbuGmrwRq.xE.8Wjlwio5K7H8CwIh00rYsf36UuSi'),
  ('Aurimart García', 'algarcia.21@est.ucab.edu.ve', '$2b$10$uCAyTLRklMt/MbuGmrwRq.xE.8Wjlwio5K7H8CwIh00rYsf36UuSi'),
  ('Alejandro Rosas', 'ajrosas.19@est.ucab.edu.ve', '$2b$10$uCAyTLRklMt/MbuGmrwRq.xE.8Wjlwio5K7H8CwIh00rYsf36UuSi'),
  ('Franklin Bello', 'fbelloca@ucab.edu.ve', '$2b$10$uCAyTLRklMt/MbuGmrwRq.xE.8Wjlwio5K7H8CwIh00rYsf36UuSi');

-- states

INSERT INTO states (
  name
) VALUES
  ('Bolívar'),
  ('Distrito Capital'),
  ('Falcón'),
  ('Monagas'),
  ('Mérida'),
  ('Miranda');

-- cities

INSERT INTO cities (
  name,
  state_id
) VALUES
  ('Ciudad Bolívar', 1),
  ('Ciudad Guayana', 1),
  ('Upata', 1),
  ('Caracas', 2),
  ('Coro', 3),
  ('Punto Fijo', 3),
  ('Maturín', 4),
  ('Caripe', 4),
  ('Mérida', 5),
  ('Tovar', 5),
  ('Los Teques', 6),
  ('Los Altos', 6),
  ('Guarenas', 6),
  ('Guatire', 6);

-- managers

INSERT INTO managers (
  manager_dni, 
  name, 
  main_phone, 
  secondary_phone, 
  address, 
  email
) VALUES 
  ('12345678', 'Juan Pérez', '912345678', '654321987', 'Calle Mayor 1', 'juan.perez@email.com'),
  ('23456789', 'Ana García', '912345679', '654321986', 'Calle Mayor 2', 'ana.garcia@email.com'),
  ('34567890', 'Pedro Sánchez', '912345680', '654321985', 'Calle Mayor 3', 'pedro.sanchez@email.com'),
  ('45678901', 'María Rodríguez', '912345681', '654321984', 'Calle Mayor 4', 'maria.rodriguez@email.com'),
  ('56789012', 'Luis Martínez', '912345682', '654321983', 'Calle Mayor 5', 'luis.martinez@email.com'),
  ('67890123', 'Marta Ramírez', '912345683', '654321982', 'Calle Mayor 6', 'marta.ramirez@email.com'),
  ('78901234', 'Antonio Fernández', '912345684', '654321981', 'Calle Mayor 7', 'antonio.fernandez@email.com'),
  ('89012345', 'Sara López', '912345685', '654321980', 'Calle Mayor 8', 'sara.lopez@email.com'),
  ('90123456', 'Carlos Gómez', '912345686', '654321979', 'Calle Mayor 9', 'carlos.gomez@email.com'),
  ('01234567', 'Laura Pérez', '912345687', '654321978', 'Calle Mayor 10', 'laura.perez@email.com');

-- agencies

INSERT INTO agencies (
  agency_rif, 
  business_name, 
  manager_dni, 
  city_id
) VALUES 
  ('1', 'JKL Agency', '12345678', 1),
  ('2', 'MNO Agency', '23456789', 2),
  ('3', 'PQR Agency', '34567890', 3),
  ('4', 'STU Agency', '45678901', 4),
  ('5', 'VWX Agency', '56789012', 5),
  ('6', 'YZA Agency', '67890123', 6),
  ('7', 'BCD Agency', '78901234', 7),
  ('8', 'EFG Agency', '89012345', 8),
  ('9', 'HIJ Agency', '90123456', 9),
  ('10', 'KLM Agency', '01234567', 10);

-- discounts

INSERT INTO discounts (
  percentage,
  services_min,
  services_max,
  agency_rif
) VALUES
  (5, 2, 3, 1),
  (15, 4, 7, 1),
  (20, 8, 99, 1),
  (10, 3, 6, 2),
  (15, 4, 15, 2),
  (5, 1, 2, 3),
  (10, 3, 5, 3),
  (15, 6, 8, 3),
  (25, 9, 15, 3);

-- jobs

INSERT INTO jobs (
  description
) VALUES 
  ('Analista de seguridad'),
  ('Desarrollador web'),
  ('Analista de datos'),
  ('Ingeniero de software'),
  ('Especialista en marketing digital'),
  ('Diseñador gráfico'),
  ('Gestor de proyectos'),
  ('Ingeniero de redes'),
  ('Contador'),
  ('Asistente administrativo'),
  ('Especialista en recursos humanos');

-- employees

INSERT INTO employees (
  employee_dni, 
  name, 
  phone, 
  address, 
  salary, 
  agency_rif, 
  job_id
) VALUES
  ('444555666', 'Alex Brown', '5554444', '789 Oak St', 5500.00, '1', 2),
  ('555666777', 'Jessica Lee', '5555555', '123 Main St', 6000.00, '2', 3),
  ('666777888', 'Michael Johnson', '5556666', '456 Elm St', 7000.00, '3', 1),
  ('777888999', 'David Kim', '5557777', '123 Main St', 5500.00, '3', 2),
  ('888999000', 'Lisa Patel', '5558888', '456 Elm St', 6000.00, '4', 3),
  ('999000111', 'Kevin Lee', '5559999', '789 Oak St', 7000.00, '4', 1),
  ('000111222', 'Laura Davis', '5550000', '123 Main St', 5500.00, '5', 2),
  ('111222333', 'Steve Park', '5551111', '456 Elm St', 6000.00, '5', 3),
  ('222333444', 'Jenny Kim', '5552222', '789 Oak St', 7000.00, '6', 1),
  ('333444555', 'Daniel Lee', '5553333', '123 Main St', 5500.00, '6', 2);

-- clients

INSERT INTO clients (
  client_dni, 
  name,
  email,
  main_phone, 
  secondary_phone
) VALUES
  ('12345678', 'Pedro Pérez', 'pedro.perez@gmail.com', '04121234567', '02121234567'),
  ('23456789', 'María González', 'maria.gonzalez@hotmail.com', '04241234567', '02121234567'),
  ('34567890', 'Juan Rodríguez', 'juan.rodriguez@yahoo.com', '04161234567', '02121234567'),
  ('45678901', 'Ana Ruiz', 'ana.ruiz@gmail.com', '04261234567', '02121234567'),
  ('56789012', 'Carlos Hernández', 'carlos.hernandez@hotmail.com', '04181234567', '02121234567'),
  ('67890123', 'Gabriela Sánchez', 'gabriela.sanchez@yahoo.com', '04281234567', '02121234567'),
  ('78901234', 'Luisa Martínez', 'luisa.martinez@gmail.com', '04191234567', '02121234567'),
  ('89012345', 'Jorge Gómez', 'jorge.gomez@hotmail.com', '04291234567', '02121234567'),
  ('90123456', 'Mónica Pérez', 'monica.perez@yahoo.com', '04121234568', '02121234569'),
  ('01234567', 'José González', 'jose.gonzalez@gmail.com', '04121234569', '02121234568'),
  ('11111111', 'José Pñrez 🎉', 'jose.perez@gmail.com', '04121234567', '02121234567');

-- models

INSERT INTO models (
  model_id,
  brand,
  description, 
  model_kg, 
  model_year, 
  seats_quantity, 
  refrigerant_type, 
  engine_oil_type,
  oil_box,
  octane
) VALUES
  ('Civic', 'Honda', 'morado viejo', 190,'2003', 4, 'organico', 'gasolina', 'Motul 100318', 95),
  ('Aveo', 'Chevrolett', 'Azul nuevo', 170,'2002', 3, 'inorganico', 'gasolina', 'Motul 100314', 95),
  ('Model S', 'Tesla', 'Rojo viejo', 140,'2001', 2, 'organico', 'gasolina', 'Motul 100318', 91),
  ('Evolution', 'Mitsubishi', 'Negro cromado', 120,'2013', 1, 'inorganico', 'gasolina', 'Motul 100318', 95),
  ('Odyssea', 'Honda', 'Rosa y Vinotinto', 156 ,'2020', 4, 'organico', 'gasolina', 'Motul 100318', 95);

-- Vehicles

INSERT INTO vehicles (
  license_plate,
  nro_serial,
  nro_motor,
  sale_date,
  color,
  extra_descriptions,
  maintenance_summary,
  agency_seller,
  model_id,
  client_dni
) VALUES
  ('BB123FG', '1G1BL52P2TR115520', 'K20A2-1234567', '2003-10-15', 'Amarillo', 'bonito', 'cada 3 años', 'Agencias Buenos Aires', 'Civic', '12345678'),
  ('CC456TH', 'JTEBU5JR3G5340762', '1NZ-FE-9876543', '2001-09-10', 'Negro', 'feo', 'cada 4 años', 'Agencias Todo bien', 'Aveo', '12345678'),
  ('DD789JK', '5FNRL5H66EB104579', 'LS2-3456789', '2013-12-20', 'Blanco', 'bonito', 'cada 2 años', 'Agencias Madrid', 'Model S', '89012345'),
  ('EE012MN', '1C4HJXDG5JW287685', 'F20C1-2345678', '2023-01-30', 'Rojo', 'medio medio', 'cada año', 'Agencias Barinas', 'Evolution', '90123456'),
  ('FF345PR', '3FA6P0HD9JR137451', 'B16B-1234567', '2006-03-01', 'Azul', 'xd', 'cada 3 meses', 'Agencias Barcelona', 'Odyssea', '23456789');

-- Services

INSERT INTO services (
  description
) VALUES 
  ('Mantenimiento de frenos'),
  ('Reparación de motor'),
  ('Cambio de llantas'),
  ('Lavado de auto'),
  ('Cambio de batería');

-- Activities

INSERT INTO activities (
  service_id, 
  description, 
  cost_hour
) VALUES 
  (1, 'Revisión de pastillas de freno', 25.00),
  (1, 'Cambio de pastillas de freno', 50.00),
  (1, 'Cambio de discos de freno', 75.00),
  (1, 'Sangrado del sistema de frenos', 40.00),
  (2, 'Revisión y diagnóstico de motor', 50.00),
  (2, 'Reemplazo de bujías', 35.00),
  (2, 'Reemplazo de correa de distribución', 100.00),
  (2, 'Reemplazo de bomba de agua', 80.00),
  (3, 'Retiro de llantas antiguas', 10.00),
  (3, 'Instalación de llantas nuevas', 20.00),
  (3, 'Balanceo de llantas', 15.00),
  (3, 'Alineación de llantas', 30.00),
  (4, 'Lavado exterior a mano', 20.00),
  (4, 'Lavado de llantas y neumáticos', 10.00),
  (4, 'Limpieza de ventanas', 10.00),
  (4, 'Aspirado de alfombras y asientos', 30.00),
  (5, 'Retiro de batería antigua', 10.00),
  (5, 'Instalación de batería nueva', 30.00),
  (5, 'Verificación de carga del alternador', 20.00),
  (5, 'Conexión de bornes y cableado', 15.00);

-- Services_Per_Models

-- Employee_Specialties

INSERT INTO employees_specialties (
  employee_dni, 
  service_id
) VALUES
  ('444555666', 1),
  ('555666777', 2),
  ('666777888', 3),
  ('777888999', 1),
  ('888999000', 4),
  ('999000111', 5),
  ('000111222', 2),
  ('111222333', 3),
  ('222333444', 4),
  ('333444555', 5);

-- Employees_Coordinates_Services

INSERT INTO employees_coordinate_services (
  employee_dni,
  service_id,
  reservation_time,
  capacity
) VALUES
  ('444555666', 1,2,3),
  ('555666777', 2,3,4),
  ('666777888', 3,4,2),
  ('777888999', 4,3,4),
  ('888999000', 5,4,6),
  ('999000111', 1,2,2),
  ('000111222', 2,4,3),
  ('111222333', 3,5,4),
  ('222333444', 4,6,5),
  ('333444555', 5,7,6);

-- Bookings

INSERT INTO bookings (
  expedition_date, 
  expiration_date, 
  client_dni, 
  license_plate
) VALUES
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '1 DAY', '12345678', 'BB123FG'),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '2 DAY', '12345678', 'CC456TH'),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '3 DAY', '12345678', 'BB123FG'),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '4 DAY', '89012345', 'DD789JK'),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '5 DAY', '90123456', 'EE012MN'),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '6 DAY', '23456789', 'FF345PR'),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '7 DAY', '12345678', 'BB123FG'),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '8 DAY', '89012345', 'DD789JK'),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '9 DAY', '90123456', 'EE012MN'),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '10 DAY', '23456789', 'FF345PR');

-- Bookings_Per_Services

INSERT INTO bookings_per_services (
  booking_id, 
  service_id
) VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5),
  (6, 1),
  (7, 2),
  (8, 3),
  (9, 4),
  (10, 5);

-- Orders

-- Order_Details

-- Bills

-- Payments

-- Card_Banks

-- Supply Lines

INSERT INTO supply_lines (
  name
) VALUES 
  ('Neumáticos'),
  ('Baterías'),
  ('Filtros de aceite'),
  ('Líquido de frenos'),
  ('Aceite de motor');

-- Products
INSERT INTO Products(
  product_id,
  short_name_product,
  description,
  provider,
  is_ecological,
  price,
  supply_line_id  
)VALUES
  ('12345678','agua','un liquido','minerales atlantico', true, 200, 1),
  ('1234567','aceite', 'un liquido que le da energia al vehiculo', 'minerales atlantico', true, 200, 2),
  ('123456','neumatico br12 mitsubishi','un complemento del vehiculo','minerales atlantico', false, 140, 3),
  ('12345','filtro','un complemento del vehiculo','minerales atlantico', true, 240, 4),
  ('1234','motor','un complemento del vehiculo','minerales atlantico', false, 300, 5);
-- Products_Per_Agencies

INSERT INTO products_per_agencies (
  product_id,
  agency_rif,
  on_stock,
  max_capacity,
  min_capacity
) VALUES 
  ('12345678', '1', 100, 500, 50),
  ( '1234567', '2', 50, 200, 20),
  ('123456', '3', 200, 800, 80),
  ('12345', '4', 150, 600, 60),
  ('1234', '5', 300, 1200, 120);
-- Products_In_Order_Details
