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
('12345678A', 'Juan Pérez', '912345678', '654321987', 'Calle Mayor 1', 'juan.perez@email.com'),
('23456789B', 'Ana García', '912345679', '654321986', 'Calle Mayor 2', 'ana.garcia@email.com'),
('34567890C', 'Pedro Sánchez', '912345680', '654321985', 'Calle Mayor 3', 'pedro.sanchez@email.com'),
('45678901D', 'María Rodríguez', '912345681', '654321984', 'Calle Mayor 4', 'maria.rodriguez@email.com'),
('56789012E', 'Luis Martínez', '912345682', '654321983', 'Calle Mayor 5', 'luis.martinez@email.com'),
('67890123F', 'Marta Ramírez', '912345683', '654321982', 'Calle Mayor 6', 'marta.ramirez@email.com'),
('78901234G', 'Antonio Fernández', '912345684', '654321981', 'Calle Mayor 7', 'antonio.fernandez@email.com'),
('89012345H', 'Sara López', '912345685', '654321980', 'Calle Mayor 8', 'sara.lopez@email.com'),
('90123456I', 'Carlos Gómez', '912345686', '654321979', 'Calle Mayor 9', 'carlos.gomez@email.com'),
('01234567J', 'Laura Pérez', '912345687', '654321978', 'Calle Mayor 10', 'laura.perez@email.com');

-- agencies

-- discounts

-- jobs

INSERT INTO jobs (description, created_at)
VALUES 
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

-- clients

-- models