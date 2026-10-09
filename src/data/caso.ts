// Caso de éxito: una microfinanciera. Por confidencialidad no se publica el nombre del cliente ni sus datos;
// las pantallas del sitio son una versión de demostración con la marca de IXT y datos ficticios.
export const resultados = [
  {
    icono: 'scan-text',
    titulo: 'Solicitudes sin captura manual',
    texto: 'La credencial se fotografía en campo y los datos se llenan solos con OCR + IA. El gerente solo confirma.',
  },
  {
    icono: 'activity',
    titulo: 'Decisiones con cifras del momento',
    texto: 'Mora, cartera y colocación por gerente en tiempo real, sin esperar al cierre de mes.',
  },
  {
    icono: 'calendar-check',
    titulo: 'Cobranza semanal al día',
    texto: 'Cada pago queda registrado con fecha y hora, y lo pendiente se ve de inmediato.',
  },
  {
    icono: 'users',
    titulo: 'Expedientes completos',
    texto: 'Alertas cuando a un cliente o a un grupo le falta información, y solicitudes repetidas detectadas al momento.',
  },
  {
    icono: 'scale',
    titulo: 'Todos cuentan igual',
    texto: 'Las reglas de crédito las aplica el sistema y se explican en pantalla.',
  },
  {
    icono: 'wallet',
    titulo: 'Liquidez bajo control',
    texto: 'El análisis de flujo de caja muestra si la colocación del mes se fondea sola o consume caja.',
  },
] as const;

export const avisoConfidencialidad =
  'Por confidencialidad no publicamos el nombre, el logo ni los datos de nuestros clientes. Las pantallas son de una versión de demostración, con la marca de IXT y datos ficticios.';
