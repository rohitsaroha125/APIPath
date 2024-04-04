import fs from "fs";
import path from "path";

const myFilePath = path.join(process.cwd(), "data", "feedback.json");

function handler(req, res) {
  if (req.method === "GET") {
    const feedbackId = req.query.feedbackId;
    const myFile = fs.createReadStream(myFilePath);

    let data = "";

    myFile.on("data", (chunk) => {
      data += chunk.toString();
    });

    myFile.on("end", () => {
      const myArr = JSON.parse(data);
      const foundData = myArr.find((item) => item.email === feedbackId);
      res.status(200).json({ feedback: foundData });
    });
  }
}

export default handler;
