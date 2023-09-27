import Openai from 'openai';
import 'dotenv/config'

const openai = new Openai({
    apiKey: process.env.OPEN_AI_API_KEY  // This is also the default, can be omitted
});

export const getJson = async (texto) => {
    // Define la solicitud de generación de texto
    const prompt = createPrompt(texto);

    let response =  await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": prompt }],
    })

    return response.choices[0].message.content
}

const createPrompt = (texto) => {
    return `
    Tienes un fragmento de información que se asemeja a un formulario. La tarea consiste en organizar esta información en un formato JSON estructurado. La información se divide en tres categorías principales: "Employee Information" (Información del empleado), "Employer Information" (Información del empleador) e "Tax and Compensation Information" (Información fiscal y de compensación).
    
    Usa las siguientes claves y sigue este estándar de nomenclatura para cada categoría:
    
    **Employee Information con clave EmployeeInformation :**
    - Clave para el nombre del empleado: "Name"
    - Clave para el número de Seguro Social del empleado: "SocialSecurityNumber"
    - Clave para la dirección del empleado: "Address"
    
    **Employer Information con clave EmployerInformation:**
    - Clave para el nombre del empleador: "Name"
    - Clave para la dirección del empleador: "Address"
    - Clave para el número de identificación del empleador (EIN): "EmployerIdentificationNumber" (Agrega el EIN si está disponible)
    
    **Tax and Compensation Information con clave TaxCompensation:**
    - Clave para la compensación total: "TotalCompensation"
    - Clave para el impuesto federal sobre la renta retenido: "FederalIncomeTaxWithheld"
    - Clave para los salarios sujetos al seguro social: "SocialSecurityWages"
    - Clave para el impuesto sobre el seguro social retenido: "SocialSecurityTaxWithheld" (Agrega la cantidad si está disponible)
    - Clave para los salarios y propinas sujetos a Medicare: "MedicareWagesAndTips"
    - Clave para el impuesto de Medicare retenido: "MedicareTaxWithheld" (Agrega la cantidad si está disponible)
    - Clave para las propinas sujetas al seguro social: "SocialSecurityTips" (Agrega la cantidad si está disponible)
    - Clave para las propinas asignadas: "AllocatedTips" (Agrega la cantidad si está disponible)
    - Clave para los beneficios de cuidado dependiente: "DependentCareBenefits" (Agrega la cantidad si está disponible)
    - Clave para los planes no calificados: "NonqualifiedPlans"
    - Clave para otra compensación: "OtherCompensation" (Agrega la cantidad si está disponible)
    - Clave para los salarios, propinas, etc., a nivel estatal: "StateCompensation"
    - Clave para el impuesto sobre la renta estatal: "StateIncomeTax" (Agrega la cantidad si está disponible)
    - Clave para los salarios, propinas, etc., a nivel local: "LocalCompensation" (Agrega la cantidad si está disponible)
    - Clave para el impuesto sobre la renta local: "LocalIncomeTax" (Agrega la cantidad si está disponible)
    - Clave para el nombre de la localidad: "LocalityName" (Agrega el nombre si está disponible)
    
    Utiliza estas claves y el formato JSON para organizar la información de acuerdo con las categorías mencionadas. Asegúrate de llenar los campos con los valores correctos si están disponibles en el fragmento de información proporcionado.
    El texto es el siguiente: "${texto}"
    `
}
