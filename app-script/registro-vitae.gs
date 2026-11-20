/**
 * Vitae Hogar — registro de solicitudes en Google Sheets
 * ---------------------------------------------
 * El formulario de la web envía un POST con JSON a este script
 * y cada solicitud queda como una fila nueva en la hoja.
 *
 * Instalación:
 *  1. Crea una hoja de cálculo nueva en Google Sheets (nombre: "Vitae Hogar — Solicitudes").
 *  2. Menú Extensiones → Apps Script.
 *  3. Borra lo que haya y pega este archivo completo.
 *  4. Guarda (Ctrl+S).
 *  5. Implementar → Nueva implementación → Tipo: Aplicación web
 *       · Ejecutar como: Yo
 *       · Quién tiene acceso: Cualquier persona
 *  6. Autoriza los permisos y copia la URL que termina en /exec.
 *  7. Pega esa URL en el build como NEXT_PUBLIC_REGISTRO_URL.
 */

var SHEET_NAME = 'Solicitudes'

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents)
    var ss = SpreadsheetApp.getActiveSpreadsheet()
    var sh = ss.getSheetByName(SHEET_NAME)

    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME)
      sh.appendRow([
        'Recibido',
        'Nombre',
        'Teléfono',
        'Dirección',
        'Fecha de visita',
        'Hora',
        'Exámenes',
        'Autoriza datos',
        'Origen',
        'Estado'
      ])
      sh.getRange('A1:J1').setFontWeight('bold')
      sh.setFrozenRows(1)
    }

    sh.appendRow([
      new Date(),
      data.nombre || '',
      data.telefono || '',
      data.direccion || '',
      data.fecha || '',
      data.hora || '',
      data.examenes || '',
      data.acepta ? 'Sí' : 'No',
      data.origen || 'web',
      'Pendiente'
    ])

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, servicio: 'vitae-hogar-registro' }))
    .setMimeType(ContentService.MimeType.JSON)
}
