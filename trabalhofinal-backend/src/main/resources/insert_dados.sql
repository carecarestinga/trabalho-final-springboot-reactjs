/*
-- Query: SELECT * FROM trabalhofinal.cargo
LIMIT 0, 1000

-- Date: 2018-07-06 01:06
*/
INSERT INTO `cargo` (`id`,`descricao`,`nome`) VALUES (1,'cargo 1','cargo 1');
INSERT INTO `cargo` (`id`,`descricao`,`nome`) VALUES (2,'cargo 2','cargo 2');
INSERT INTO `cargo` (`id`,`descricao`,`nome`) VALUES (3,'cargo 3','cargo 3');
INSERT INTO `cargo` (`id`,`descricao`,`nome`) VALUES (4,'cargo 4','cargo 4');
INSERT INTO `cargo` (`id`,`descricao`,`nome`) VALUES (6,'cargo','cargo');


/*
-- Query: SELECT * FROM trabalhofinal.departamento
LIMIT 0, 1000

-- Date: 2018-07-06 01:06
*/
INSERT INTO `departamento` (`id`,`descricao`,`nome`) VALUES (1,'departamento 1','departamento 1');
INSERT INTO `departamento` (`id`,`descricao`,`nome`) VALUES (2,'departamento 2','departamento 2');
INSERT INTO `departamento` (`id`,`descricao`,`nome`) VALUES (3,'departamento 3','departamento 3');
INSERT INTO `departamento` (`id`,`descricao`,`nome`) VALUES (4,'departamento 44','departamento 44');
INSERT INTO `departamento` (`id`,`descricao`,`nome`) VALUES (6,'departamento','departamento');

/*
-- Query: SELECT * FROM trabalhofinal.funcionario
LIMIT 0, 1000

-- Date: 2018-07-06 01:07
*/
INSERT INTO `funcionario` (`id`,`email`,`nome`,`salario`,`cargo`,`departamento`,`usuario`) VALUES (1,'func1@email.com','funcionario 1',1111,1,4,1);
INSERT INTO `funcionario` (`id`,`email`,`nome`,`salario`,`cargo`,`departamento`,`usuario`) VALUES (2,'func2@email.com','funcionario 2',2222,2,3,1);
INSERT INTO `funcionario` (`id`,`email`,`nome`,`salario`,`cargo`,`departamento`,`usuario`) VALUES (3,'func3@email.com','funcionario 3',3333,3,2,1);

/*
-- Query: SELECT * FROM trabalhofinal.usuario_permissoes
LIMIT 0, 1000

-- Date: 2018-07-06 01:09
*/
INSERT INTO `usuario_permissoes` (`usuario_id`,`permissoes`) VALUES (1,'administrador');
INSERT INTO `usuario_permissoes` (`usuario_id`,`permissoes`) VALUES (2,'usuario');

/*
-- Query: SELECT * FROM trabalhofinal.usuario
LIMIT 0, 1000

-- Date: 2018-07-06 01:09
*/
#INSERT INTO `usuario` (`id`,`email`,`login`,`nome`,`senha`) VALUES (1,'admin@admin.com','admin','admin','$2a$10$jj5ABJxbFy5wqYpH9qVQQ.LWp2l/I7RsZIa3/AQht9v5CCwdeFpUq');
INSERT INTO `usuario` (`id`,`email`,`login`,`nome`,`senha`) VALUES (2,'user@user.com','user','user','$2a$10$jj5ABJxbFy5wqYpH9qVQQ.LWp2l/I7RsZIa3/AQht9v5CCwdeFpUq');
INSERT INTO `usuario` (`id`,`email`,`login`,`nome`,`senha`) VALUES (3,'useradmin@useradmin.com','useradmin','useradmin','$2a$10$jj5ABJxbFy5wqYpH9qVQQ.LWp2l/I7RsZIa3/AQht9v5CCwdeFpUq');


