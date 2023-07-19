-- Carácteres de español que dan problemas 
-- al hacer inserción directa

-- Carácter || Correspondiente en Postgres
-- á || ß 
-- é || Ú
-- í || Ý
-- ó || ¾
-- ú || ·
-- Á || ┴
-- É || ╔
-- Í || ═
-- Ó || Ë
-- Ú || ┌
-- ñ || ±
-- ¿ || ┐

-- admins

INSERT INTO admins (
  name,
  email,
  password
) VALUES
  ('Wilter DÝaz', 'wddiaz.20@est.ucab.edu.ve', '$2b$10$uCAyTLRklMt/MbuGmrwRq.xE.8Wjlwio5K7H8CwIh00rYsf36UuSi'),
  ('HÚctor Ferrer', 'heferrer.19@est.ucab.edu.ve', '$2b$10$uCAyTLRklMt/MbuGmrwRq.xE.8Wjlwio5K7H8CwIh00rYsf36UuSi'),
  ('Victor Freitas', 'vmfreitas.21@est.ucab.edu.ve', '$2b$10$uCAyTLRklMt/MbuGmrwRq.xE.8Wjlwio5K7H8CwIh00rYsf36UuSi'),
  ('Aurimart GarcÝa', 'algarcia.21@est.ucab.edu.ve', '$2b$10$uCAyTLRklMt/MbuGmrwRq.xE.8Wjlwio5K7H8CwIh00rYsf36UuSi'),
  ('Alejandro Rosas', 'ajrosas.19@est.ucab.edu.ve', '$2b$10$uCAyTLRklMt/MbuGmrwRq.xE.8Wjlwio5K7H8CwIh00rYsf36UuSi'),
  ('Franklin Bello', 'fbelloca@ucab.edu.ve', '$2b$10$uCAyTLRklMt/MbuGmrwRq.xE.8Wjlwio5K7H8CwIh00rYsf36UuSi');

-- states

INSERT INTO states (
  name
) VALUES
  ('BolÝvar'),
  ('Distrito Capital'),
  ('Falc¾n'),
  ('Monagas'),
  ('MÚrida'),
  ('Miranda');

-- cities

INSERT INTO cities (
  name,
  state_id
) VALUES
  ('Ciudad BolÝvar', 1),
  ('Ciudad Guayana', 1),
  ('Upata', 1),
  ('Caracas', 2),
  ('Coro', 3),
  ('Punto Fijo', 3),
  ('MaturÝn', 4),
  ('Caripe', 4),
  ('MÚrida', 5),
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
  ('12345678', 'Juan PÚrez', '912345678', '654321987', 'Calle Mayor 1', 'juan.perez@email.com'),
  ('23456789', 'Ana GarcÝa', '912345679', '654321986', 'Calle Mayor 2', 'ana.garcia@email.com'),
  ('34567890', 'Pedro Sßnchez', '912345680', '654321985', 'Calle Mayor 3', 'pedro.sanchez@email.com'),
  ('45678901', 'MarÝa RodrÝguez', '912345681', '654321984', 'Calle Mayor 4', 'maria.rodriguez@email.com'),
  ('56789012', 'Luis MartÝnez', '912345682', '654321983', 'Calle Mayor 5', 'luis.martinez@email.com'),
  ('67890123', 'Marta RamÝrez', '912345683', '654321982', 'Calle Mayor 6', 'marta.ramirez@email.com'),
  ('78901234', 'Antonio Fernßndez', '912345684', '654321981', 'Calle Mayor 7', 'antonio.fernandez@email.com'),
  ('89012345', 'Sara L¾pez', '912345685', '654321980', 'Calle Mayor 8', 'sara.lopez@email.com'),
  ('90123456', 'Carlos G¾mez', '912345686', '654321979', 'Calle Mayor 9', 'carlos.gomez@email.com'),
  ('01234567', 'Laura PÚrez', '912345687', '654321978', 'Calle Mayor 10', 'laura.perez@email.com');

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
  ('Dise±ador grßfico'),
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
  ('444555666', 'Alex Brown', '5554444', '789 Oak St', 5500.00, '1', 1),
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
  ('12345678', 'Pedro PÚrez', 'pedro.perez@gmail.com', '04121234567', '02121234567'),
  ('23456789', 'MarÝa Gonzßlez', 'maria.gonzalez@hotmail.com', '04241234567', '02121234567'),
  ('34567890', 'Juan RodrÝguez', 'juan.rodriguez@yahoo.com', '04161234567', '02121234567'),
  ('45678901', 'Ana Ruiz', 'ana.ruiz@gmail.com', '04261234567', '02121234567'),
  ('56789012', 'Carlos Hernßndez', 'carlos.hernandez@hotmail.com', '04181234567', '02121234567'),
  ('67890123', 'Gabriela Sßnchez', 'gabriela.sanchez@yahoo.com', '04281234567', '02121234567'),
  ('78901234', 'Luisa MartÝnez', 'luisa.martinez@gmail.com', '04191234567', '02121234567'),
  ('89012345', 'Jorge G¾mez', 'jorge.gomez@hotmail.com', '04291234567', '02121234567'),
  ('90123456', 'M¾nica PÚrez', 'monica.perez@yahoo.com', '04121234568', '02121234569'),
  ('01234567', 'JosÚ Gonzßlez', 'jose.gonzalez@gmail.com', '04121234569', '02121234568'),
  ('11111111', 'JosÚ P±rez 🎉', 'jose.perez@gmail.com', '04121234567', '02121234567');

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
  ('BB123FG', '1G1BL52P2TR115520', 'K20A2-1234567', '2003-10-15', 'Amarillo', 'bonito', 'cada 3 a±os', 'Agencias Buenos Aires', 'Civic', '12345678'),
  ('CC456TH', 'JTEBU5JR3G5340762', '1NZ-FE-9876543', '2001-09-10', 'Negro', 'feo', 'cada 4 a±os', 'Agencias Todo bien', 'Aveo', '12345678'),
  ('DD789JK', '5FNRL5H66EB104579', 'LS2-3456789', '2013-12-20', 'Blanco', 'bonito', 'cada 2 a±os', 'Agencias Madrid', 'Model S', '89012345'),
  ('EE012MN', '1C4HJXDG5JW287685', 'F20C1-2345678', '2023-01-30', 'Rojo', 'medio medio', 'cada a±o', 'Agencias Barinas', 'Evolution', '90123456'),
  ('FF345PR', '3FA6P0HD9JR137451', 'B16B-1234567', '2006-03-01', 'Azul', 'xd', 'cada 3 meses', 'Agencias Barcelona', 'Odyssea', '23456789');

-- Services

INSERT INTO services (
  description
) VALUES 
  ('Mantenimiento de frenos'),
  ('Reparaci¾n de motor'),
  ('Cambio de llantas'),
  ('Lavado de auto'),
  ('Cambio de baterÝa');

-- Activities

INSERT INTO activities (
  service_id, 
  description, 
  cost_hour
) VALUES 
  (1, 'Revisi¾n de pastillas de freno', 25.00),
  (1, 'Cambio de pastillas de freno', 50.00),
  (1, 'Cambio de discos de freno', 75.00),
  (1, 'Sangrado del sistema de frenos', 40.00),
  (2, 'Revisi¾n y diagn¾stico de motor', 50.00),
  (2, 'Reemplazo de bujÝas', 35.00),
  (2, 'Reemplazo de correa de distribuci¾n', 100.00),
  (2, 'Reemplazo de bomba de agua', 80.00),
  (3, 'Retiro de llantas antiguas', 10.00),
  (3, 'Instalaci¾n de llantas nuevas', 20.00),
  (3, 'Balanceo de llantas', 15.00),
  (3, 'Alineaci¾n de llantas', 30.00),
  (4, 'Lavado exterior a mano', 20.00),
  (4, 'Lavado de llantas y neumßticos', 10.00),
  (4, 'Limpieza de ventanas', 10.00),
  (4, 'Aspirado de alfombras y asientos', 30.00),
  (5, 'Retiro de baterÝa antigua', 10.00),
  (5, 'Instalaci¾n de baterÝa nueva', 30.00),
  (5, 'Verificaci¾n de carga del alternador', 20.00),
  (5, 'Conexi¾n de bornes y cableado', 15.00);

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
  agency_rif,
  expedition_date, 
  expiration_date, 
  client_dni, 
  license_plate
) VALUES
  -- ('1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '1 DAY', '12345678', 'BB123FG'),
  -- ('1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '2 DAY', '12345678', 'CC456TH'),
  -- ('1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '3 DAY', '12345678', 'BB123FG'),
  -- ('1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '4 DAY', '89012345', 'DD789JK'),
  -- ('1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '5 DAY', '90123456', 'EE012MN'),
  -- ('1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '6 DAY', '23456789', 'FF345PR'),
  -- ('1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '7 DAY', '12345678', 'BB123FG'),
  -- ('1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '8 DAY', '89012345', 'DD789JK'),
  -- ('1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '9 DAY', '90123456', 'EE012MN'),
  -- ('1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '10 DAY', '23456789', 'FF345PR'),
  -- Reservas que no pasaron
  ('1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '1 MINUTE', '12345678', 'BB123FG'),
  ('1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '1 MINUTE', '89012345', 'DD789JK'),
  ('1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '1 MINUTE', '12345678', 'BB123FG');
  
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

INSERT INTO orders (
  responsible_dni, 
  responsible_name, 
  entry_time, 
  estimated_departure, 
  real_departure, 
  booking_id, 
  employee_dni
) VALUES
  (null, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '2 HOUR', null, 1, '444555666'),
  (null, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '2 HOUR', null, 2, '555666777'),
  (null, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '2 HOUR', null, 3, '666777888'),
  (null, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '2 HOUR', null, 4, '777888999'),
  (null, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '2 HOUR', null, 5, '888999000'),
  (null, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '2 HOUR', null, 6, '999000111'),
  (null, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '2 HOUR', null, 7, '555666777'),
  (null, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '2 HOUR', null, 8, '666777888'),
  (null, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '2 HOUR', null, 9, '777888999'),
  (null, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '2 HOUR', null, 10, '888999000');

-- Order_Details

INSERT INTO order_details (
  order_id,
  service_id,
  activity_id,
  employee_dni,
  cost_hour,
  hours_taken
) VALUES 
  (1, 1, 1, '444555666', 25, 2),
  (1, 1, 2, '444555666', 50, 4);

-- Bills

INSERT INTO bills (
  bill_date,
  order_id
) VALUES 
  ('2023-07-15', 1),
  ('2023-07-14', 2),
  ('2023-07-13', 3),
  ('2023-07-12', 4),
  ('2023-07-11', 5),
  ('2023-07-10', 6),
  ('2023-07-09', 7),
  ('2023-07-08', 8),
  ('2023-07-07', 9),
  ('2023-07-06', 10);

-- Card_Banks

INSERT INTO card_banks (
  card_number, 
  bank
) VALUES 
  ('1234567890123456', 'Banco Mercantil'),
  ('9876543210987654', 'Banco Banesco'),
  ('4567890123456789', 'Banco Provincial'),
  ('3210987654321098', 'Banca amiga'),
  ('6543210987654321', 'Banco Nacional de Credito'),
  ('2345678901234567', 'Banco de Venezuela'),
  ('7654321098765432', 'Banco Fondo Comun'),
  ('3456789012345678', 'Banco del Tesoro'),
  ('8901234567890123', 'Banco Delsur'),
  ('2109876543210987', 'Banco de Bicentenario');

-- Payments

INSERT INTO payments (
  bill_id, 
  payment_id, 
  amount, 
  payment_date, 
  payment_method, 
  card_number
) VALUES
  (1,1, 100, CURRENT_TIMESTAMP, 'TC', '1234567890123456'),
  (1,2, 100, CURRENT_TIMESTAMP, 'TC', '8901234567890123'),
  (2,1, 100, CURRENT_TIMESTAMP, 'T', '9876543210987654'),
  (2,2, 100, CURRENT_TIMESTAMP, 'TC', '2109876543210987'),
  (3,1, 100, CURRENT_TIMESTAMP, 'E', '4567890123456789'),
  (4,1, 100, CURRENT_TIMESTAMP, 'D', '3210987654321098'),
  (5,1, 100, CURRENT_TIMESTAMP, 'TD', '6543210987654321'),
  (6,1, 100, CURRENT_TIMESTAMP, 'TC', '2345678901234567'),
  (7,1, 100, CURRENT_TIMESTAMP, 'TC', '7654321098765432'),
  (8,1, 100, CURRENT_TIMESTAMP, 'TC', '3456789012345678');

-- Supply Lines

INSERT INTO supply_lines (
  name
) VALUES 
  ('Neumßticos'),
  ('BaterÝas'),
  ('Filtros de aceite'),
  ('LÝquido de frenos'),
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
  ('12345678','Mobil Super 10w-30','aceite de motor','Premium Motor Oil', true, 200, 1),
  ('12345679','Filtro de combustible Diesel L 200', 'Filtro de combustible', 'BLUE PRINT', true, 124, 2),
  ('12345680','neumatico Mirage At172 mitsubishi','Neumatico','Mirage', false, 300, 3),
  ('12345681','Kubota v1505 turbo diesel','Motor','Kubota', true, 1000, 4),
  ('12345682','Tubo de escape intermedio chevrolet aveo','tubo de escape','Celerid', false, 90, 5);

-- Products_Per_Agencies

INSERT INTO products_per_agencies (
  product_id,
  agency_rif,
  on_stock,
  min_capacity,
  max_capacity
) VALUES 
  ('12345679', '1', 50, 20, 200),
  ('12345680', '2', 200, 80, 800),
  ('12345681', '2', 150, 60, 600),
  ('12345682', '3', 300, 120, 1200);

-- Products_In_Order_Details  

INSERT INTO products_in_order_details (
    order_id,
    service_id,
    activity_id,
    product_id,
    price,
    quantity
) VALUES 
  (1, 1, 1, '12345678', 50, 3);
