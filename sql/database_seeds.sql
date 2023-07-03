-- admins

-- states

-- cities

-- managers
INSERT INTO managers (manager_dni, name, main_phone, secondary_phone, address, email, created_at)
VALUES 
('12345678', 'Juan Pérez', '912345678', '654321987', 'Calle Mayor 1', 'juan.perez@email.com', CURRENT_TIMESTAMP),
('23456789', 'Ana García', '912345679', '654321986', 'Calle Mayor 2', 'ana.garcia@email.com', CURRENT_TIMESTAMP),
('34567890', 'Pedro Sánchez', '912345680', '654321985', 'Calle Mayor 3', 'pedro.sanchez@email.com', CURRENT_TIMESTAMP),
('45678901', 'María Rodríguez', '912345681', '654321984', 'Calle Mayor 4', 'maria.rodriguez@email.com', CURRENT_TIMESTAMP),
('56789012', 'Luis Martínez', '912345682', '654321983', 'Calle Mayor 5', 'luis.martinez@email.com', CURRENT_TIMESTAMP),
('67890123', 'Marta Ramírez', '912345683', '654321982', 'Calle Mayor 6', 'marta.ramirez@email.com', CURRENT_TIMESTAMP),
('78901234', 'Antonio Fernández', '912345684', '654321981', 'Calle Mayor 7', 'antonio.fernandez@email.com', CURRENT_TIMESTAMP),
('89012345', 'Sara López', '912345685', '654321980', 'Calle Mayor 8', 'sara.lopez@email.com', CURRENT_TIMESTAMP),
('90123456', 'Carlos Gómez', '912345686', '654321979', 'Calle Mayor 9', 'carlos.gomez@email.com', CURRENT_TIMESTAMP),
('01234567', 'Laura Pérez', '912345687', '654321978', 'Calle Mayor 10', 'laura.perez@email.com', CURRENT_TIMESTAMP);

-- agencies

-- discounts

-- jobs

-- employees

INSERT INTO employees (employee_dni, name, phone, address, salary, agency_rif, job_id, created_at)
VALUES
('444555666', 'Alex Brown', '5554444', '789 Oak St', 5500.00, '2', 2, CURRENT_TIMESTAMP),
('555666777', 'Jessica Lee', '5555555', '123 Main St', 6000.00, '2', 3, CURRENT_TIMESTAMP),
('666777888', 'Michael Johnson', '5556666', '456 Elm St', 7000.00, '3', 1, CURRENT_TIMESTAMP),
('777888999', 'David Kim', '5557777', '123 Main St', 5500.00, '3', 2, CURRENT_TIMESTAMP),
('888999000', 'Lisa Patel', '5558888', '456 Elm St', 6000.00, '4', 3, CURRENT_TIMESTAMP),
('999000111', 'Kevin Lee', '5559999', '789 Oak St', 7000.00, '4', 1, CURRENT_TIMESTAMP),
('000111222', 'Laura Davis', '5550000', '123 Main St', 5500.00, '5', 2, CURRENT_TIMESTAMP),
('111222333', 'Steve Park', '5551111', '456 Elm St', 6000.00, '5', 3, CURRENT_TIMESTAMP),
('222333444', 'Jenny Kim', '5552222', '789 Oak St', 7000.00, '6', 1, CURRENT_TIMESTAMP),
('333444555', 'Daniel Lee', '5553333', '123 Main St', 5500.00, '6', 2, CURRENT_TIMESTAMP);

-- clients

-- models