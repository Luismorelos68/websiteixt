// Caso de éxito: una microfinanciera. Por confidencialidad no se publica el nombre del cliente ni sus datos;
// las pantallas del sitio son una versión de demostración con la marca de IXT y datos ficticios.
export const resultados = [
  {
    icono: 'scan-text',
    titulo: 'Solicitudes sin captura manual',
    texto: 'La credencial se fotografía en campo y los datos se llenan solos con OCR + IA. El gerente solo confirma.',
  },
  {
    icono: 'hand-coins',
    titulo: 'Cobranza oportuna',
    texto: 'Un mismo corte diario para todos: cada abono queda con fecha y hora, la clienta recibe su mensaje por WhatsApp y lo atrasado se ve el mismo día.',
  },
  {
    icono: 'activity',
    titulo: 'Monitoreo en tiempo real',
    texto: 'Cada gerente ve su cartera y dirección ve todas, contra la meta y con semáforo, sin esperar al cierre de mes.',
  },
  {
    icono: 'shield-alert',
    titulo: 'Riesgo a la vista',
    texto: 'El dashboard de riesgo dice cuánto está en riesgo, desde cuándo y en qué cartera, hasta la clienta y la cuota.',
  },
  {
    icono: 'shield-check',
    titulo: 'Datos protegidos',
    texto: 'Sesiones por dispositivo con cierre automático, bitácora de cambios y expedientes protegidos conforme a la LFPDPPP.',
  },
  {
    icono: 'wallet',
    titulo: 'Liquidez bajo control',
    texto: 'El análisis de flujo de caja muestra si la colocación del mes se fondea sola o consume caja.',
  },
] as const;

export const avisoConfidencialidad =
  'Por confidencialidad no publicamos el nombre, el logo ni los datos de nuestros clientes. Las pantallas son de una versión de demostración, con la marca de IXT y datos ficticios.';
