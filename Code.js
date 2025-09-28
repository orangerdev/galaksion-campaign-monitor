/**
 * Generates a new authentication token for the Galaksion API
 * Uses the email and password from the configuration sheet to authenticate
 * and stores the token for future API requests.
 *
 * @returns {void}
 */
function galaksionGenerateToken() {
  const galaksionCampaign = new GalaksionCampaigns();

  galaksionCampaign.setEmail(GALAKSION_EMAIL);
  galaksionCampaign.setPassword(GALAKSION_PASS);

  galaksionCampaign.generateToken();
}

/**
 * Refreshes the existing Galaksion API authentication token
 * Extends the token lifetime without requiring re-authentication
 *
 * @returns {void}
 */
function galaksionRefreshToken() {
  const galaksionCampaign = new GalaksionCampaigns();
  galaksionCampaign.refreshToken();
}

/**
 * Updates the last update timestamp on a Google Sheets worksheet
 * Sets the current date and time in GMT+7 timezone to a specific cell
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} theSheet - The worksheet to update
 * @returns {void}
 */
function updateLastUpdate(theSheet) {
  const currentDateTime = new Date();
  const formattedDateTime = Utilities.formatDate(
    currentDateTime,
    "GMT+7",
    "MM/dd/yyyy HH:mm:ss"
  );
  theSheet.getRange(SHEET_CELL_DATE_UPDATE).setValue(formattedDateTime);
}

/**
 * Retrieves and displays today's campaign data from Galaksion
 * Fetches campaign statistics for the current day and writes them to the TODAY sheet
 *
 * @returns {void}
 */
function galaksionGetCampaignsToday() {
  const galaksionCampaign = new GalaksionCampaigns();

  const minDate = new Date(CAMPAIGN_MIN_TIME);
  const maxDate = new Date(CAMPAIGN_MAX_TIME);

  galaksionCampaign.setSheet(SHEET_CAMPAIGN_TODAY);

  updateLastUpdate(SHEET_CAMPAIGN_TODAY);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

/**
 * Retrieves and displays yesterday's campaign data from Galaksion
 * Fetches campaign statistics for the previous day (00:00:00 to 23:59:59)
 * and writes them to the YESTERDAY sheet
 *
 * @returns {void}
 */
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

/**
 * Retrieves and displays campaign data from the last 2 days
 * Fetches campaign statistics for a 2-day period and writes them to the LAST2 sheet
 *
 * @returns {void}
 */
function galaksionGetCampaignsLast2Days() {
  const galaksionCampaign = new GalaksionCampaigns();
  galaksionCampaign.setSheet(SHEET_CAMPAIGN_LAST_2DAYS);
  const maxDate = new Date(CAMPAIGN_MAX_TIME);

  const minDate = new Date(maxDate);
  minDate.setDate(minDate.getDate() - 2); // Mengurangi 2 hari dari maxDate

  updateLastUpdate(SHEET_CAMPAIGN_LAST_3DAYS);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

/**
 * Retrieves and displays campaign data from the last 3 days
 * Fetches campaign statistics for a 3-day period and writes them to the LAST3 sheet
 *
 * @returns {void}
 */
function galaksionGetCampaignsLast3Days() {
  const galaksionCampaign = new GalaksionCampaigns(SHEET_CAMPAIGN_LAST_3DAYS);
  galaksionCampaign.setSheet(SHEET_CAMPAIGN_LAST_3DAYS);

  const maxDate = new Date(CAMPAIGN_MAX_TIME);

  const minDate = new Date(maxDate);
  minDate.setDate(minDate.getDate() - 3); // Mengurangi 3 hari dari maxDate

  updateLastUpdate(SHEET_CAMPAIGN_LAST_3DAYS);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

/**
 * Retrieves and displays campaign data from the last 7 days
 * Fetches campaign statistics for a 7-day period and writes them to the LAST7 sheet
 *
 * @returns {void}
 */
function galaksionGetCampaignsLast7Days() {
  const galaksionCampaign = new GalaksionCampaigns();
  galaksionCampaign.setSheet(SHEET_CAMPAIGN_LAST_7DAYS);

  const maxDate = new Date(CAMPAIGN_MAX_TIME);

  const minDate = new Date(maxDate);
  minDate.setDate(minDate.getDate() - 7); // Mengurangi 7 hari dari maxDate

  updateLastUpdate(SHEET_CAMPAIGN_LAST_7DAYS);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

/**
 * Retrieves and displays campaign data from the last 30 days
 * Fetches campaign statistics for a 30-day period and writes them to the LAST30 sheet
 *
 * @returns {void}
 */
function galaksionGetCampaignsLast30Days() {
  const galaksionCampaign = new GalaksionCampaigns();
  galaksionCampaign.setSheet(SHEET_CAMPAIGN_LAST_30DAYS);

  const maxDate = new Date(CAMPAIGN_MAX_TIME);

  const minDate = new Date(maxDate);
  minDate.setDate(minDate.getDate() - 30); // Mengurangi 30 hari dari maxDate

  updateLastUpdate(SHEET_CAMPAIGN_LAST_30DAYS);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

/**
 * Retrieves and displays campaign data from the last 60 days
 * Fetches campaign statistics for a 60-day period and writes them to the LAST60 sheet
 *
 * @returns {void}
 */
function galaksionGetCampaignsLast60Days() {
  const galaksionCampaign = new GalaksionCampaigns();
  galaksionCampaign.setSheet(SHEET_CAMPAIGN_LAST_60DAYS);

  const maxDate = new Date(CAMPAIGN_MAX_TIME);

  const minDate = new Date(maxDate);
  minDate.setDate(minDate.getDate() - 60); // Mengurangi 60 hari dari maxDate

  updateLastUpdate(SHEET_CAMPAIGN_LAST_60DAYS);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

/**
 * Retrieves and displays campaign data for the current month
 * Fetches campaign statistics from the 1st day of current month to today
 * and writes them to the THISMONTH sheet
 *
 * @returns {void}
 */
function galaksionGetCampaignsThisMonth() {
  const galaksionCampaign = new GalaksionCampaigns();
  galaksionCampaign.setSheet(SHEET_CAMPAIGN_THIS_MONTH);

  const maxDate = new Date(CAMPAIGN_MAX_TIME);

  const minDate = new Date(maxDate);
  minDate.setDate(1); // Mengatur tanggal menjadi 1 untuk mendapatkan awal bulan

  updateLastUpdate(SHEET_CAMPAIGN_THIS_MONTH);

  galaksionCampaign.getCampaigns(minDate, maxDate);
}

/**
 * Retrieves and displays campaign data for the previous month
 * Fetches campaign statistics for the entire previous month (1st to last day)
 * and writes them to the LASTMONTH sheet
 *
 * @returns {void}
 */
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

/**
 * Retrieves and displays campaign data for 2 months ago
 * Fetches campaign statistics for the entire month that was 2 months ago
 * and writes them to the LAST2MONTH sheet
 *
 * @returns {void}
 */
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

/**
 * Stops/pauses multiple campaigns listed in the STOPCAMPAIGN sheet
 * Reads campaign IDs from column A and sends pause requests to Galaksion API
 * Logs success and failure results for each campaign
 *
 * @returns {void}
 */
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

/**
 * Restarts/resumes multiple campaigns listed in the RERUNCAMPAIGN sheet
 * Only executes if automation is enabled (ENABLE_AUTOMATION = "y")
 * Reads campaign IDs from column A and sends resume requests to Galaksion API
 * Logs success and failure results for each campaign
 *
 * @returns {boolean|void} Returns false if automation is disabled, void otherwise
 */
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

/**
 * Checks if automation should be automatically enabled and updates the configuration
 * Compares current time with AUTOENABLE_CAMPAIGN setting and enables automation
 * if the scheduled time has passed
 *
 * @returns {void}
 */
function checkAndUpdateAutomation() {
  const currentDateTime = new Date(); // Waktu saat ini
  const autoEnableDateTime = new Date(AUTOENABLE_CAMPAIGN); // Konversi AUTOENABLE_CAMPAIGN ke Date object

  if (ENABLE_AUTOMATION != "y" && currentDateTime > autoEnableDateTime) {
    SHEET_CONFIG.getRange("B1").setValue("y"); // Update nilai pada range B1 menjadi 'y'
    writeLog("Automation enabled: Updated CONFIG B1 to 'y'");
  }
}

/**
 * Retrieves zone statistics for a specific campaign (demo function)
 * Gets zone performance data for campaign ID "3410554" between specified dates
 * and logs each zone's statistics to the console
 *
 * @returns {void}
 */
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
