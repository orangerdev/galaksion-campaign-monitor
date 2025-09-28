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

function writeLog(message) {
  SHEET_LOG.appendRow([CURRENT_DATETIME, message]);
}

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
