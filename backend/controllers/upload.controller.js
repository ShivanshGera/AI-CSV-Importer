const Papa = require("papaparse");

const { extractCRMData } = require("../services/gemini.service");

async function uploadCSV(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "CSV file is required",
      });
    }

    const csv = req.file.buffer.toString("utf-8");

    const parsed = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
    });

    if (parsed.errors.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid CSV file",
        errors: parsed.errors,
      });
    }

    const aiResponse = await extractCRMData(parsed.data);

    // Remove markdown if Gemini accidentally returns it
    const cleanedResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const crmData = JSON.parse(cleanedResponse);

    return res.status(200).json({
      success: true,
      totalRecords: parsed.data.length,
      processedRecords: crmData.length,
      data: crmData,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

module.exports = {
  uploadCSV,
};