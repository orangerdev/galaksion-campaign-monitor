/**
 * GalaksionCampaigns class handles API interactions with the Galaksion advertising platform
 * Provides methods for authentication, campaign management, and data retrieval
 * Integrates with Google Sheets for data storage and campaign monitoring
 */
class GalaksionCampaigns {
  /**
   * Creates a new instance of GalaksionCampaigns
   * Initializes API endpoint and authentication properties
   */
  constructor() {
    this.url = "https://adv.clickadu.com/api/v1.0/";
    this.sheetTarget = null;
    this.emailAddress = null;
    this.password = null;
  }

  /**
   * Sets the email address for API authentication
   * @param {string} emailAddress - The email address for Galaksion account
   * @returns {void}
   */
  setEmail(emailAddress) {
    this.emailAddress = emailAddress;
  }

  /**
   * Sets the password for API authentication
   * @param {string} password - The password for Galaksion account
   * @returns {void}
   */
  setPassword(password) {
    this.password = password;
  }

  /**
   * Sets the target Google Sheets worksheet for data output
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - The target worksheet
   * @returns {void}
   */
  setSheet(sheet) {
    this.sheetTarget = sheet;
  }

  /**
   * Generates a new authentication token using email and password
   * Makes a POST request to the Galaksion auth endpoint and stores the token
   * @returns {string|null} Returns the authentication token on success, null on failure
   */
  generateToken() {
    try {
      // Set the new settings object
      var newSettings = {
        email: this.emailAddress,
        password: this.password,
      };

      // Convert the settings object to a JSON string
      var newSettingsJson = JSON.stringify(newSettings);

      // Set up the HTTP request options
      var options = {
        method: "post",
        contentType: "application/json",
        payload: newSettingsJson,
        headers: {
          Accept: "application/json",
        },
        muteHttpExceptions: true, // Ensure errors are caught and returned
      };

      // Make the HTTP request
      var response = UrlFetchApp.fetch(
        "https://ssp2-api.galaksion.com/api/v1/auth",
        options
      );

      // Parse the JSON response
      var result = JSON.parse(response.getContentText());

      // Check if the token exists
      if (result && result.token) {
        Logger.log("Token received.");
        writeLog("Token received. ✅");

        Logger.log(result);

        return result.token;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      // Log an error if the token is missing
      Logger.log("Error: " + error.message);
      writeLog("⚠️ " + error.message);

      return null;
    }
  }

  /**
   * Stores the authentication token in the configuration sheet
   * @param {string} token - The authentication token to store
   * @returns {void}
   */
  setToken(token) {
    SHEET_CONFIG.getRange("B4").setValue(token);
  }

  /**
   * Sets the token expiration time to 7 hours and 1 minute from now
   * Updates the configuration sheet with the calculated expiration time
   * @returns {void}
   */
  setTokenExpired() {
    // Set the current date and time in the specified format plus 7hours and 1 minute
    const dateTime = Utilities.formatDate(
      new Date(new Date().getTime() + 7 * 60 * 60 * 1000 + 1 * 60 * 1000),
      "GMT",
      "yyyy-MM-dd'T'HH:mm:ss'Z'"
    );

    SHEET_CONFIG.getRange("B6").setValue(dateTime);
  }

  /**
   * Retrieves the current authentication token from the configuration sheet
   * @returns {string} The stored authentication token
   */
  getToken() {
    return SHEET_CONFIG.getRange("B4").getValue();
  }

  /**
   * Refreshes the existing authentication token
   * Extends the token lifetime without requiring re-authentication
   * @returns {string|null} Returns the new token on success, null on failure
   */
  refreshToken() {
    try {
      var options = {
        method: "post",
        contentType: "application/json",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${GALAKSION_TOKEN}`,
        },
        muteHttpExceptions: true, // Ensure errors are caught and returned
      };

      var response = UrlFetchApp.fetch(
        "https://ssp2-api.galaksion.com/jwt/refresh",
        options
      );

      // Parse the JSON response
      var result = JSON.parse(response.getContentText());

      // Check if the token exists
      if (result && result.token) {
        Logger.log("Token refreshed.");
        writeLog("Token refreshed. ✅");

        this.setToken(result.token);
        this.setTokenExpired();

        return result.token;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      // Log an error if the token is missing
      Logger.log("Error: " + error.message);
      writeLog("⚠️ " + error.message);

      return null;
    }
  }

  /**
   * Placeholder for request authorization (currently unused)
   * @returns {void}
   */
  authorizeRequest() {}

  /**
   * Generates a random 32-character hexadecimal analytics session ID
   * Used for tracking API requests and analytics
   * @returns {string} A 32-character hexadecimal string
   */
  generateAnalyticsSession() {
    const chars = "0123456789abcdef";
    let result = "";
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Sends a GET request to the Galaksion API
   * Handles URL construction, authentication headers, and analytics tracking
   * @param {string} page - The API endpoint path
   * @param {Object} params - Query parameters for the request
   * @returns {Object} Parsed JSON response from the API
   */
  sendGetRequest(page, params) {
    // Use different base URL for statistics endpoint
    let baseUrl =
      page === "statistics" ? "https://ssp2-api.galaksion.com/" : this.url;
    let url = baseUrl + page;

    if (params instanceof Object) {
      url += "?";
      const Aparams = [];

      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value instanceof Array) {
          value.forEach((_v) => {
            Aparams.push(`${key}[]=${_v}`);
          });
        } else {
          if (value !== null && value !== undefined) {
            Aparams.push(`${key}=${encodeURIComponent(value)}`);
          }
        }
      });

      url = url + Aparams.join("&");
    }

    const analyticsSession = this.generateAnalyticsSession();
    const analyticsTimestamp = new Date().getTime();

    const response = UrlFetchApp.fetch(url, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: "https://ssp-adv.galaksion.com",
        Referer: "https://ssp-adv.galaksion.com/",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
        "x-ssp": "true",
        "x-analytics-session": analyticsSession,
        "x-analytics-timestamp": analyticsTimestamp.toString(),
      },
      muteHttpExceptions: true,
    });

    Logger.log({ url });

    return JSON.parse(response.getContentText());
  }

  /**
   * Sends a POST request to the Galaksion API
   * @param {string} page - The API endpoint path
   * @param {Object} params - Request payload data
   * @returns {Object} Parsed JSON response from the API
   */
  sendPostRequest(page, params) {
    let url = this.url + page;

    const options = {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
      contentType: "application/json",
      method: "post",
      payload: JSON.stringify(params),
      muteHttpExceptions: true,
    };

    const response = UrlFetchApp.fetch(url, options);

    return JSON.parse(response.getContentText());
  }

  /**
   * Sends a PUT request to the Galaksion API
   * @param {string} page - The API endpoint path
   * @param {Object} params - Request payload data
   * @returns {Object} Parsed JSON response from the API
   */
  sendPutRequest(page, params) {
    let url = this.url + page;

    Logger.log({ url });

    const options = {
      headers: {
        Authorization: `Bearer ${GALAKSION_TOKEN}`,
        Referer: "https://adv.clickadu.com/campaigns",
      },
      contentType: "application/json",
      method: "put",
      payload: JSON.stringify(params),
      muteHttpExceptions: true,
    };

    const response = UrlFetchApp.fetch(url, options);

    return JSON.parse(response.getContentText());
  }

  /**
   * Sends a PATCH request to the Galaksion API
   * Includes full headers for analytics tracking and authentication
   * @param {string} endpoint - The API endpoint path
   * @param {Object} params - Request payload data
   * @returns {Object} Parsed JSON response from the API
   */
  sendPatchRequest(endpoint, params) {
    let url = `https://ssp2-api.galaksion.com/${endpoint}`;

    Logger.log({ url });

    const analyticsSession = this.generateAnalyticsSession();
    const analyticsTimestamp = new Date().getTime();

    const options = {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: "https://ssp-adv.galaksion.com",
        Referer: "https://ssp-adv.galaksion.com/",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
        "x-ssp": "true",
        "x-analytics-session": analyticsSession,
        "x-analytics-timestamp": analyticsTimestamp.toString(),
      },
      method: "patch",
      payload: JSON.stringify(params),
      muteHttpExceptions: true,
    };

    const response = UrlFetchApp.fetch(url, options);

    return JSON.parse(response.getContentText());
  }

  /**
   * Update campaign status
   * @param {string} campaignId - The campaign ID to update
   * @param {number} status - The status to set (0 = working, 100 = paused)
   * @returns {Object} API response
   */
  updateCampaignStatus(campaignId, status) {
    try {
      Logger.log(`Updating campaign ${campaignId} status to ${status}`);
      writeLog(
        `Updating campaign ${campaignId} status to ${
          status === 0 ? "working" : "paused"
        }`
      );

      const response = this.sendPatchRequest(
        `a/campaigns/status/${campaignId}`,
        {
          status: status,
        }
      );

      if (response && response.success !== false) {
        Logger.log(`Campaign ${campaignId} status updated successfully`);
        writeLog(
          `✅ Campaign ${campaignId} status updated to ${
            status === 0 ? "working" : "paused"
          }`
        );
        return response;
      } else {
        throw new Error(response.message || "Failed to update campaign status");
      }
    } catch (error) {
      Logger.log(
        `Error updating campaign ${campaignId} status: ${error.message}`
      );
      writeLog(
        `⚠️ Error updating campaign ${campaignId} status: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * Pause a campaign (set status to 100)
   * @param {string} campaignId - The campaign ID to pause
   * @returns {Object} API response
   */
  pauseCampaign(campaignId) {
    return this.updateCampaignStatus(campaignId, 100);
  }

  /**
   * Resume/Start a campaign (set status to 0)
   * @param {string} campaignId - The campaign ID to resume
   * @returns {Object} API response
   */
  resumeCampaign(campaignId) {
    return this.updateCampaignStatus(campaignId, 0);
  }

  /**
   * Pause multiple campaigns
   * @param {Array<string>} campaignIds - Array of campaign IDs to pause
   * @returns {Array<Object>} Array of API responses
   */
  pauseCampaigns(campaignIds) {
    const results = [];
    for (const campaignId of campaignIds) {
      try {
        const result = this.pauseCampaign(campaignId);
        results.push({ campaignId, success: true, result });
      } catch (error) {
        results.push({ campaignId, success: false, error: error.message });
      }
    }
    return results;
  }

  /**
   * Resume multiple campaigns
   * @param {Array<string>} campaignIds - Array of campaign IDs to resume
   * @returns {Array<Object>} Array of API responses
   */
  resumeCampaigns(campaignIds) {
    const results = [];
    for (const campaignId of campaignIds) {
      try {
        const result = this.resumeCampaign(campaignId);
        results.push({ campaignId, success: true, result });
      } catch (error) {
        results.push({ campaignId, success: false, error: error.message });
      }
    }
    return results;
  }

  /**
   * Clears all campaign data from the target worksheet
   * Removes content from row 2 onwards, preserving headers
   * @returns {void}
   */
  clearCampaigns() {
    if (this.sheetTarget.getLastRow() === 0) {
      Logger.log("No data available to clear.");
      return;
    }

    const startCell = this.sheetTarget.getRange("A2:G");

    const startRow = startCell.getRow();
    const startColumn = startCell.getColumn();

    const lastRow = this.sheetTarget.getLastRow();
    const lastColumn = this.sheetTarget.getLastColumn() + 1;

    if (lastRow < startRow || lastColumn < startColumn) {
      Logger.log("No data available to clear.");
      return;
    }

    const range = this.sheetTarget.getRange(
      startRow,
      startColumn,
      lastRow - startRow + 1,
      lastColumn - startColumn + 1
    );

    range.clearContent();
  }

  /**
   * Writes campaign data to the target worksheet
   * Maps campaign objects to spreadsheet rows starting from row 2
   * @param {Array<Object>} campaigns - Array of campaign objects to write
   * @returns {void}
   */
  writeCampaign(campaigns) {
    // Only write if there are campaigns to write
    if (campaigns.length > 0) {
      // write the campaigns start from row 2
      this.sheetTarget
        .getRange(2, 1, campaigns.length, 9)
        .setValues(
          campaigns.map((campaign) => [
            campaign.id,
            campaign.name,
            campaign.impression,
            campaign.rate,
            campaign.spent,
            campaign.conversion,
            campaign.cpa,
            campaign.status,
            campaign.max,
          ])
        );
    } else {
      Logger.log("No campaigns to write to sheet");
      writeLog("No campaigns found to write to sheet");
    }
  }

  /**
   * Converts numeric campaign status to human-readable string (current API version)
   * @param {number} status - Numeric status code (0 = working, 100 = stopped)
   * @returns {string} Human-readable status string
   */
  getCampaignStatus(status) {
    switch (status) {
      case 0:
        return "working";
      case 100:
        return "stopped";
    }
  }

  /**
   * Retrieves campaign statistics from Galaksion API for specified date range
   * Fetches data using the statistics endpoint with pagination and filtering
   * Processes and writes campaign data to the target worksheet
   * @param {Date} minDate - Start date for data retrieval
   * @param {Date} maxDate - End date for data retrieval
   * @returns {void}
   */
  getCampaigns(minDate, maxDate) {
    // Updated to use new Galaksion Statistics API
    // Endpoint: https://ssp2-api.galaksion.com/statistics
    // Uses filters, order, limit, offset parameters as per API documentation
    this.clearCampaigns();

    const strMinDate =
      minDate.getFullYear() +
      "-" +
      addLeadingZero(minDate.getMonth() + 1) +
      "-" +
      addLeadingZero(minDate.getDate()) +
      " 00:00:00";
    const strMaxDate =
      maxDate.getFullYear() +
      "-" +
      addLeadingZero(maxDate.getMonth() + 1) +
      "-" +
      addLeadingZero(maxDate.getDate()) +
      " 23:59:59";

    let runningCampaigns = 0;
    let campaigns = [];

    const filters = {
      groups: [
        {
          label: "Campaign",
          value: "campaign",
        },
      ],
      dateFrom: strMinDate,
      dateTo: strMaxDate,
      geo: [],
      cities: [],
      platforms: "",
      os: [],
      formats: [],
      browsers: [],
      connections: "",
      campaigns: [],
      zones: "",
      isp: "",
      cpaTests: "",
      trafficQualityPresets: [],
    };

    const order = [
      {
        field: "campaign",
        direction: "DESC",
      },
    ];

    for (let thePage = 0; thePage < TOTAL_PAGES; thePage++) {
      const response = this.sendGetRequest("statistics", {
        filters: JSON.stringify(filters),
        order: JSON.stringify(order),
        limit: 50,
        offset: thePage * 50,
        delta: null,
      });

      Logger.log({
        response,
        groupBy: filters.groups,
        strMinDate,
        strMaxDate,
      });

      if (response?.error) {
        writeLog(response.error.message || "API Error occurred");
        return;
      }

      if (response?.errors) {
        Logger.log("API Errors:", response.errors);
        writeLog("API returned errors");
        return;
      }

      // For statistics API, the response structure may be different
      // Check if we have data in the response
      if (!response || !response.rows || response.rows.length === 0) {
        if (response.code && response.code == "406") {
          // refresh token and retry
          const newToken = this.refreshToken();
          if (newToken) {
            // Retry the current page
            thePage--;
            continue;
          } else {
            writeLog("Token expired. Failed to refresh token");
            return;
          }
        }

        writeLog(
          "No campaign data found in response. Sheet:" +
            this.sheetTarget.getName()
        );
        // If no more data, break the loop
        if (thePage === 0) {
          writeLog("No data at all for the specified date range");
        }
        return;
      }

      response.rows.forEach((campaignData) => {
        runningCampaigns++;

        let should = "running";
        let max = MAX_CPA;

        // For statistics API, the field name is likely 'campaign' instead of 'name'
        let campaignName = campaignData.campaign; // 992833 - [28/09] FR🇫🇷 [BR:SAMSUNG] [OS:A15]
        let campaignId = 0;
        // get campaignId from campaignName, extract number before first space
        // if not found, use campaignData.campaignId or campaignData.id
        const campaignIdMatch = campaignName.match(/^(\d+)\s/);
        if (campaignIdMatch) {
          campaignId = campaignIdMatch[1];
        } else {
          campaignId = campaignData.campaignId || campaignData.id;
        }

        let campaignTitle = campaignName.replace(/^\d+\s-\s/, "").trim();

        let campaignStatus = this.getCampaignStatus(campaignData.status);

        if (
          !campaignTitle.includes("STOP") &&
          !campaignTitle.includes("REST")
        ) {
          let findMax = findCampaignParameter(campaignTitle, "MAX");

          if (findMax) max = findMax;

          // Map statistics API fields to expected fields
          let conversion = parseInt(campaignData.conversions || 0),
            spent = parseFloat(campaignData.money || 0),
            cpa = parseFloat(
              spent > 0 && conversion > 0 ? spent / conversion : 0
            );

          if (conversion === 0 && spent > 0) {
            cpa = spent;

            Logger.log({ test: "Conversion Zero", conversion, cpa, spent });
          }

          campaigns.push({
            id: campaignId,
            name: campaignTitle,
            impression:
              campaignData.impressions || campaignData.impression || 0,
            rate: parseFloat(campaignData.cpm || 0),
            spent,
            conversion,
            cpa,
            status: campaignStatus, // Default status since statistics API may not have status
            max,
          });

          Logger.log({
            test: "Campaign push",
            id: campaignId,
            name: campaignName,
            rate: parseFloat(campaignData.rate || campaignData.ctr || 0),
            spent,
            cpm: parseFloat(campaignData.cpm || campaignData.currentCpm || 0),
            cpa,
            conversion,
            status: campaignStatus,
          });
        }
      });
    }

    this.writeCampaign(campaigns);

    Logger.log(`Total running campaigns: ${runningCampaigns}`);
  }

  /**
   * Retrieves zone performance statistics for a specific campaign
   * Gets detailed zone-level data including impressions, conversions, and CPA
   * @param {string} campaignId - The campaign ID to get zone data for
   * @param {string} dateFrom - Start date in YYYY-MM-DD format
   * @param {string} dateTill - End date in YYYY-MM-DD format
   * @returns {Array<Object>} Array of zone statistics objects
   */
  getZones(campaignId, dateFrom, dateTill) {
    const response = this.sendGetRequest("client/stats", {
      dateFrom,
      dateTill,
      groupBy: "zone_id",
      orderBy: "impressions",
      orderDest: "desc",
      page: 1,
      perPage: 100,
      campaign_id: [campaignId],
    });

    const zones = response.result.items.map((item) => {
      const cpa =
        item.conversions > 0 ? item.spent / item.conversions : item.spent;
      return {
        id: item.zoneId,
        spent: item.spent,
        impressions: item.impressions,
        conversions: item.conversions,
        cpa,
      };
    });

    return zones;
  }

  /**
   * Excludes specified zones from a campaign
   * Prevents the campaign from serving ads on the specified zones
   * @param {string} campaignId - The campaign ID to update
   * @param {Array<string>} zones - Array of zone IDs to exclude
   * @returns {void}
   */
  excludeZones(campaignId, zones) {
    const response = this.sendPostRequest(
      `client/campaigns/${campaignId}/excludeZones/`,
      {
        zoneIds: zones,
      }
    );

    Logger.log({ response });
  }
}
