const { GoogleGenAI } = require("@google/genai");
const db = require("../config/db");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const getSuggestion = (req, res) => {

    const symptoms = req.body.symptoms;

    db.query(
        "SELECT id, name, specialization, info FROM doctors",
        async (err, doctors) => {

            if (doctors.length === 0) {
                return res.status(404).json({
                    message: "No doctors available"
                });
            }

            try {

                const doctorList = doctors
                    .map(
                        doctor => `
Name: ${doctor.name}
Specialization: ${doctor.specialization}
Info: ${doctor.info || "N/A"}
`
                    )
                    .join("\n");

                const prompt = `
Available doctors:
${doctorList}
Patient symptoms:
${symptoms}
Choose only one doctor from the list.
Answer in the following format: doctor name and specialisation only. Do not provide any other information.
`;

                const result = await ai.models.generateContent({
                    model: "gemini-3.5-flash",
                    contents: prompt
                });

                res.status(200).json({
                    suggestion: result.text
                });

            } catch (error) {

                console.log(error);

                res.status(500).json({
                    message: "Error generating suggestion."
                });

            }

        }
    );

};

module.exports = {
    getSuggestion
};