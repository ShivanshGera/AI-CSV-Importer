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

    // Process CSV in batches
    const batchSize = 20;
    const crmData = [];

    for (let i = 0; i < parsed.data.length; i += batchSize) {
      const batch = parsed.data.slice(i, i + batchSize);

      const aiResponse = await extractCRMData(batch);

      // Remove markdown if Gemini accidentally returns it
      const cleanedResponse = aiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsedBatch = JSON.parse(cleanedResponse);

      crmData.push(...parsedBatch);
    }

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