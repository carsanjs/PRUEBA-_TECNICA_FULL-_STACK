import express from "express";
import cors from "cors";
import multer from "multer";
import csvToJson from "convert-csv-to-json";
const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
const port = process.env.PORT ?? 3000;

// array de objetos(Record) que contien un key y un value(string, string)
let userData: Array<Record<string, string>> = [];
app.use(cors()); //permitir cors

app.post("/api/file", upload.single("file"), async (req, res) => {
  //1.extract file from request
  const { file } = req;
  // 2. validate tha we hace file
  if (!file) {
    return res.status(500).json({ message: "file is required" });
  }
  // 3. validate the nimetype (csv)
  if (file.mimetype !== "text/csv") {
    return res.status(500).json({ message: "file must be a csv" });
  }
  // 4. transform el file (Buffer to string)
  let json: Array<Record<string, string>> = [];
  try {
    const rawCSV = Buffer.from(file.buffer).toString("utf-8");
    console.log(rawCSV);
    // 5. transform string(csv) to json
    json = csvToJson.fieldDelimiter(",").csvStringToJson(rawCSV);
    console.log(json);
  } catch (error) {
    return res.status(500).json({ message: "Error parsing the file" });
  }
  // 6.save ethe json to db(or memory)
  userData = json;
  // 7.Return 2000 with the message and the JSON
  return res
    .status(200)
    .json({ data: [], json, message: "El archivo se cargo correctamente" });
});

app.get("/", async (req, res) => {
  return res.json("hellow world");
});

app.get("/api/users", async (req, res) => {
  //1.extract the query param "q" from the request
  const { q } = req.query;
  // 2. validate that we have the query param
  if (!q) {
    return res.status(500).json({ message: "query param 'q' is required" });
  }
  if (Array.isArray(q)) {
    return res
      .status(500)
      .json({ message: "query param 'q' must be a string" });
  }
  // 3. filter the data from the db(or memory)with the quwey param
  const search = q.toString().toLowerCase();
  // const filteredData = userData.filter((user:Record<string,string>)=>{
  //     return Object.values(user).some((value:string)=>{
  //         return value.toString().toLowerCase().includes(search)
  //     })
  // })
  const filteredData = userData.filter((row) => {
    return Object.values(row).some((value) =>
      value.toLowerCase().includes(search)
    );
  });
  // 4. return 200 with the filtered data
  return res.status(200).json({ data: filteredData });
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
