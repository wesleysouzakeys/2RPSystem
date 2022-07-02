CREATE DATABASE BANCO2RP;
GO

USE BANCO2RP;
GO

CREATE TABLE TIPOSUSUARIO (
	idTipoUsuario INT PRIMARY KEY Identity NOT NULL,
	titulo VARCHAR(50) NOT NULL
);
GO

CREATE TABLE USUARIOS (
	idUsuario INT PRIMARY KEY Identity NOT NULL,
	idTipoUsuario INT FOREIGN KEY REFERENCES TIPOSUSUARIO(idTipoUsuario) NOT NULL,
	nome VARCHAR(256) NOT NULL,
	email VARCHAR(256) NOT NULL UNIQUE,
	senha VARCHAR(128) NOT NULL,
	status BIT NOT NULL
);
GO