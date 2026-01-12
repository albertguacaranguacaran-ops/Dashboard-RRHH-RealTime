// --- VERSIÓN FINAL: ACCESO TOTAL (SIN CLAVES) ---
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.publishKpis = functions.https.onRequest(async (req, res) => {
  // 1. Permisos CORS (Para que Excel entre sin problemas)
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', '*');

  // Si es una verificación de navegador, responder OK
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    // 2. RECIBIR DATOS (Sin pedir contraseña)
    const data = req.body;
    
    console.log("Datos recibidos:", JSON.stringify(data));

    // 3. GUARDAR EN FIREBASE
    await admin.firestore().collection("dashboards").doc("global_metrics").set(data);

    // 4. RESPONDER ÉXITO
    res.status(200).send("¡ÉXITO TOTAL! Datos recibidos y guardados.");

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error interno: " + error.message);
  }
});