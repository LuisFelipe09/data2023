import { ImageAnnotatorClient } from '@google-cloud/vision'
import 'dotenv/config'


// Crea una instancia del cliente de la API de Visión
const client = new ImageAnnotatorClient();

export const analyzeImage = async (image) => {
    //const fileName = 'receta-medica-2.jpg';

    // Lee el contenido de la imagen en formato base64
    //const image = await fs.promises.readFile(fileName, 'base64');

    // Realiza la solicitud a la API de Visión
    const [result] = await client.textDetection({
        image: { content: image },
    });

    // Procesa los resultados de detección de texto
    const detections = result.textAnnotations;
    if (detections.length === 0) {
        console.log('No se encontró texto en la imagen.');
        return;
    }

    return detections[0].description;  
}
