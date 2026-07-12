const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function extractCRMData(records) {
  const prompt = `
You are an expert CRM data extraction assistant.

Your task is to convert the given CSV records into CRM records.

Return ONLY a valid JSON array.

DO NOT:
- Add explanations.
- Add markdown.
- Add \`\`\`json
- Add any text before or after the JSON.

Each object MUST contain these fields:

{
  "created_at": "",
  "name": "",
  "email": "",
  "country_code": "",
  "mobile_without_country_code": "",
  "company": "",
  "city": "",
  "state": "",
  "country": "",
  "lead_owner": "",
  "crm_status": "",
  "crm_note": "",
  "data_source": "",
  "possession_time": "",
  "description": ""
}

Rules:

1. Skip rows that contain neither email nor phone.

2. crm_status must be one of:

GOOD_LEAD_FOLLOW_UP
DID_NOT_CONNECT
BAD_LEAD
SALE_DONE

3. data_source must be one of:

leads_on_demand
meridian_tower
eden_park
varah_swamy
sarjapur_plots

4. If information is missing use an empty string.

CSV Records:

${JSON.stringify(records)}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = {
  extractCRMData,
};