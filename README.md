# Pruebas de Regresión
## 1. Integrantes
|Nombres|Email|
|-------|------|
|Manuel Alejandro Sanchez Masferrer|ma.sanchezm12@uniandes.edu.co|
|Ivan Dario Peñaloza Rojas|i.penalozar@uniandes.edu.co|
|Christtian Alfredo Manzo Parra|ca.manzo973@uniandes.edu.co|
|Wenceslao Crhistopher Paez Chavez|w.paezc@uniandes.edu.co|


## 2. Pros y contras de la herramienta utilizada (ResembleJs)

El reporte se encuentra en la WIKI del proyecto: [Link](https://github.com/wpaezc/ghost_regresion/wiki/Evaluaci%C3%B3n-de-Herramienta)

## 3. Resultados finales

Los screenshots para ambas versiones de Ghost se encuentra en las carpetas **_./kraken_screeenshots_** y **_./playwright_screenshots**. Dentro de estos, cada escenario bajo prueba tiene su propia carpeta, ahi se ecuentran los screenshots para cada paso ejecutado con la versión v1(3.3.0) y v2(3.42.5).

Los resutados de los tests de regresión con ResembleJS se encuentra en la carpeta **./resemblejs_reports**. Cada escenario bajo prueba tiene su propia carpeta, los escenarios de Kraken tienen nombres son subguión(_) y los del playwright con camelCase. En total se evaluarón 10 escenarios, cada uno cuenta con un **_index.html_** donde se puede ver el resultado final.

Los 10 escenarios seleccionados para la evalución son los siguientes:

|Nombre del scenario| Carpeta | Herramienta para screenshots |
|-----|-----|-----|
|**Page Management:** Create page with draft state|pageManagementCreatePageDraft|Playwright|
|**Post Management:** Create post with draft state|postManagementCreatePostDraft|Playwright|
|**Tag Management:** Edit tag name|tagManagementEditTagName|Playwright|
|**User Management:** Senf invalid invitation|userManagementInvalidInvitation|Playwright|
|**User Management:** Change password with invalid data|userManagementInvalidPassword|Playwright|
|**Page Management:** Unpublish published page|page_management_unpublish_published_page|Kraken|
|**Post Management:** Create post and publish|post_management_create_post_published_now|Kraken|
|**Post Management:** Create page and publish on future|post_management_create_post_published_on_future|Kraken|
|**Tag Management:** Change tag meta data|tag_management_change_tag_meta_data|Kraken|
|**Tag Management:** Delete tag|tag_management_delete_tag|Kraken|

A continuación se describe los pasos para llegar a estos resultados. Se recomienda tener para ambas versiones una base de datos limpia con solo un usuario administrador y su password.

## 4. Pasos para tomar screenshots en la versión Ghost 3.3.0
Clonar el repositorio y cambiar el código al tag v1: ```git checkout tags/v1```
La version de node recomendada es la ```12.20.1```. 

### 4.1 Tomar screenshots con Playwright
Dar un ```npm install``` y cambiar los siguientes valores en el archivo de configuración _playwright_properties.json_ en caso que tenga otro ghostUrl, user o password. Es importante mantener en este archivo los valores de "version" v1 y "nameScreenPath" para generar correctamente los nombres del screenshot.

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

### 4.2 Tomar screenshots con Kraken
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

## 5. Pasos para tomar screenshots en la versión Ghost 3.42.5
Clonar el repositorio y cambiar el código a master: ```git checkout master```
La version de node recomendada es la ```12.20.1```. 

### 5.1 Tomar screenshots con Playwright
Dar un ```npm install``` y cambiar los siguientes valores en el archivo de configuración _playwright_properties.json_ en caso que tenga otro ghostUrl, user o password. Es importante mantener en este archivo los valores de "version" v2 y "nameScreenPath" para generar correctamente los nombres del screenshot.

```json
{
  "ghostUrl": "http://localhost:2368",
  "user": "admin@admin.com",
  "password": "abcde12345",
  "version":"v2",
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

Al final se crearán 20 carpetas en el folder **_./playwright_screenshots_**. Los screenshots de los 20 escenarios serán creados en el siguiente formato **_./playwright_screenshots/featureScenario/v2_nombre_del_step.png**

### 5.2 Tomar screenshots con Kraken
En caso no tenga kraken-mobile instalado, se recomienda instalar la version de ruby ```2.6.7```, ejecutar un ```gem install bundler``` y luego ```bundle install```  

Si ya tiene instalado kraken-mobile abrir el archivo ```kraken_properties.json``` y configuar los valores de _GHOST_URL_, _USER_ o _PASSWORD_ en caso tenga otros valores. Es importante mantener en este archivo el valor "version" v2

```json
{
  "version": "v2",
  "@user1": {
    "GHOST_URL": "http://localhost:2368",
    "USER": "admin@admin.com",
    "PASSWORD": "abcde12345"
  }
}
```
Se ejecutan las pruebas ***kraken*** con el comando: ```kraken-mobile run --properties=kraken_properties.json```

Al final se crearán 20 carpetas en el folder **_./kraken_screenshots_**. Los screenshots de los 20 escenarios serán creados en el siguiente formato **_./kraken_screenshots/feature_scenario/v2_nombre_del_step.png**

## 5. Generar reportes con ResembleJS
Se debe encontrar en la rama ```master``` y tener todo instalado ```npm install```

Para configurar los escenarios bajo pruebas se debe usar el archivo **resemblejs_config.json** y agregar/cambiar/quitar en el key "playwright_scenarios" las carpetas donde se encuentran los screenshots de las funcionalidades de playwright(carpeta playwright_screenshots); y agregar/cambiar/quitar en el key "kraken_scenarios" las carpetas donde se encuentran los screenshots de las funcionalidades de kraken(carpeta kraken_screenshots). Se puede poner los 40 scenarios.

```json
{
  "url": "http://localhost:2368",
  "kraken_scenarios": [
    "post_management_create_post_published_now",
    "post_management_create_post_published_on_future",
    "tag_management_delete_tag",
    "tag_management_change_tag_meta_data",
    "page_management_unpublish_published_page"
  ],
  "playwright_scenarios": [
    "userManagementInvalidInvitation",
    "userManagementInvalidPassword",
    "tagManagementEditTagName",
    "pageManagementCreatePageDraft",
    "postManagementCreatePostDraft"
  ],
  "options":{
    "output": {
      "errorColor": {
        "red": 255,
        "green": 0,
        "blue": 255
      },
      "errorType": "movement",
      "largeImageThreshold": 1200,
      "useCrossOrigin": false,
      "outputDiff": true
    },
    "scaleToSameSize": true,
    "ignore": "antialiasing"
  }
}
```

Se ejecutan las pruebas de regresion con ***resembleJS*** con el comando: ```node resemblejs_evaluation.js```

Luego verificar la carpeta _./resemblejs_reports_ donde se encontraran por cada escenario una carpeta, y dentro de ellas un archivo **index.html** donde puede visualizar el reporte.

## 6. Todas las funcionalidades bajo pruebas y escenarios

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

