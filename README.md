# doctors-server

##Instalación

1. npm install .
2. npm start
3. npm run-script create-data

se requiere los crud necesarios para poder completar los siguientes requerimientos se necesita administrar doctores, pacientes y mediciones de glucosa , teniendo en cuenta la siguientes restricciones existen 3 tipos de usuarios que usaran el api 

1. Admin
2. doctor
3. app

## Restricciones
a continuación se presenta la información con respecto  a los tipos de usuarios que interactuan con el server

1. ### Admin
   el administrador puede editar todos los registros de cualquier tipo y crear doctores , pacientes o mediciones

2. ### Doctor
   los doctores podran crear pacientes y registrar mediciones de glucosa a un paciente,  un doctor puede editar todos los registros de glucosas que este mismo haya creado pero no podra editar registros hechos por otro doctor ni por el administrador , tampoco podra editar los registros de mediciones  de glucosa hecho por la applicación,  se debe prevenir que el doctor conozca al doctor que realizo el registro del paciente en caso que este no lo haya registrado
   
3. ### App
  la aplicación solo registrara mediciones de glucosa, y listara las mediciones de glucosa de un paciente 
  
los pacientes no interactuan con el sistema solo por medio de la aplicación y no requiren un servicio para registrarse ellos mismos , los puede registrar un doctor o el administrador, se identifican por su documento de identidad y no pueden existir dos personas con el mismo numero de documento, se necesita un servicio que permita buscar un paciente por numero de identidad , los doctores pueden listar todos los pacientes existentes en el sistema sin importar quien los creo, 



## Modelo  de objetos
a continuación se presentan el esquema minimo que deben tener los objetos de cada tipo(_puede incluir todos los campos que considere necesarios para cumplir con los requerimientos_)
1. ### Doctor
```javascript
{
  "name" : "full name",
  "username" : "username",
  "password" : "password",
  "phone" : "658121566"
}
```

2. ### Paciente
```javascript 
{
  "name" : "full name",
  "username" : "username",
  "password" : "password",
  "phone" : "658121566",
  "dateOfBirth" : "typeDate"
}
```

3. ### Medicion de glucosa

```javascript 
{
  "value" : 85,
  "createdAt" : "typeDate",
  "updatedAt" : "typeDate"
}
```
