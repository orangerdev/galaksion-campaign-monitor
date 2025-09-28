const SHEET = SpreadsheetApp.getActiveSpreadsheet();
const SHEET_CONFIG = SHEET.getSheetByName("CONFIG");
const SHEET_CAMPAIGN_TODAY = SHEET.getSheetByName("TODAY");
const SHEET_CAMPAIGN_YESTERDAY = SHEET.getSheetByName("YESTERDAY");
const SHEET_CAMPAIGN_LAST_2DAYS = SHEET.getSheetByName("LAST2");
const SHEET_CAMPAIGN_LAST_3DAYS = SHEET.getSheetByName("LAST3");
const SHEET_CAMPAIGN_LAST_7DAYS = SHEET.getSheetByName("LAST7");
const SHEET_CAMPAIGN_LAST_30DAYS = SHEET.getSheetByName("LAST30");
const SHEET_CAMPAIGN_LAST_60DAYS = SHEET.getSheetByName("LAST60");
const SHEET_CAMPAIGN_THIS_MONTH = SHEET.getSheetByName("THISMONTH");
const SHEET_CAMPAIGN_LAST_MONTH = SHEET.getSheetByName("LASTMONTH");
const SHEET_CAMPAIGN_LAST_2_MONTH = SHEET.getSheetByName("LAST2MONTH");
const SHEET_STOPCAMPAIGN = SHEET.getSheetByName("STOPCAMPAIGN");
const SHEET_RERUNCAMPAIGN = SHEET.getSheetByName("RERUNCAMPAIGN");
const SHEET_STOP_ZONES = SHEET.getSheetByName("STOPZONES");
const SHEET_LOG = SHEET.getSheetByName("LOG");

const SHEET_CELL_DATE_UPDATE = "O1";

const ENABLE_AUTOMATION = SHEET_CONFIG.getRange("B1").getValue();
const GALAKSION_EMAIL = SHEET_CONFIG.getRange("B2").getValue();
const GALAKSION_PASS = SHEET_CONFIG.getRange("B3").getValue();
const GALAKSION_TOKEN = SHEET_CONFIG.getRange("B4").getValue();
const GALAKSION_TOKEN_LIFETIME = SHEET_CONFIG.getRange("B5").getValue();
const GALAKSION_TOKEN_EXPIRED = SHEET_CONFIG.getRange("B6").getValue();
const CAMPAIGN_MIN_TIME = SHEET_CONFIG.getRange("B7").getValue();
const CAMPAIGN_MAX_TIME = SHEET_CONFIG.getRange("B8").getValue();
const CAMPAIGN_ORDERBY = SHEET_CONFIG.getRange("B9").getValue();
const CAMPAIGN_ORDER = SHEET_CONFIG.getRange("B10").getValue();
const CAMPAIGN_IS_ARCHIVED = SHEET_CONFIG.getRange("B11").getValue();
const TOTAL_PAGES = parseInt(SHEET_CONFIG.getRange("B12").getValue());
const MAX_CPA = SHEET_CONFIG.getRange("B13").getValue();
const AUTOENABLE_CAMPAIGN = SHEET_CONFIG.getRange("B14").getValue();

const CURRENT_DATETIME = Utilities.formatDate(
  new Date(),
  "GMT+7",
  "MM/dd/yyyy HH:mm:ss"
);
