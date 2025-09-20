# ARSW-Parcial-1 API Gateway
### Josué Hernandez

## Descripción del proyecto
- Este Gateway bajo el diseño pensado actua como un punto de entrada único para todos los servicios, al que se conecta el cliente de Java y el servicio web Front-end realizado con Angular.
## Diagrama
![](img/image2.jpeg)

En este repositorio se desarrolla el API central
## 📦 Estructura del API

```
api-gateway/src/
├── common/
            |- public.decorator.ts
           
├── proxy/ 
         |- proxy.controller.ts
         |- proxy.module.ts
         |- proxy.service.ts           
app.module.ts
health.controller.ts
main.ts      
```

## Tecnologías utilizadas
- NestJS
- Java
- Angular

## Despliegue en AWS
- Para realizar el despliegue en AWS creé la instancia EC2 en el entorno asignado, ahí generé una clave privada de autenticación para vincular por medio de SSH en mi propio github, estos fueron los comandos utilizados
## Generar clave SSH
ssh-keygen -t ed25519 -C "tu-email@gmail.com"

## Ver el contenido de la clave pública
cat ~/.ssh/id_ed25519.pub

## Agregar la clave a GitHub:
## GitHub → Settings → SSH and GPG keys → New SSH key
## Pega el contenido del archivo .pub

# Clonar usando SSH
git clone git@github.com:tu-usuario/mi-repositorio.git
 ![](img/image.jpeg)

 ## URLs de Github
 - https://github.com/Josuehmz/ARSW-Parcial-1
 - https://github.com/Josuehmz/ARSW-Parcial-1-Cliente-Java