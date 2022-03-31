INSERT INTO department (name)
VALUES
    ('human_resources'),
    ('sales'),
    ('accounting'),
    ('management');
INSERT INTO roles (title, salary, department_id)
VALUES
    ('salesman', 50, 2),
    ('accountant', 60, 3),
    ('manager', 70, 4);
INSERT INTO employees (first_name, last_name, department_id, role_id, manager_id)
VALUES
    ('jaxon', 'adams', 4, 3, null),
    ('paige', 'davis', 2, 1, 1),
    ('brea', 'adams', 3, 2, 1);