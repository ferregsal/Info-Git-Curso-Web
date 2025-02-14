###Entidades y atributos:

alumno: id_alumno, nombre, apellidos, fecha_nacimiento, dirección, teléfono, email
asignatura: id_asignatura, nombre, curso, horas_semana
profesor: id_profesor, nombre, apellidos, fecha_nacimiento, dirección, teléfono, email, director?
departamento: id_departamento, nombre, telefono, email
grupo: id_grupo, curso, letra
aula: id_aula, capacidad, ubicación
¿clase: id_clase, id_grupo, id_aula, día, hora_inicio, hora_fin?

###Relaciones:

se_matricula {

- entidades: alumno + grupo
- relaciones: id_alumno, id_grupo
- cardinalidad: M:N
- opcionalidad: 1:1
- atributos: fecha_matriculación, calificación
  }

enseña {
-entidades: profesor + grupo
-relaciones: id_profesor, id_grupo
-cardinalidad: M : N
-opcionalidad: 1:1
-atributos:
}

se_divide{
-entidades: asignatura + grupo
-relaciones: id_asignatura, id_grupo
-cardinalidad: 1 : N
-opcionalidad: 1:1
-atributos:
}

se_imparte{
-entidades: grupo, aula
-relaciones: id_grupo, id_aula
-cardinalidad: M : N
-opcionalidad: 1:1
-atributos: días, horas
}

pertenece{
-entidades: profesor + departamento
-relaciones: id_profesor, id_departamento
-cardinalidad: N : 1
-opcionalidad: 1:1
-atributos: es_director
}

dirige{
-entidades: profesor, departamento
-relaciones: id_profesor, id_departamento
-cardinalidad: 1 : 1
-opcionalidad: 1:1
-atributos:
}
