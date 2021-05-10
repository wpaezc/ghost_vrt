# Pruebas E2E con Playwright y Kraken
## Integrantes
|Nombres|Email|
|-------|------|
|Manuel Alejandro Sanchez Masferrer|ma.sanchezm12@uniandes.edu.co|
|Ivan Dario Peñaloza Rojas|i.penalozar@uniandes.edu.co|
|Christtian Alfredo Manzo Parra|ca.manzo973@uniandes.edu.co|
|Wenceslao Crhistopher Paez Chavez|w.paezc@uniandes.edu.co|

## Pros y contras de las herramientas utilizadas

El reporte se encuentra en la WIKI del proyecto: [Link](https://github.com/wpaezc/ghost_e2e/wiki/Evaluaci%C3%B3n-de-Herramientas)

## Configuración general
Para poder correr estas pruebas se requiere ya tener instalado el aplicativo **GHOST** en su versión **3.3.0**. 

Se necesita conocer el **URL** donde esta funcionado GHOST, así también es necesario contar un **usuario administrador** y un **password** que deben ser ingresados en los archivos de configuración de Playwright y el archivo de configuración de Kraken. 

Para ambas herramientas se tiene por defecto los siguientes valores: 

URL: ```http://localhost:2368/``` 
USUARIO: ```admin@admin.com```
PASSWORD: ```abcde12345``` 

### Pasos para correr las pruebas con Playwright
La version de node recomendada es la ```12.20.1```. Luego de clonar el repositor dar un ```npm install``` y cambiar los siguientes valores del archivo de configuración ```playwright_properties.json``` en caso tenga otro ghostUrl, user o password.
```json
{
  "ghostUrl": "http://localhost:2368",
  "user": "admin@admin.com",
  "password": "abcde12345"
}
```
Todos los escenarios se ecuentran en la carpeta _Playwright_

Para ejecutar todas las pruebas ***playwright*** usar el comando: ```node Playwright/runAllTests.js```

Para ejecutar ejecutar una prueba individual ***playwright*** usar el comando: ```node Playwright/NombreDelArchivo.js```


### Pasos para correr las pruebas con Kraken
En caso no tenga kraken-mobile instalado, se recomienda instalar la version de ruby ```2.6.7```, ejecutar un ```gem install bundler``` y luego ```bundle install```  

Si ya tiene instalado kraken-mobile abrir el archivo ```kraken_properties.json``` y configuar los valores de _GHOST_URL_, _USER_ o _PASSWORD_ en caso tenga otros valores. 
```json
{
  "@user1": {
    "GHOST_URL": "http://localhost:2368",
    "USER": "admin@admin.com",
    "PASSWORD": "abcde12345"
  }
}
```

Todos los escenarios se ecuentran en la carpeta _features_

Se ejecutan las pruebas ***kraken*** con el comando: ```kraken-mobile run --properties=kraken_properties.json```

### Funcionalidades bajo pruebas y escenarios

- Escenarios de funcionalidad **Manejo de posts**

|Playwright|Kraken|
|-|-|
|Crear post sin publicar (Draft)|Crear post sin publicar (Draft)|
|Crear post y publicar sin adicionar fecha|Crear post y publicar en el instante|
|Consultar post publicados|Crear post con una fecha futura para su publicación|
|Consultar post agendados|Crear post con un slug especifico en el URL| 
|Consultar todos los post sin publicar|Cambiar estado de post de "Published" a "Unpublished"|

- Escenarios de funcionalidad **Manejo de páginas**

|Playwright|Kraken|
|-|-|
|Crear página sin publicar (Draft)|Crear página sin publicar (Draft)|
|Crear página y publicar sin adicionar fecha|Crear página y publicar en el instante|
|Consultar páginas publicadas|Crear página con una fecha futura para su publicación|
|Consultar páginas agendadas|Crear página con un slug especifico en el URL| 
|Consultar todas las páginas sin publicar|Cambiar estado de página de "Published" a "Unpublished"|

- Escenarios de funcionalidad **Manejo de Tags**

|Playwright|Kraken|
|-|-|
|-----|Crear tag sin post asociado|
|-----|Crear tag y asociar post|
|-----|Cambiar slug de navegación del tag|
|-----|Cambiar meta data del tag|
|-----|Eliminar un tag sin posts asociados|

- Escenarios de funcionalidad **Manejo de usuario**

|Playwright|Kraken|
|-|-|
|Actualiza los datos del usuario|Actualiza los datos del usuario|
|Cambio de password inválido|Cambio de password inválido|

- Escenarios de funcionalidad **Invitar nuevos usuarios**

|Playwright|Kraken|
|-|-|
|Crear una invitación con un email inválido|Crear una invitación con un email inválido|
|Crear una invitación con un email válido|Crear una invitación con un email válido|
|Elimina invitación a un usuario|Elimina invitación a un usuario|

### Pruebas ejecutadas

[Video donde se ejecutan los 20 escenarios en Kraken](https://youtu.be/htY30xW-_C0)
