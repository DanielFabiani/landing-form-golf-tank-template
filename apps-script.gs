/**
 * apps-script.gs
 * Pegá en: Extensiones → Apps Script → reemplazá todo → Guardar
 * → Implementar → Web App (ejecutar como: Yo / acceso: Cualquier persona)
 */
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    if (sheet.getLastRow() === 0) {
      const headers = [
        "Nombre",
        "Apellido",
        "Email",
        "WhatsApp",
        "Handicap",
        "Empresa",
      ];
      sheet.appendRow(headers);
      const h = sheet.getRange(1, 1, 1, headers.length);
      h.setFontWeight("bold");
      h.setBackground("#002103");
      h.setFontColor("#ffffff");
    }

    sheet.appendRow([
      data.nombre || "",
      data.apellido || "",
      data.email || "",
      data.whatsapp || "",
      data.handicap || "",
      data.empresa || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "ok" }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: err.message }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function testDoPost() {
  const mock = {
    postData: {
      contents: JSON.stringify({
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan@test.com",
        whatsapp: "11 1234-5678",
        handicap: "AAG 135052",
        empresa: "Empresa SA",
      }),
    },
  };
  Logger.log(doPost(mock).getContent());
}
