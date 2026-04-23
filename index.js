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
    const { data, error } = await supabase
        .from('mensajes')
        .select('contenido')
        .limit(1)
        .single(); // Esto hace que data no sea una lista, sino un objeto único

    if (error) return res.status(500).json({ error: error.message });
    
    // Si el maestro dice que 'data' es el problema, es porque hay que enviarlo así:
    res.json({ mensaje: data.contenido }); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor encendido en puerto ${PORT}`));