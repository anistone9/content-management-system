INSERT INTO department (department_name)
VALUES ("IT"),
       ("Finance"),
       ("Legal"),
       ("Engineering"),
       ("Quality"),
       ("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 125000, 4),
       ("Lead Engineer", 156000, 4),
       ("Accountant", 116000, 2),
       ("In-House Counsel", 225000, 3),
       ("Network Administrator", 95000, 1),
       ("IT Manager", 110000, 1),
       ("Quality Manager", 168000, 5),
       ("Sales Representative", 121000, 6),
       ("Sales Lead", 142000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Laura", "Marshall", 4, NULL),
       ("James", "Lee", 5, 6),
       ("Divya", "Singh", 8, 9),
       ("Erick", "Santos", 7, NULL),
       ("Maia", "Jones", 1, 2),
       ("Steven", "Diaz", 9, NULL),
       ("Kendra", "Brown", 3, NULL),
       ("Patrick", "Wozniack", 6, NULL),
       ("Keith", "Crowe", 2, NULL);