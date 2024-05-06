import React, { useState } from "react";
import "./App.css";
import { uploadfile } from "./services/upload";
import { Toaster, toast } from "sonner";
import { type Data } from "./Types/FileType";
import { Search } from "./Steps/Search";
const APP_STATUS = {
  IDLE: "idle", //al entrar
  ERROR: "error", //cuando hay un error
  UPLOAD: "uploading", //elegir el archivo, y antes que subirlo
  READY_UPLOAD: "ready_upload", //mientras se sube
  READY_USAGE: "ready_usage", //cuando se puedan hacer las busqueda del archivo
} as const;

const BUTTON_SHOW_TEXT = {
  [APP_STATUS.READY_UPLOAD]: "subir archivo",
  [APP_STATUS.UPLOAD]: "subiendo...",
};

type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS]; // ['idle', 'error','uploading','ready_upload','ready_usage']

function App() {
  const [data, setData] = useState<Data>([]);
  const [appstatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);
  const [file, setfile] = useState<File | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files?.[0] //manera de hacerlo
    const [file] = event.target.files ?? [];
    if (file) {
      setfile(file);
      setAppStatus(APP_STATUS.READY_UPLOAD);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (appstatus != APP_STATUS.READY_UPLOAD || !file) {
      return;
    }
    setAppStatus(APP_STATUS.UPLOAD);
    const [error, newdata] = await uploadfile(file);

    if (error) {
      setAppStatus(APP_STATUS.ERROR);
      toast.error(error.message);
      return;
    }
    setAppStatus(APP_STATUS.READY_USAGE);

    if (newdata) {
      setData(newdata);
      toast.success("Archivo subido correctamente");
    }
  };

  const buttonShow =
    appstatus === APP_STATUS.READY_UPLOAD || appstatus === APP_STATUS.UPLOAD;
  const showinput = appstatus != APP_STATUS.READY_USAGE;

  return (
    <>
      <Toaster />
      <h1>Challenge: Upload CSV + Search</h1>
      {showinput && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="file">
            <input
              disabled={appstatus === APP_STATUS.UPLOAD}
              type="file"
              name="file"
              accept=".csv"
              onChange={handleInputChange}
            />
          </label>

          <div className="card">
            {buttonShow && (
              <button disabled={appstatus === APP_STATUS.UPLOAD}>
                {BUTTON_SHOW_TEXT[appstatus]}
              </button>
            )}
          </div>
        </form>
      )}
      

      {
        appstatus === APP_STATUS.READY_USAGE && (
          <Search initialize={data} />
        )
      }
    </>
  );
}

export default App;
