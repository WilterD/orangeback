-- admins

INSERT INTO admins (
  name,
  email,
  password
) VALUES
  ('Wilter Díaz', 'wddiaz.20@est.ucab.edu.ve', 'o'),
  ('Héctor Ferrer', 'heferrer.19@est.ucab.edu.ve', 'r'),
  ('Victor Freitas', 'vmfreitas.21@est.ucab.edu.ve', 'a'),
  ('Aurimart García', 'algarcia.21@est.ucab.edu.ve', 'n'),
  ('Alejandro Rosas', 'ajrosas.19@est.ucab.edu.ve', 'g'),
  ('Franklin Bello', 'fbelloca@ucab.edu.ve', 'e');

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

--models

-- INSERT INTO

-- discounts

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

-- models