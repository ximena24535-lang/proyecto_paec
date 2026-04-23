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
    // Agregué .single() para que traiga solo un objeto, no una lista
    const { data, error } = await supabase
        .from('mensajes')
        .select('contenido')
        .limit(1)
        .single(); 

    if (error) {
        console.log("Error de Supabase:", error.message);
        return res.status(500).json({ mensaje: "Error de conexión" });
    }

    if (data) {
        // Ahora data es un objeto directo { contenido: "lavanda" }
        res.json({ mensaje: data.contenido });
    } else {
        res.json({ mensaje: "Base de datos vacía" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor encendido en puerto ${PORT}`));