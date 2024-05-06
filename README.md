BACKEDN---------------------
instalamos pnpm (npm install -g pnpm)
inicializamos el backend
$pnpm init
instalamos el paquete de ts-node (pnpm install ts-node) 
agregamos en el package.json en el apartado de script {"dev":"ts-node server.ts"}
instalamos express (pnpm install express cors)

instalamos las dependencies de ts types
pnpm install @types/cors -D  (-D desarrollo)
pnpm install @types/express -D
pnpm install @types/node -D

instalamos multer (pnpm install multer - es un mildelware que nos dejara subir archivos)
instalamos tambien convert-csv-to-json (nos permite los datos del CSV convertirlo a json)

instalamos mas dependencias de types
pnpm install @types/multer -D


FRONTEND --------------------------------
en la carpeta frontend, inizializamos un nuevo proyect
pnpm create vite@latest
escogemos la opcion de react con typescript + SWC
pnpm install
pnpm run dev
creamos un packeson en la raiz principal, la cual se encargara de que el backen y el frontend puedan tener la misma configuraciones de lint
modelos las dependencias del packaje.json que se encuentra en el frontend, al packaje.json que esta en la raiz principal
ahora ejecutamos pnpm install

instalamos sonner, para mostrar al usuarios los error en mensaje intuitivos (pnpm install sonner)