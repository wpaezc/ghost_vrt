# Pruebas de Regresión
## Integrantes
|Nombres|Email|
|-------|------|
|Manuel Alejandro Sanchez Masferrer|ma.sanchezm12@uniandes.edu.co|
|Ivan Dario Peñaloza Rojas|i.penalozar@uniandes.edu.co|
|Christtian Alfredo Manzo Parra|ca.manzo973@uniandes.edu.co|
|Wenceslao Crhistopher Paez Chavez|w.paezc@uniandes.edu.co|


## Pros y contras de las herramienta utilizada (ResembleJs)

El reporte se encuentra en la WIKI del proyecto: [Link](hhttps://github.com/wpaezc/ghost_regresion/wiki/Evaluaci%C3%B3n-de-Herramienta)

## 1. Pasos para tomar screenshots en la versión Ghost 3.30
Clonar el repositorio y cambiar el código al tag v1: ```git checkout tags/v1```
La version de node recomendada es la 12.20.1. 

### 1.1 Tomar screenshots con Playwright
Dar un npm install y cambiar los siguientes valores en el archivo de configuración _playwright_properties.json_ en caso que tenga otro ghostUrl, user o password. Es importante mantener en este archivo los valores de "version" v1 y "nameScreenPath" para generar correctamente los nombres del screenshot.

```json
{
  "ghostUrl": "http://localhost:2368",
  "user": "admin@admin.com",
  "password": "abcde12345",
  "version":"v1",
  "nameScreenPath":"playwright_screenshots"
}
```
Para ejecutar los 15 escenarios de ***Playwright*** se tienen que realizar de forma individual:
```sh
node Playwright/pageManagementCreatePageDraft.js
node Playwright/pageManagementPublishPage.js
node Playwright/pageManagementSearchDraftPages.js
node Playwright/pageManagementSearchPublishedPages.js
node Playwright/pageManagementSearchScheduledPages.js

node Playwright/postManagementCreatePostDraft.js
node Playwright/postManagementPublishPost.js
node Playwright/postManagementSearchDraftPosts.js
node Playwright/postManagementSearchPublishedPosts.js
node Playwright/postManagementSearchScheduledPosts.js

node Playwright/userManagementChangeUserData.js
node Playwright/userManagementInvalidInvitation.js
node Playwright/userManagementInviteStaff.js
node Playwright/userManagementRevokeInvitation.js
node Playwright/userManagementInvalidPassword.js
```
Para ejecutar ejecutar los 5 escenarios faltantes ***playwright-jest*** usar el comando: ```npm test```

Al final se crearán 20 carpetas en el folder **_./playwright_screenshots_**. Los screenshots de los 20 escenarios serán creados en el siguiente formato **_./playwright_screenshots/featureScenario/v1_nombre_del_step.png**

### 1.2 Tomar screenshots con Kraken
En caso no tenga kraken-mobile instalado, se recomienda instalar la version de ruby ```2.6.7```, ejecutar un ```gem install bundler``` y luego ```bundle install```  

Si ya tiene instalado kraken-mobile abrir el archivo ```kraken_properties.json``` y configuar los valores de _GHOST_URL_, _USER_ o _PASSWORD_ en caso tenga otros valores. Es importante mantener en este archivo el valor "version" v1

```json
{
  "version": "v1",
  "@user1": {
    "GHOST_URL": "http://localhost:2368",
    "USER": "admin@admin.com",
    "PASSWORD": "abcde12345"
  }
}
```
Se ejecutan las pruebas ***kraken*** con el comando: ```kraken-mobile run --properties=kraken_properties.json```

Al final se crearán 20 carpetas en el folder **_./kraken_screenshots_**. Los screenshots de los 20 escenarios serán creados en el siguiente formato **_./kraken_screenshots/feature_scenario/v1_nombre_del_step.png**






## Pasos para tomar screenshots en la versión Ghost 3.42.5
### Playwright
### Kraken
 

### Pasos para correr las pruebas con Playwright

```sh
node Playwright/pageManagementCreatePageDraft.js
node Playwright/pageManagementPublishPage.js
node Playwright/pageManagementSearchDraftPages.js
node Playwright/pageManagementSearchPublishedPages.js
node Playwright/pageManagementSearchScheduledPages.js

node Playwright/postManagementCreatePostDraft.js
node Playwright/postManagementPublishPost.js
node Playwright/postManagementSearchDraftPosts.js
node Playwright/postManagementSearchPublishedPosts.js
node Playwright/postManagementSearchScheduledPosts.js

node Playwright/userManagementChangeUserData.js
node Playwright/userManagementInvalidInvitation.js
node Playwright/userManagementInviteStaff.js
node Playwright/userManagementRevokeInvitation.js
node Playwright/userManagementInvalidPassword.js
```

Para ejecutar ejecutar los 5 escenarios faltantes ***playwright-jest*** usar el comando: ```npm test```


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
|Crear tag sin asociar a post|Crear tag sin post asociado|
|Crear tag con slug no por defecto |Crear tag y asociar post|
|Modificar el slug de un tag ya creado|Cambiar slug de navegación del tag|
|Modificar el titulo de un tag ya creado|Cambiar meta data del tag|
|Eliminar tag sin post asociado|Eliminar un tag sin posts asociados|

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
