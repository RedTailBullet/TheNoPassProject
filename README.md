# TheNoPassProject

Password manager without storing the password.

This project aims to provide a non-storage password manager that secure all passwords with a master password.

## Basic idea

The basic idea is to utilize secure, one-way hash function and xor operation to generate the passwords every time. With the correct parameters, the generated password should always be correct. Thus, no password storage, no risk of bad guys breaking into the vault.
