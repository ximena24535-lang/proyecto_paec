const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
app.use(cors());

const supabaseUrl = 'https://poobrodvweyqbrmbbvuv.supabase.co/rest/v1/';
const supabaseKey = 'sb_publishable_lXqRcmEYqhitIecJSb89aQ_YjOf_piN'; 
const supabase = createClient(supabaseUrl, supabaseKey);

// REVISA ESTA LÍNEA: Debe ser solo /hola
app.get('/hola', async (req, res) => {
  const { data, error } = await supabase.from('mensajes').select('contenido');

  if (error) return res.status(500).json({ error: error.message });

  if (data && data.length > 0) {
    // Mandamos el mensaje que está en la base de datos
    res.json({ mensaje: data[0].contenido });
  } else {
    res.json({ mensaje: "Base de datos vacía" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor encendido en puerto ${PORT}`));