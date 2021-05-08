# Pruebas E2E con Cypress y Kraken
## Integrantes
|Nombres|Email|
|-------|------|
|Completar|Completar|
|Completar|Completar|
|Completar|Completar|
|Wenceslao Crhistopher Paez Chavez|w.paezc@uniandes.edu.co|

## Configuración general
Para poder correr estas pruebas se requiere ya tener instalado el aplicativo **GHOST** en su versión **3.3.0**. 

Se necesita conocer el **URL** donde esta funcionado GHOST, así también es necesario contar un **usuario administrador** y un **password** que deben ser ingresados en los archivos de configuración de Cypress y el archivo de configuración de Kraken. 

Para ambas herramientas se tiene por defecto los siguientes valores: 

URL: ```http://localhost:2368/``` 
USUARIO: ```admin@admin.com```
PASSWORD: ```abcde12345``` 

### Pasos para correr las pruebas con Cypress
La version de node recomendada es la ```12.20.1```. Luego de clonar el repositor dar un ```npm install``` y proceder a cambiar los valores del archivo de configuración ```cypress.json``` en caso tengo otro url _baseUrl_, usuario _adminEmail_ o password _adminPassword_.

```json
{
  "baseUrl": "http://localhost:2368",
  "adminEmail": "admin@admin.com",
  "adminPassword": "abcde12345",
  "chromeWebSecurity": false
}
```
Se ejecutan las pruebas ***Cypress*** con el comando: ```npm run cypress:open``` o ```npm run cypress:headless```

### Pasos para correr las pruebas con Kraken
En caso no tengo kraken-mobile instalado, se recomienda instalar la version de ruby ```2.6.7```, ejecutar un ```gem install bundler``` y luego ```bundle install```  

Si ya tiene instalado kraken-mobile abrir el archivo ```kraken_properties.json``` y configuar los valores de url _GHOST_URL_, usuario _USER_ o password _PASSWORD_. 
```json
{
  "@user1": {
    "GHOST_URL": "http://localhost:2368",
    "USER": "admin@admin.com",
    "PASSWORD": "abcde12345"
  }
}
```

Se ejecutan las pruebas ***kraken*** con el comando: ```kraken-mobile run --properties=kraken_properties.json```

###Funcionalidades bajo pruebas y escenarios

- Escenarios de funcionalidad **Manejo de posts**

|Cypress|Kraken|
|-|-|
|-----|Crear post sin publicar (Draft)|
|-----|Crear post y publicar en el instante|
|-----|Crear post con una fecha futura para su publicación|

- Manejo de páginas

|Cypress|Kraken|
|-|-|
|Completar|Completar|
