USE BANCO2RP;
GO

INSERT INTO TIPOSUSUARIO (titulo)
VALUES ('geral'), ('admin'), ('root');
GO

INSERT INTO USUARIOS (idTipoUsuario, nome, email, senha, status)
VALUES (1, 'Wesley', 'wesley@geral.com', 'wesley123', 1),
	   (2, 'Juliana', 'juliana@admin.com', 'juliana123', 1),
	   (3, 'Rene', 'rene@root.com', 'rene123', 1);
GO

-- Selects 

SELECT * FROM USUARIOS;
SELECT * FROM TIPOSUSUARIO;