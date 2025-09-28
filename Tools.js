/**
 * Adds a leading zero to single-digit numbers for formatting purposes
 * Commonly used for date/time formatting to ensure consistent two-digit display
 * @param {number|string} value - The value to format
 * @returns {string} The formatted value with leading zero if needed
 */
function addLeadingZero(value) {
  let newValue = "";

  if (typeof value === "number" && value >= 0 && value < 10) {
    // Tambahkan leading zero jika nilai adalah integer 1 digit
    newValue = "0" + value;
  } else {
    newValue = value;
  }

  return newValue;
}

/**
 * Extracts parameter values from campaign names using regex pattern matching
 * Searches for parameters in the format [PARAM:value] within campaign names
 * @param {string} input - The campaign name or string to search
 * @param {string} param - The parameter name to find (e.g., "MAX", "CPA")
 * @returns {string|boolean} Returns the parameter value if found, false otherwise
 */
function findCampaignParameter(input, param) {
  // Membuat regex dinamis berdasarkan parameter yang diberikan
  const regex = new RegExp(`\\[${param}:(\\d+(\\.\\d+)?)\\]`);
  const match = input.match(regex);

  if (match) {
    const value = match[1]; // Mengambil nilai dari hasil pencocokan
    return value; // Mengembalikan nilai yang ditemukan
  } else {
    return false;
  }
}

/**
 * Writes a timestamped log entry to the LOG worksheet
 * Appends a new row with current datetime and the provided message
 * @param {string} message - The log message to write
 * @returns {void}
 */
function writeLog(message) {
  SHEET_LOG.appendRow([CURRENT_DATETIME, message]);
}

/**
 * Clears old log entries from the LOG worksheet while preserving recent entries
 * Deletes rows from row 2 up to (last row - 2), keeping the header and last 2 entries
 * Requires minimum of 5 rows to perform deletion for safety
 * @returns {void}
 */
function clearLogRows() {
  // Mendapatkan jumlah baris terakhir yang berisi data
  const lastRow = SHEET_LOG.getLastRow();

  // Memeriksa apakah ada cukup baris untuk dihapus
  // Minimal harus ada 5 baris: header (1) + mulai hapus (2) + minimal 1 baris data + 2 baris terakhir yang tidak dihapus
  if (lastRow < 5) {
    writeLog(
      "Tidak cukup baris untuk dihapus. Minimal harus ada 5 baris data."
    );
    return;
  }

  // Menghitung baris yang akan dihapus
  const startRow = 2; // Mulai dari baris kedua
  const endRow = lastRow - 2; // Hingga baris ketiga sebelum baris paling akhir
  const numRowsToDelete = endRow - startRow + 1;

  if (numRowsToDelete > 0) {
    // Menghapus baris-baris yang ditentukan
    SHEET_LOG.deleteRows(startRow, numRowsToDelete);
    writeLog(
      `Berhasil menghapus ${numRowsToDelete} baris dari log (baris ${startRow} hingga ${endRow})`
    );
  } else {
    writeLog("Tidak ada baris yang perlu dihapus.");
  }
}
