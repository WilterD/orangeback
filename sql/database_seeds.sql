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

INSERT INTO states (
  name,
  created_at
) VALUES
  ('Bolívddar', '23-07-2023');

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
  description, 
  created_at
) VALUES 
  ('Analista de seguridad', '2013-10-10 12:12:12'),
  ('Desarrollador web', '2022-01-01 10:00:00'),
  ('Analista de datos', '2022-02-15 14:30:00'),
  ('Ingeniero de software', '2022-03-28 09:45:00'),
  ('Especialista en marketing digital', '2022-04-10 13:15:00'),
  ('Diseñador gráfico', '2022-05-05 11:00:00'),
  ('Gestor de proyectos', '2022-06-20 15:30:00'),
  ('Ingeniero de redes', '2022-07-12 12:00:00'),
  ('Contador', '2022-08-08 09:00:00'),
  ('Asistente administrativo', '2022-09-04 14:45:00'),
  ('Especialista en recursos humanos', '2022-10-22 10:30:00');

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

-- Bookings_Per_Services

-- Orders

-- Order_Details

-- Bills

-- Payments

-- Card_Banks

-- Supply Lines

-- Products

-- Products_Per_Agencies

-- Products_In_Order_Details
