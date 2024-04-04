import fs from "fs";
import path from "path";

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const myFile = fs.createWriteStream(filePath);
    myFile.write(JSON.stringify({
      email,
      feedback,
    }));
    myFile.end();
    res.status(201).json({ message: "File write sucess" });
  }

  res.status(200).json({ message: "This works" });
}

export default handler;
