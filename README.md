BACKEND 🚀
instalamos pnpm (npm install -g pnpm)
inicializamos el backend
Instala **pnpm** globalmente: $pnpm init
Instala el paquete de **ts-node**: (pnpm install ts-node) 
Agrega el script de desarrollo en **package.json**:
```json
"scripts": {
    "dev": "ts-node server.ts"
}

instalamos express (pnpm install express cors)

Dependencies & Typings
Instala los tipos para Cors y Express:
pnpm install @types/cors @types/express -D
pnpm install @types/node -D

instalamos multer (pnpm install multer - es un mildelware que nos dejara subir archivos)
instalamos tambien convert-csv-to-json (nos permite los datos del CSV convertirlo a json)

instalamos mas dependencias de types
pnpm install @types/multer -D


FRONTEND 🎨
en la carpeta frontend, inizializamos un nuevo proyect
pnpm create vite@latest
escogemos la opcion de react con typescript + SWC
pnpm install
pnpm run dev
creamos un packaje en la raiz principal, la cual se encargara de que el backen y el frontend puedan tener la misma configuraciones de lint
modelos las dependencias del packaje.json que se encuentra en el frontend, al packaje.json que esta en la raiz principal
ahora ejecutamos pnpm install

instalamos sonner, para mostrar al usuarios los error en mensaje intuitivos (pnpm install sonner)

pnpm install npm i @uidotdev/usehooks

ahora desde la raiz levantamos el project (creamos un workspace) //entorno de trabajo
pnpm-workspace.yaml

pnpm --filter 'frontend' dev
pnpm --filter 'backend' dev
pnpm --filter '**' dev //todos
pasamos el comando a la raiz principal package.json para que levante tanto el frontend como el backend con tan solo 2 pasos
1) pnpm install
2) pnpm run dev
