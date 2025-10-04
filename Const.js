/**
 * GALAKSION CAMPAIGN MONITOR - CONSTANTS
 *
 * This file contains all global constants and configuration variables
 * used throughout the Galaksion Campaign Monitor application.
 *
 * WORKSHEET REFERENCES:
 * - Configuration and authentication settings
 * - Campaign data storage sheets for different time periods
 * - Control sheets for campaign management operations
 * - Logging and monitoring sheets
 */

// Main spreadsheet reference
const SHEET = SpreadsheetApp.getActiveSpreadsheet();

// Configuration and control worksheets
const SHEET_CONFIG = SHEET.getSheetByName("CONFIG"); // Application configuration and API settings
const SHEET_STOPCAMPAIGN = SHEET.getSheetByName("STOPCAMPAIGN"); // Campaigns to pause/stop
const SHEET_RERUNCAMPAIGN = SHEET.getSheetByName("RERUNCAMPAIGN"); // Campaigns to resume/restart
const SHEET_STOP_ZONES = SHEET.getSheetByName("STOPZONES"); // Zones to exclude from campaigns
const SHEET_LOG = SHEET.getSheetByName("LOG"); // Application logs and activity history

// Campaign data worksheets for different time periods
const SHEET_CAMPAIGN_TODAY = SHEET.getSheetByName("TODAY"); // Today's campaign performance
const SHEET_CAMPAIGN_YESTERDAY = SHEET.getSheetByName("YESTERDAY"); // Yesterday's campaign performance
const SHEET_CAMPAIGN_LAST_2DAYS = SHEET.getSheetByName("LAST2"); // Last 2 days campaign performance
const SHEET_CAMPAIGN_LAST_3DAYS = SHEET.getSheetByName("LAST3"); // Last 3 days campaign performance
const SHEET_CAMPAIGN_LAST_7DAYS = SHEET.getSheetByName("LAST7"); // Last 7 days campaign performance
const SHEET_CAMPAIGN_LAST_30DAYS = SHEET.getSheetByName("LAST30"); // Last 30 days campaign performance
const SHEET_CAMPAIGN_LAST_60DAYS = SHEET.getSheetByName("LAST60"); // Last 60 days campaign performance
const SHEET_CAMPAIGN_THIS_MONTH = SHEET.getSheetByName("THISMONTH"); // Current month campaign performance
const SHEET_CAMPAIGN_LAST_MONTH = SHEET.getSheetByName("LASTMONTH"); // Previous month campaign performance
const SHEET_CAMPAIGN_LAST_2_MONTH = SHEET.getSheetByName("LAST2MONTH"); // 2 months ago campaign performance
const SHEET_CAMPAIGN_PERDAY = SHEET.getSheetByName("PERDAY"); // Campaign performance per day data

// Cell reference for last update timestamp
const SHEET_CELL_DATE_UPDATE = "O1";

/**
 * CONFIGURATION SETTINGS
 * All configuration values are read from the CONFIG worksheet (column B)
 * These settings control API authentication, data retrieval parameters,
 * and application behavior
 */

// Authentication and API settings
const ENABLE_AUTOMATION = SHEET_CONFIG.getRange("B1").getValue(); // Enable/disable automated campaign operations (y/n)
const GALAKSION_EMAIL = SHEET_CONFIG.getRange("B2").getValue(); // Galaksion account email address
const GALAKSION_PASS = SHEET_CONFIG.getRange("B3").getValue(); // Galaksion account password
const GALAKSION_TOKEN = SHEET_CONFIG.getRange("B4").getValue(); // Current API authentication token
const GALAKSION_TOKEN_LIFETIME = SHEET_CONFIG.getRange("B5").getValue(); // Token validity duration
const GALAKSION_TOKEN_EXPIRED = SHEET_CONFIG.getRange("B6").getValue(); // Token expiration timestamp

// Data retrieval parameters
const CAMPAIGN_MIN_TIME = SHEET_CONFIG.getRange("B7").getValue(); // Start date/time for data queries
const CAMPAIGN_MAX_TIME = SHEET_CONFIG.getRange("B8").getValue(); // End date/time for data queries
const CAMPAIGN_ORDERBY = SHEET_CONFIG.getRange("B9").getValue(); // Field to order results by
const CAMPAIGN_ORDER = SHEET_CONFIG.getRange("B10").getValue(); // Sort order (ASC/DESC)
const CAMPAIGN_IS_ARCHIVED = SHEET_CONFIG.getRange("B11").getValue(); // Include archived campaigns (true/false)
const TOTAL_PAGES = parseInt(SHEET_CONFIG.getRange("B12").getValue()); // Maximum pages to fetch from API
const MAX_CPA = SHEET_CONFIG.getRange("B13").getValue(); // Default maximum Cost Per Action limit
const AUTOENABLE_CAMPAIGN = SHEET_CONFIG.getRange("B14").getValue(); // Scheduled time to auto-enable automation

// Current timestamp for logging and updates
const CURRENT_DATETIME = Utilities.formatDate(
  new Date(),
  "GMT+7",
  "MM/dd/yyyy HH:mm:ss"
);
