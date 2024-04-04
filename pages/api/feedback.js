import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "feedback.json");

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const myFile = fs.createWriteStream(filePath);
    myFile.write(
      JSON.stringify({
        email,
        feedback,
      })
    );
    myFile.end();
    res.status(201).json({ message: "File write sucess" });
  } else if (req.method === "GET") {
    const myFile = fs.createReadStream(filePath);

    let data = "";

    myFile.on("data", (chunk) => {
      data += chunk.toString();
    });

    myFile.on("end", () => {
      res.status(200).json({ feedbacks: JSON.parse(data) });
    });
  } else {
    res.status(200).json({ message: "API Called" });
  }
}

export default handler;
