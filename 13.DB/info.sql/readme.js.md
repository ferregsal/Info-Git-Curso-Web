---
title: SQL y ECMAScript (JavaScript)
---

- [MySQL y JavaScript / TypeScript](#mysql-y-javascript--typescript)
  - [Opciones en Node.js para utilizar MySQL](#opciones-en-nodejs-para-utilizar-mysql)
    - [Driver nativo para Node](#driver-nativo-para-node)
    - [ORM (Object–relational mapping)](#orm-objectrelational-mapping)
  - [Driver nativo MySQL con Node.js y TypeScript](#driver-nativo-mysql-con-nodejs-y-typescript)
    - [Consultas: método `query` de la conexión. Tipado de resultados](#consultas-método-query-de-la-conexión-tipado-de-resultados)
    - [Consultas y placeholders. Problema de la inyección SQL](#consultas-y-placeholders-problema-de-la-inyección-sql)
    - [Creación de registros y obtención del id](#creación-de-registros-y-obtención-del-id)
- [SQLite y JavaScript / TypeScript](#sqlite-y-javascript--typescript)
  - [Opciones en Node.js para utilizar SQLite](#opciones-en-nodejs-para-utilizar-sqlite)
  - [sqlite3](#sqlite3)
- [Prisma](#prisma)
  - [Introducción](#introducción)
  - [Instalación](#instalación)
    - [Prisma CLI](#prisma-cli)
    - [Prisma Client](#prisma-client)
      - [Configuración, cadena de conexión y modelo de datos](#configuración-cadena-de-conexión-y-modelo-de-datos)
    - [Generate v. Migrate](#generate-v-migrate)
  - [Sintaxis en Prisma: Modelos](#sintaxis-en-prisma-modelos)
    - [Crear un modelo](#crear-un-modelo)
  - [Migraciones](#migraciones)
  - [Uso de Prisma Client](#uso-de-prisma-client)

## MySQL y JavaScript / TypeScript

### Opciones en Node.js para utilizar MySQL

#### Driver nativo para Node

- driver antiguo [mysql](https://www.npmjs.com/package/mysql)

This is a node.js driver for mysql.
It is written in JavaScript, does not require compiling, and is 100% MIT licensed.

- driver moderno [mysql2](https://www.npmjs.com/package/mysql2)

A continuation of MySQL-Native.
Protocol parser code was rewritten from scratch and api changed to match popular Node MySQL.

#### ORM (Object–relational mapping)

Un ORM (Object Relational Mapping) es una técnica de programación que permite convertir datos entre sistemas de tipo orientado a objetos y sistemas de tipo relacionales. En el caso de Node.js, un ORM permite trabajar con bases de datos SQL de forma más sencilla, utilizando objetos y métodos en lugar de sentencias SQL.

from [9 Best JavaScript and TypeScript ORMs for 2024](https://www.sitepoint.com/javascript-typescript-orms/)

- [Knex.js](https://knexjs.org/) JavaScript SQL Query builder
- [Sequelize](https://sequelize.org/) JavaScript ORM Library on top of some native driver
- [Bookshelf](https://bookshelfjs.org/) JavaScript ORM Library on top of Knex.js SQL Query Builder
- [Objection.js](https://vincit.github.io/objection.js/) JavaScript ORM Library on top of Knex.js SQL Query Builder and some native driver
- [TypeORM](https://typeorm.io/) TypeScript ORM Library on top of reflect-metadata and some native driver
- [MikroORM](https://mikro-orm.io/) TypeScript ORM Library for SQL and NoSQL inspired by PHP Doctrine
- [Prisma](https://www.prisma.io/) recent TypeScript ORM

### Driver nativo MySQL con Node.js y TypeScript

Instalación

```shell
npm install mysql2
```

Como ya incluye soporte para TypeScript, no es necesario instalar tipos adicionales

Conexión a la base de datos

```typescript
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost:3306',
  // port:  process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  passwd: process.env.DB_PASSWD,
  database: process.env.DB_NAME || 'movies_db',
});
```

#### Consultas: método `query` de la conexión. Tipado de resultados

La conexión incluye un método `query` para realizar consultas

```typescript
const [rows, fields] = await connection.query('SELECT * FROM movies');
```

En las consultas es crítico el uso correcto de parámetros para evitar inyecciones SQL

```typescript
const [rows, fields] = await connection.query(
  'SELECT * FROM movies WHERE id = ?',
  [movieId],
);
```

En ningún caso se deben concatenar los valores directamente en la consulta o incluirlos en un template string

```typescript
// Incorrecto: permitiría inyecciones SQL
const [rows, fields] = await connection.query(
  `SELECT * FROM movies WHERE id = ${movieId}`,
);
```

Las operaciones de un CRUD se pueden encapsular en funciones o métodos de clase, utilizando en cada caso el método `query` de la conexión para realizar las operaciones sql de `SELECT`, `INSERT`, `UPDATE` y `DELETE`.

El resultado de la consulta es una tupla con 2 elementos,

- el primero es un array con los resultados de la consulta
- el segundo es un array con los metadatos de los campos de la tabla, `FieldPacket[]` .

En el tipado del primer miembro de la query se pueden encontrar varios tipos, proporcionados por la librería `mysql2` principalmente:

- `RowDataPacket[]` para el resultado de una consulta SELECT simple de varias columnas
- `RowDataPacket[][]` para el resultado de una consulta SELECT con varias tablas
- `ResultSetHeader` para el resultado de una operación de modificación de la base de datos (INSERT, UPDATE, DELETE)

```typescript
import { FieldPacket, RowDataPacket } from 'mysql2';

const [rows, fields] = await connection.query('SELECT * FROM movies');
// rows: RowDataPacket[]
// fields: FieldPacket[]
```

Dependiendo del tipo de consulta, se pueden usar genéricos para refinar el tipo que obtendremos en `rows`

```typescript
const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM movies');

// rows: RowDataPacket[]

const [rows] = await connection.query<ResultSetHeader[]>(
  'DELETE FROM movies WHERE id = ?',
  [movieId],
);

// rows: ResultSetHeader[]
```

En el caso del SELECT podemos ir más alla, y definir un tipo específico para cada fila de la tabla, que incluya solo los campos que necesitamos en la aplicación

```typescript

interface Movie {
  id: number;
  title: string;
  year: number;
  director: string;
} && RowDataPacket;

const [rows] = await connection.query<Movie[]>(
  'SELECT id, title, year, director FROM movies',
);

// rows: Movie[]
```

En el caso de las operaciones de modificación, el tipo de resultado es `ResultSetHeader[]`, que incluye un solo elemento con información sobre la operación realizada, incluyendo el número de filas afectadas. Par los INSERT también ese incluye el id de la fila insertada, siempre que se trate de una PK auto incremental.

```typescript
const [result] = await connection.query<ResultSetHeader[]>(
  'DELETE FROM movies WHERE id = ?',
  [movieId],
);

// result: ResultSetHeader[]

console.log(result.affectedRows);
```

#### Consultas y placeholders. Problema de la inyección SQL

```typescript
import { FieldPacket, RowDataPacket } from 'mysql2';

const [rows, fields] = await connection.query('SELECT * FROM movies');
const [rows, fields] = await connection.query(
  'SELECT * FROM movies WHERE id = ?',
  [movieId],
);
```

#### Creación de registros y obtención del id

Cuando el id es auto incremental, se puede obtener el id del registro insertado

```typescript
const [result] = await connection.query<ResultSetHeader[]>(
  'INSERT INTO movies (title, year, director) VALUES (?, ?, ?)',
  [title, year, director],
);

console.log(result.insertId);
```

Cuando el id no es auto incremental, existen dos posibilidades:

- el id se genera en la aplicación, por lo que no es necesario obtenerlo
- el id se genera en la base de datos (como valor por defecto, e.g. UUID()), por lo que se necesita obtener el id del registro insertado

En este caso, se puede realizar una segunda consulta para obtener el id del registro insertado en base a una condición que devuelva un registro único

````typescript
const [result] = await connection.query<ResultSetHeader[]>(
  'INSERT INTO movies (title, year, director) VALUES (?, ?, ?)',
  [title, year, director],
);

const [rows] = await connection.query<RowDataPacket[]>(
  'SELECT id FROM movies WHERE title = ? AND year = ? AND director = ?',
  [title, year, director],
);

Otra alternativa es disponer de un trigger en la base de datos que devuelva el id del registro insertado, aunque esto no es una práctica recomendada.

```sql
CREATE TRIGGER `movies_after_insert` AFTER INSERT ON `movies`
FOR EACH ROW
BEGIN
  SELECT NEW.id;
END;
````

```typescript
const [result] = await connection.query<ResultSetHeader[]>(
  'INSERT INTO movies (title, year, director) VALUES (?, ?, ?)',
  [title, year, director],
);

console.log(result.insertId);
```

## SQLite y JavaScript / TypeScript

### Opciones en Node.js para utilizar SQLite

Hasta hace poco, existían varias librerías para trabajar con SQLite en Node.js, aunque algunas no soportaban TypeScript o no tenían soporte activo. Entre las mejores opciones estaban:

- `sqlite3`, que es un wrapper de la librería `sqlite3` de C++ y desde su versión 5.0 de `sqlite3` incluye soporte para TypeScript.
- `better-sqlite3` es una librería que se presenta como una alternativa a `sqlite3` y que también incluye soporte para TypeScript.

Desde su versión 22.5.0 NodeJS incluye un módulo nativo para trabajar con SQLite, aunque de momento en estado experimental.
Esta adición es similar a lo que ya tenían otros entornos de ejecución de JavaScript como Deno y Bun. Otros lenguajes de programación como Python y PHP también incorporan SQLite, lo que demuestra los beneficios de agregar esta característica a un entorno de ejecución.

En su versión 22.4.0, Node.js añadió soporte experimental para Web Storage (que consiste en almacenamiento local y de sesión). Esta nueva característica sirve como un sistema de clave–valor en Node.js y mejora la compatibilidad de Node.js con las APIs Web. Los desarrolladores de Node.js utilizaron SQLite para manejar esta característica de Web Storage y han decido hacerla utilizable como un nuevo módulo, `node:sqlite`.

Por el momento, para utilizarla es necesario habilitar la bandera `--experimental-vm-modules` al ejecutar Node.js.

```shell
node --experimental-sqlite index.js
```

[Using the built-in SQLite module in Node.js](https://blog.logrocket.com/using-built-in-sqlite-module-node-js/)

### sqlite3

La librería [sqlite3](https://www.npmjs.com/package/sqlite3) se puede instalar mediante npm

```shell
npm install sqlite3
```

Conexión a la base de datos en memory

```typescript
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');
```

Conexión a la base de datos en un archivo

```typescript
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('movies.db');
```

sqlite3 trabaja con callbacks, en lugar de promesas, por lo que es necesario utilizar funciones de callback para realizar las operaciones de consulta.

Existen básicamente los siguientes métodos para realizar consultas:

- `all`: para obtener todos los registros de una consulta
- `get`: para obtener un solo registro de una consulta
- `run`: para realizar operaciones de modificación de la base de datos (INSERT, UPDATE, DELETE)
- `each`: para obtener los registros de una consulta de forma iterativa
- `exec`: para ejecutar una o varias sentencias SQL

```typescript
db.all('SELECT * FROM movies where year = ?', [findYear], (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.log(rows);
  }
});

db.get('SELECT * FROM movies where id = ?', [movieId], (err, row) => {
  if (err) {
    console.error(err);
  } else {
    console.log(row);
  }
});

db.run(
  'INSERT INTO movies (title, year, director) VALUES (?, ?, ?)',
  [title, year, director],
  function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log(this.lastID);
    }
  },
);
```

En JavaScript no es difícil crear un wrapper de estos métodos para trabajar con promesas en lugar de callbacks

```typescript
import util from 'node:util';
import sqlite3 from 'sqlite3';

SQLite3 = {
  // run: util.promisify(db.run.bind(db)),
  run (...args) {
    return new Promise((resolve, reject) => {
      db.run(...args, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }
  all: util.promisify(db.all.bind(db)),
    // all (...args) {
    // return new Promise((resolve, reject) => {
    //   db.all(...args, function (err, rows) {
    //     if (err) {
    //       reject(err);
    //       } else {
    //       resolve(rows);
    //     }
    //   });
    // });
    // }

  get: util.promisify(db.get.bind(db)),
  each: util.promisify(db.each.bind(db)),
  exec: util.promisify(db.exec.bind(db)),
}

```

<https://github.com/TryGhost/node-sqlite3/wiki/API>

## Prisma

### Introducción

Prisma es un **ORM** (Object-Relational Mapping) para bases de datos.
Es una herramienta que nos permite interactuar con la base de datos sin tener que escribir SQL.
Prisma se encarga de traducir nuestras consultas en código JavaScript a SQL.

Esta especialmete pensado para trabajar con **TypeScript** y **Node.js**, proporcionando un tipado seguro.

Soporta diversos tipos de bases de datos

- relacionales, como **PostgreSQL**, **MySQL** y **SQLite** o recientemente **SQL Server**
- no relacionales, como **MongoDB**

En teoría el cambio de una DB a otra solo requiere cambiar el archivo de configuración, incluyendo los datos cadena de conexión y eventualmente algunos tipos de datos particulares.

Prisma provee un API que facilita la interacción con la base de datos, permitiendo realizar consultas de manera sencilla y segura. Incluye ademas algunas herramientas como **Prisma Studio**, una interfaz gráfica para explorar y modificar los datos de la base de datos.

Es habitual usar Prisma junto con frameworks de backend de Node.js como **Express**, **Fastify** o **NestJS** o con frameworks que incluyan server side rendering como **Next.js**.

Prisma se compone de varias partes principales:

- **Prisma Client**: un cliente de base de datos auto-generado en función de los modelos de tablas proporcionados por el desarrollador.
  Proporciona una API de base de datos de tipado seguro para Node.js y TypeScript, generando lo tipos necesarios.
- **Prisma Schema**: un archivo que define el modelo de datos de la aplicación y cómo se relacionan entre sí.
  Prisma client se genera a partir de este archivo, para adecuarse al esquema utilizado en la aplicación.
- **Prisma Migrate**: una herramienta de migración de base de datos que permite a los desarrolladores definir y aplicar cambios en la base de datos de forma programática.
- **Prisma Studio**: una interfaz gráfica para explorar y modificar los datos de la base de datos.

### Instalación

Antes de comenzar, conviene añadir en **VSC** el plugin de **Prisma**, que nos ayudará a escribir el esquema de Prisma.

#### Prisma CLI

Instalamos **Prisma CLI** como una dependencia de desarrollo, ya que será el responsable de crear el **cliente de Prisma**, que si será dependencia final del proyecto.
Se puede considerar como el SDK que usaremos en nuestro código para interactuar con la base de datos.

`npm install -D prisma`

Los comandos del CLI son

- init: Setup Prisma for your app
- generate: Generate artifacts (e.g. Prisma Client)
- db: Manage your database schema and lifecycle
- migrate: Migrate your database
- studio: Browse your data with Prisma Studio
- validate: Validate your Prisma schema
- format: Format your Prisma schema

El siguiente paso es inicializar Prisma en nuestro proyecto. Para ello, ejecutamos el siguiente comando:

`npx prisma@latest init --datasource-provider`

(`npx prisma@latest init --db` es un shorthand para `npx prisma@latest init --datasource-provider postgres`)

Si no se indica el tipo de base de datos, Prisma utiliza Postgres (`postgresql`).

Alternativamente se puede indicar `mysql`, `sqlite` o `sqlserver` o alguna otras de las indicadas en <https://www.prisma.io/docs/orm/overview/databases>.

La consola nos mostrara el resultado

```shell
✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.
4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started
```

Como se indica, los siguientes pasos serán

1. Configurar la cadena de conexión en el archivo .env

   - Para sqlite, la cadena de conexión es `file:./dev.db`
   - Para mysql, la cadena de conexión es `mysql://user:password@localhost:3306/dbname`
   - Para postgres, la cadena de conexión es `postgresql://user:password@localhost:5432/dbname`

2. Ejecutar `prisma db pull` para convertir el esquema de la base de datos en un esquema de Prisma, si ya existe esquema en la base de datos
3. Alternativamente definir el esquema en el archivo de Prisma, como veremos.
4. Ejecutar `prisma generate` para generar el cliente de Prisma

```shell
npx prisma generate
```

#### Prisma Client

Generalmente no necesitamos instalar el **cliente de Prisma**. A partir de la versión 2.0, **Prisma Client** es un paquete NPM que se genera bajo demanda para ajustarse a tu esquema.

Esto significa que cuando ejecutamos `prisma generate` o `prisma migrate`, se generará un cliente de Prisma que se ajusta a nuestro esquema y se instalará en nuestro proyecto.

`npm i @prisma/client` (No es necesario)

Este cliente es seguro en cuanto a tipos y se basa en nuestro esquema.

##### Configuración, cadena de conexión y modelo de datos

EL proceso para generar la versión de PrismaClient que se ajusta a tu esquema es el siguiente:

- definimos los valores de configuración necesarios en un archivo .env

  - agregamos la cadena de conexión de la base de datos al archivo .env como DATABASE_URL
  - en caso de usar **Render** para una **DB PostgreSQL**, se debe elegir la cadena de conexión que aparece como externa
  - para MySQL local, la cadena de conexión es

  ```.env
  DATABASE_URL="mysql://user:password@localhost:3306/dbname"
  ```

- en el archivo de esquema de Prisma (`prisma/schema.prisma`) añadimos la configuración adecuada

  ```prisma
  datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
  }
  ```

- en el mismo archivo definimos los modelos de datos

  - los modelos de datos son las tablas de la base de datos
  - los campos de los modelos son las columnas de las tablas
  - las relaciones entre los modelos son las relaciones entre las tablas

  ```prisma
  model User {
    id        Int      @id @default(autoincrement())
    email     String   @unique
    name      String?
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
  ```

#### Generate v. Migrate

- ejecutamos una migración para sincronizar la base de datos con el esquema
  como consecuencia generamos el cliente de Prisma

Si ejecutamos `prisma generate` sin haber ejecutado `prisma migrate`, se generará un cliente de Prisma que se ajusta al esquema actual de la base de datos.

El resultado sera:

```shell
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma

✔ Installed the @prisma/client and prisma packages in your project

✔ Generated Prisma Client (v6.4.1) to .\node_modules\@prisma\client in 268ms
```

En package.json podemos ver la dependencia que se ha instalado.

```json
 "dependencies": {
    "@prisma/client": "^6.4.1"
  }
```

Si por el contrario ejecutamos `prisma migrate` incluirá la ejecución de `prisma generate`, por lo que se generará o actualizará el cliente de Prisma que se ajusta al esquema definido en el archivo de Prisma.

Ademas se realizara la migración de la base de datos, creándose las tablas correspondientes y el fichero sql con el código correspondiente a los procesos de creación o modificación de las tablas.

Prisma guardara registro de todas las migraciones que se realicen, permitiendo volver a un estado anterior si fuera necesario o reproducir todo el proceso en otro entorno.

### Sintaxis en Prisma: Modelos

Prisma tiene una sintaxis fácil de entender para crear modelos. Está basada en el lenguaje **GraphQL**, que a su vez se basa en **JSON**.

Es recomendable instalar el **plugin** de Prisma para **VS Code**. Este plugin revisa y limpia tu archivo de esquema.

#### Crear un modelo

Para crear un modelo en Prisma, se debe escribir el nombre del modelo seguido de una llave de apertura y cierre. Dentro de las llaves, se escriben los campos del modelo.

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model User {
  id        String    @id @default(uuid())
  createdAt DateTime  @default(now())
  username  String    @unique
  password  String
  updates   Update[]
}
```

Aquí tenemos un esquema de Producto. Para la aplicación de registro de cambios, el usuario podría tener muchos productos que desea actualizar. Por lo tanto, necesitamos un lugar para almacenar múltiples actualizaciones. Así que los productos pertenecen a un Usuario.

```prisma
model Product {
  id          String   @id @default(uuid())
  createdAt   DateTime @default(now())
  name        String
  belongsTo   User     @relation(fields: [belongsToId], references: [id])
  belongsToId String
  updates     Update[]
}
```

Los productos pueden tener **actualizaciones**. Por lo tanto, los productos pertenecen a las actualizaciones. Las actualizaciones tienen muchos campos, uno de los cuales se llama estado. Debido a que el estado es un conjunto finito de opciones, creamos un ENUM para representar nuestro estado. Piensa en un valor de tipo enum como "uno-de-estos". Así que el valor debe ser uno de los valores en el ENUM en lugar de ser cualquier otra cadena aleatoria.

```prisma
enum UPDATE_STATUS {
  IN_PROGRESS
  LIVE
  DEPRECATED
  ARCHIVED
}

model Update {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime
  title     String        @db.VarChar(255)
  body      String
  status    UPDATE_STATUS @default(IN_PROGRESS)
  version   String?
  asset     String
  productId String
  product   Product       @relation(fields: [productId], references: [id])
  updatePoints UpdatePoint[]
}
```

Y finalmente, los puntos de actualización son los puntos clave de una actualización. Estos pertenecen a una actualización, que pertenece a un producto, que a su vez pertenece a un usuario.

```prisma
model UpdatePoint {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime
  name      String @db.VarChar(255)
  description String
  updateId  String
  update    Update @relation(fields: [updateId], references: [id])
}
```

### Migraciones

Dado que esta es nuestra primera vez interactuando con la base de datos, necesitamos ejecutar nuestra **migración inicial** para sincronizar la base de datos con nuestro esquema. Continuaremos ejecutando migraciones a medida que realicemos cambios en el esquema para asegurarnos de que el esquema y cualquier dato en la base de datos permanezcan sincronizados.

A continuación, migremos la base de datos.

`npx prisma migrate dev --name init`

Esto migrará la base de datos para usar nuestro esquema y luego generará el **nuevo cliente** para nosotros. Este cliente se usará en nuestro código y ahora está verificado en cuanto a tipos contra nuestro esquema.

### Uso de Prisma Client

Siempre será necesario crear una instancia de **PrismaClient** para interactuar con la base de datos.

```ts (db.ts)
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
```

La instancia del cliente de Prisma proporciona acceso a las diversas tablas (esquemas o modelos) y los métodos necesarios para interactuar con la base de datos.

- `findMany` para obtener todos los items de la tabla de la base de datos
- `findUnique` para obtener un item específico de la tabla de la base de datos
- `create` para crear un nuevo item en la tabla de la base de datos
- `update` para actualizar un item existente en la tabla de la base de datos
- `delete` para eliminar un item existente en la tabla de la base de datos

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```
