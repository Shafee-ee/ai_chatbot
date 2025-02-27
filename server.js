import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import axios from "axios";

dotenv.config();
const app = express();

//parse JSON
app.use(express.json());

//Enable CORS for your frontend URL
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//POST endpoint that calls the Gemini API
app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        //constructing the Gemini API URL with the endpoint and my API
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

        //calling the Gemini API with the provided message
        const response = await axios.post(
            geminiUrl, {
            contents: [{ parts: [{ text: message }] }],
            temperature: 0.9

        },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }

        );

        const reply =
        const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text.replace(/\n/g, "<br>") || "No reply from Gemini API";
        "No reply from Gemini API";


        res.json({ reply });
    }
    catch (error) {
        console.error("Error in /chat:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));