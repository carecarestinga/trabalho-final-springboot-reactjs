DROP SCHEMA IF EXISTS 'trabalhofinal' ;

CREATE SCHEMA IF NOT EXISTS 'trabalhofinal' 

##########################################################################################


CREATE TABLE 'cargo' (
  'cargo_id' int(11) NOT NULL AUTO_INCREMENT,
  'descricao' varchar(255) DEFAULT NULL,
  'nome' varchar(255) NOT NULL,
  PRIMARY KEY ('cargo_id')
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;


SELECT 'cargo'.'cargo_id',
    'cargo'.'descricao',
    'cargo'.'nome'
FROM 'trabalhofinal'.'cargo';


/*
-- Query: SELECT * FROM trabalhofinal.cargo
LIMIT 0, 1000

-- Date: 2018-06-27 09:16
*/
INSERT INTO 'cargo' ('cargo_id','descricao','nome') VALUES (1,'cargo 1','cargo 1');
INSERT INTO 'cargo' ('cargo_id','descricao','nome') VALUES (2,'cargo 2','cargo 2');
INSERT INTO 'cargo' ('cargo_id','descricao','nome') VALUES (3,'cargo 3','cargo 3');
INSERT INTO 'cargo' ('cargo_id','descricao','nome') VALUES (4,'cargo 4','cargo 4');

##########################################################################################


CREATE TABLE 'departamento' (
  'departamento_id' int(11) NOT NULL AUTO_INCREMENT,
  'descricao' varchar(255) DEFAULT NULL,
  'nome' varchar(255) NOT NULL,
  PRIMARY KEY ('departamento_id')
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;


SELECT 'departamento'.'departamento_id',
    'departamento'.'descricao',
    'departamento'.'nome'
FROM 'trabalhofinal'.'departamento';


/*
-- Query: SELECT * FROM trabalhofinal.departamento
LIMIT 0, 1000

-- Date: 2018-06-27 09:17
*/
INSERT INTO 'departamento' ('departamento_id','descricao','nome') VALUES (1,'departamento 1','departamento 1');
INSERT INTO 'departamento' ('departamento_id','descricao','nome') VALUES (2,'departamento 2','departamento 2');
INSERT INTO 'departamento' ('departamento_id','descricao','nome') VALUES (3,'departamento 3','departamento 3');
INSERT INTO 'departamento' ('departamento_id','descricao','nome') VALUES (4,'departamento 4','departamento 4');


##########################################################################################


CREATE TABLE 'funcionario' (
  'funcionario_id' int(11) NOT NULL AUTO_INCREMENT,
  'email' varchar(255) NOT NULL,
  'nome' varchar(255) NOT NULL,
  'salario' int(11) NOT NULL,
  'cargo_id_cargo_id' int(11) DEFAULT NULL,
  'departamento_id_departamento_id' int(11) DEFAULT NULL,
  'usuario_id' int(11) DEFAULT NULL,
  'usuario_id_usuario_id' int(11) DEFAULT NULL,
  PRIMARY KEY ('funcionario_id'),
  KEY 'FKwnmqfjh318guaklwmtu9nnma' ('usuario_id'),
  KEY 'FKnhw7apqmym7dbh24cecr9mv23' ('cargo_id_cargo_id'),
  KEY 'FKnmw7bb79wmel7i53o7llcpcfg' ('departamento_id_departamento_id'),
  KEY 'FK7fqdlqt9jahlcy8o7bvlwtgtx' ('usuario_id_usuario_id')
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;


SELECT 'funcionario'.'funcionario_id',
    'funcionario'.'email',
    'funcionario'.'nome',
    'funcionario'.'salario',
    'funcionario'.'cargo_id_cargo_id',
    'funcionario'.'departamento_id_departamento_id',
    'funcionario'.'usuario_id',
    'funcionario'.'usuario_id_usuario_id'
FROM 'trabalhofinal'.'funcionario';

/*
-- Query: SELECT * FROM trabalhofinal.funcionario
LIMIT 0, 1000

-- Date: 2018-06-27 09:18
*/
INSERT INTO 'funcionario' ('funcionario_id','email','nome','salario','cargo_id_cargo_id','departamento_id_departamento_id','usuario_id','usuario_id_usuario_id') VALUES (1,'func1@email.com','func1',1111,1,1,1,NULL);
INSERT INTO 'funcionario' ('funcionario_id','email','nome','salario','cargo_id_cargo_id','departamento_id_departamento_id','usuario_id','usuario_id_usuario_id') VALUES (2,'func2@email.com','func2',2222,2,2,2,NULL);
INSERT INTO 'funcionario' ('funcionario_id','email','nome','salario','cargo_id_cargo_id','departamento_id_departamento_id','usuario_id','usuario_id_usuario_id') VALUES (3,'func3@email.com','func3',333,3,3,1,NULL);
INSERT INTO 'funcionario' ('funcionario_id','email','nome','salario','cargo_id_cargo_id','departamento_id_departamento_id','usuario_id','usuario_id_usuario_id') VALUES (4,'func4@email.com','func4',444,4,4,4,NULL);
INSERT INTO 'funcionario' ('funcionario_id','email','nome','salario','cargo_id_cargo_id','departamento_id_departamento_id','usuario_id','usuario_id_usuario_id') VALUES (5,'func5@email.com','func5',444,1,2,1,NULL);


##########################################################################################


CREATE TABLE 'usuario' (
  'usuario_id' int(11) NOT NULL AUTO_INCREMENT,
  'email' varchar(40) NOT NULL,
  'login' varchar(40) NOT NULL,
  'nome' varchar(40) NOT NULL,
  'senha' varchar(255) DEFAULT NULL,
  PRIMARY KEY ('usuario_id'),
  UNIQUE KEY 'UK_5171l57faosmj8myawaucatdw' ('email'),
  UNIQUE KEY 'UK_pm3f4m4fqv89oeeeac4tbe2f4' ('login')
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;


SELECT 'usuario'.'usuario_id',
    'usuario'.'email',
    'usuario'.'login',
    'usuario'.'nome',
    'usuario'.'senha'
FROM 'trabalhofinal'.'usuario';

/*
-- Query: SELECT * FROM trabalhofinal.usuario
LIMIT 0, 1000

-- Date: 2018-06-27 09:19
*/
INSERT INTO 'usuario' ('usuario_id','email','login','nome','senha') VALUES (1,'admin@admin.com','admin','admin','$2a$10$AeAGwxU3RvgJmDvpynJZLOsxc5cUATgkUQqAeoqoBOj.AijXyIc.C');


##########################################################################################


CREATE TABLE 'usuario_permissoes' (
  'usuario_usuario_id' int(11) NOT NULL,
  'permissoes' varchar(255) DEFAULT NULL,
  KEY 'FKgv4iqw9b19qceugkwrkvvhl97' ('usuario_usuario_id')
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


SELECT 'usuario_permissoes'.'usuario_usuario_id',
    'usuario_permissoes'.'permissoes'
FROM 'trabalhofinal'.'usuario_permissoes';

/*

-- Query: SELECT * FROM trabalhofinal.usuario_permissoes
LIMIT 0, 1000

-- Date: 2018-06-27 09:21
*/
INSERT INTO 'usuario_permissoes' ('usuario_usuario_id','permissoes') VALUES (1,'administrador');









