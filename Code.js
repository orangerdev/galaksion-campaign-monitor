function galaksionGenerateToken() {
  const galaksionCampaign = new GalaksionCampaigns();

  galaksionCampaign.setEmail(GALAKSION_EMAIL);
  galaksionCampaign.setPassword(GALAKSION_PASS);

  galaksionCampaign.generateToken();
}

function galaksionRefreshToken() {
  const galaksionCampaign = new GalaksionCampaigns();
  galaksionCampaign.refreshToken();
}

function updateLastUpdate(theSheet) {
  const currentDateTime = new Date();
  const formattedDateTime = Utilities.formatDate(
    currentDateTime,
    "GMT+7",
    "MM/dd/yyyy HH:mm:ss"
  );
  theSheet.getRange(SHEET_CELL_DATE_UPDATE).setValue(formattedDateTime);
}

function galaksionGetCampaignsToday() {
  const galaksionCampaign = new GalaksionCampaigns();

  const minDate = new Date(CAMPAIGN_MIN_TIME);
  const maxDate = new Date(CAMPAIGN_MAX_TIME);

  galaksionCampaign.setSheet(SHEET_CAMPAIGN_TODAY);

  updateLastUpdate(SHEET_CAMPAIGN_TODAY);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

function galaksionGetCampaignsYesterday() {
  const galaksionCampaign = new GalaksionCampaigns();
  galaksionCampaign.setSheet(SHEET_CAMPAIGN_YESTERDAY);

  // Set maxDate to 23:59:59 of yesterday
  const maxDate = new Date(CAMPAIGN_MAX_TIME);
  maxDate.setDate(maxDate.getDate() - 1);
  maxDate.setHours(23, 59, 59, 999);

  // Set minDate to 00:00:00 of yesterday
  const minDate = new Date(maxDate);
  minDate.setHours(0, 0, 0, 0);

  updateLastUpdate(SHEET_CAMPAIGN_YESTERDAY);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

function galaksionGetCampaignsLast2Days() {
  const galaksionCampaign = new GalaksionCampaigns();
  galaksionCampaign.setSheet(SHEET_CAMPAIGN_LAST_2DAYS);
  const maxDate = new Date(CAMPAIGN_MAX_TIME);

  const minDate = new Date(maxDate);
  minDate.setDate(minDate.getDate() - 2); // Mengurangi 2 hari dari maxDate

  updateLastUpdate(SHEET_CAMPAIGN_LAST_3DAYS);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

function galaksionGetCampaignsLast3Days() {
  const galaksionCampaign = new GalaksionCampaigns(SHEET_CAMPAIGN_LAST_3DAYS);
  galaksionCampaign.setSheet(SHEET_CAMPAIGN_LAST_3DAYS);

  const maxDate = new Date(CAMPAIGN_MAX_TIME);

  const minDate = new Date(maxDate);
  minDate.setDate(minDate.getDate() - 3); // Mengurangi 3 hari dari maxDate

  updateLastUpdate(SHEET_CAMPAIGN_LAST_3DAYS);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

function galaksionGetCampaignsLast7Days() {
  const galaksionCampaign = new GalaksionCampaigns();
  galaksionCampaign.setSheet(SHEET_CAMPAIGN_LAST_7DAYS);

  const maxDate = new Date(CAMPAIGN_MAX_TIME);

  const minDate = new Date(maxDate);
  minDate.setDate(minDate.getDate() - 7); // Mengurangi 7 hari dari maxDate

  updateLastUpdate(SHEET_CAMPAIGN_LAST_7DAYS);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

function galaksionGetCampaignsLast30Days() {
  const galaksionCampaign = new GalaksionCampaigns();
  galaksionCampaign.setSheet(SHEET_CAMPAIGN_LAST_30DAYS);

  const maxDate = new Date(CAMPAIGN_MAX_TIME);

  const minDate = new Date(maxDate);
  minDate.setDate(minDate.getDate() - 30); // Mengurangi 30 hari dari maxDate

  updateLastUpdate(SHEET_CAMPAIGN_LAST_30DAYS);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

function galaksionGetCampaignsLast60Days() {
  const galaksionCampaign = new GalaksionCampaigns();
  galaksionCampaign.setSheet(SHEET_CAMPAIGN_LAST_60DAYS);

  const maxDate = new Date(CAMPAIGN_MAX_TIME);

  const minDate = new Date(maxDate);
  minDate.setDate(minDate.getDate() - 60); // Mengurangi 60 hari dari maxDate

  updateLastUpdate(SHEET_CAMPAIGN_LAST_60DAYS);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

function galaksionGetCampaignsThisMonth() {
  const galaksionCampaign = new GalaksionCampaigns();
  galaksionCampaign.setSheet(SHEET_CAMPAIGN_THIS_MONTH);

  const maxDate = new Date(CAMPAIGN_MAX_TIME);

  const minDate = new Date(maxDate);
  minDate.setDate(1); // Mengatur tanggal menjadi 1 untuk mendapatkan awal bulan

  updateLastUpdate(SHEET_CAMPAIGN_THIS_MONTH);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

function galaksionGetCampaignsLastMonth() {
  const galaksionCampaign = new GalaksionCampaigns();
  galaksionCampaign.setSheet(SHEET_CAMPAIGN_LAST_MONTH);

  // Mendapatkan tanggal hari ini
  const today = new Date();

  // Mengatur maxDate ke hari terakhir bulan lalu
  const maxDate = new Date(today.getFullYear(), today.getMonth() - 1 + 1, 0); // +1 lalu -1 = bulan lalu, 0 = hari terakhir
  maxDate.setHours(23, 59, 59, 999); // Set ke akhir hari

  // Mengatur minDate ke hari pertama bulan lalu
  const minDate = new Date(today.getFullYear(), today.getMonth() - 1, 1); // Bulan lalu, tanggal 1
  minDate.setHours(0, 0, 0, 0); // Set ke awal hari

  Logger.log({ minDate, maxDate });

  updateLastUpdate(SHEET_CAMPAIGN_LAST_MONTH);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

function galaksionGetCampaignsLas2MonthsAgo() {
  const galaksionCampaign = new GalaksionCampaigns();
  galaksionCampaign.setSheet(SHEET_CAMPAIGN_LAST_2_MONTH);

  // Mendapatkan tanggal hari ini
  const today = new Date();

  // Mendapatkan tangal akhir 2 bulan yang lalu
  const maxDate = new Date(today.getFullYear(), today.getMonth() - 2 + 1, 0);
  maxDate.setHours(23, 59, 59, 999); // Set ke akhir hari

  // Mendapatkan tanggal awal 2 bulan yang lalu
  const minDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  minDate.setHours(0, 0, 0, 0); // Set ke awal hari

  Logger.log({ minDate, maxDate });

  updateLastUpdate(SHEET_CAMPAIGN_LAST_2_MONTH);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

function galaksionStopCampaigns() {
  let campaigns = [];

  const theLastRow = SHEET_STOPCAMPAIGN.getLastRow();
  const theValues = SHEET_STOPCAMPAIGN.getRange(
    "A1:A" + theLastRow
  ).getValues();

  if (theValues.length == 0) return;

  if (theValues[0].length == 0) return;

  if (theValues[0][0] == "#N/A") return;

  campaigns = theValues.map((dvalue) => {
    return dvalue[0];
  });

  try {
    const galaksionCampaign = new GalaksionCampaigns();

    // Use the new pauseCampaigns method instead of old API
    const results = galaksionCampaign.pauseCampaigns(campaigns);

    Logger.log({ results });

    // Check results and log accordingly
    const successfulCampaigns = results
      .filter((r) => r.success)
      .map((r) => r.campaignId);
    const failedCampaigns = results.filter((r) => !r.success);

    if (successfulCampaigns.length > 0) {
      writeLog(`Stop campaigns : ${successfulCampaigns.join(", ")}`);
    }

    if (failedCampaigns.length > 0) {
      const failedIds = failedCampaigns.map((r) => r.campaignId);
      const errors = failedCampaigns.map((r) => r.error).join(", ");
      writeLog(
        `Cant stop campaigns : ${failedIds.join(", ")} | Reason: ${errors}`
      );
    }
  } catch (error) {
    Logger.log({ error: error.message });
    writeLog(`⚠️ Error stopping campaigns: ${error.message}`);
  }
}

function galaksionRerunCampaigns() {
  let campaigns = [];

  if (ENABLE_AUTOMATION !== "y") {
    writeLog("Rerun disabled");
    return false;
  }

  const theLastRow = SHEET_RERUNCAMPAIGN.getLastRow();
  const theValues = SHEET_RERUNCAMPAIGN.getRange(
    "A1:A" + theLastRow
  ).getValues();

  if (theValues.length == 0) return;

  if (theValues[0].length == 0) return;

  if (theValues[0][0] == "#N/A") return;

  campaigns = theValues.map((dvalue) => {
    return dvalue[0];
  });

  try {
    const galaksionCampaign = new GalaksionCampaigns();

    // Use the new resumeCampaigns method instead of old API
    const results = galaksionCampaign.resumeCampaigns(campaigns);

    Logger.log({ results, campaigns, theValues });

    // Check results and log accordingly
    const successfulCampaigns = results
      .filter((r) => r.success)
      .map((r) => r.campaignId);
    const failedCampaigns = results.filter((r) => !r.success);

    if (successfulCampaigns.length > 0) {
      writeLog(`Start campaigns : ${successfulCampaigns.join(", ")}`);
    }

    if (failedCampaigns.length > 0) {
      const failedIds = failedCampaigns.map((r) => r.campaignId);
      const errors = failedCampaigns.map((r) => r.error).join(", ");
      writeLog(
        `Cant start campaigns : ${failedIds.join(", ")} | Reason: ${errors}`
      );
    }
  } catch (error) {
    Logger.log({ error: error.message });
    writeLog(`⚠️ Error starting campaigns: ${error.message}`);
  }
}

function checkAndUpdateAutomation() {
  const currentDateTime = new Date(); // Waktu saat ini
  const autoEnableDateTime = new Date(AUTOENABLE_CAMPAIGN); // Konversi AUTOENABLE_CAMPAIGN ke Date object

  if (ENABLE_AUTOMATION != "y" && currentDateTime > autoEnableDateTime) {
    SHEET_CONFIG.getRange("B1").setValue("y"); // Update nilai pada range B1 menjadi 'y'
    writeLog("Automation enabled: Updated CONFIG B1 to 'y'");
  }
}

function galaksionGetCampainZones() {
  const galaksionCampaign = new GalaksionCampaigns();

  const zones = galaksionCampaign.getZones(
    "3410554",
    "2025-06-01",
    "2025-06-04"
  );

  zones.forEach((zone) => {
    Logger.log(zone);
  });
}
