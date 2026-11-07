import { jsPDF } from 'jspdf';

/**
 * Genera y descarga un archivo PDF elegante y profesional de los mensajes
 * usando jsPDF de forma nativa (sin html2canvas para evitar el error de CSS oklch de Tailwind 4).
 */
export async function exportMessagesPdf(messages = []) {
  if (!messages || messages.length === 0) {
    alert('Aún no hay dedicatorias registradas en la base de datos para descargar.');
    return;
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Paleta de acentos para las tarjetas de mensajes
  const accents = [
    [236, 72, 153], // Rosa (Pink-500)
    [245, 158, 11],  // Oro/Ámbar
    [2, 132, 199],   // Azul Cielo
    [139, 92, 246],  // Púrpura
    [16, 185, 129],  // Esmeralda
  ];

  // ==========================================
  // ENCABEZADO CONMEMORATIVO (PORTADA)
  // ==========================================
  // Fondo del banner
  doc.setFillColor(254, 242, 248); // Rosa pastel muy suave
  doc.setDrawColor(244, 114, 182); // Borde rosa suave
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, 14, contentWidth, 38, 3, 3, 'FD');

  // Cintillo superior
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(190, 24, 93); // Pink-700
  doc.text(
    'BEBE F.C. - LIBRO OFICIAL DE DEDICATORIAS Y RECUERDOS',
    pageWidth / 2,
    22,
    { align: 'center' }
  );

  // Título principal
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.text('Baby Shower & Revelacion de Genero', pageWidth / 2, 29, {
    align: 'center',
  });

  // Anuncio ganador
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(219, 39, 119); // Pink-600
  doc.text('Es Nina! Bienvenida Lia Saori', pageWidth / 2, 36, {
    align: 'center',
  });

  // Datos del evento
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const metadataText = `Padres: Yolanda Ramirez & Ulises Lavariega   |   25 de Octubre de 2026   |   Total: ${messages.length} dedicatorias`;
  doc.text(metadataText, pageWidth / 2, 44, { align: 'center' });

  // Título de la sección
  let currentY = 60;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('PIZARRA DE FELICITACIONES DE LA AFICION', margin, currentY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    `Firmas registradas: ${messages.length}`,
    pageWidth - margin,
    currentY,
    { align: 'right' }
  );

  // Línea divisoria
  currentY += 3;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 6;

  // ==========================================
  // LISTA DE TARJETAS DE MENSAJES
  // ==========================================
  messages.forEach((msg, idx) => {
    const accent = accents[idx % accents.length];

    // Formatear texto del mensaje
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9.5);
    const cleanContent = (msg.contenido || '')
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '') // Quitar emojis si no son soportados por la fuente estándar
      .trim();

    const contentLines = doc.splitTextToSize(
      cleanContent ? `"${cleanContent}"` : 'Sin contenido',
      contentWidth - 14
    );

    // Calcular altura de la tarjeta dinámicamente
    const cardHeight = Math.max(18, 12 + contentLines.length * 4.4);

    // Salto de página si la tarjeta se sale del límite
    if (currentY + cardHeight > pageHeight - 18) {
      doc.addPage();
      currentY = 16;
    }

    // Fondo blanco y borde sutil de la tarjeta
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, currentY, contentWidth, cardHeight, 2, 2, 'FD');

    // Tira lateral decorativa de color
    doc.setFillColor(accent[0], accent[1], accent[2]);
    doc.roundedRect(margin, currentY, 3, cardHeight, 1, 1, 'F');

    // Número y Nombre del autor
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    const authorText = `${idx + 1}. ${msg.nombre || 'Aficionado de Bebe F.C.'}`;
    doc.text(authorText, margin + 7, currentY + 6);

    // Boleto e integrante
    const ticketInfo = [
      msg.codigoAcceso ? `Boleto: ${msg.codigoAcceso}` : '',
      msg.numeroIntegrante > 1 ? `Int. #${msg.numeroIntegrante}` : '',
    ]
      .filter(Boolean)
      .join(' - ');

    if (ticketInfo) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(ticketInfo, margin + 68, currentY + 6);
    }

    // Fecha a la derecha
    const dateStr = msg.fechaCreacion
      ? new Date(msg.fechaCreacion).toLocaleDateString('es-MX', {
          day: 'numeric',
          month: 'short',
        })
      : '25 Oct';

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(dateStr, margin + contentWidth - 4, currentY + 6, {
      align: 'right',
    });

    // Contenido de la dedicatoria
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text(contentLines, margin + 7, currentY + 11.5);

    // Separación para la siguiente tarjeta
    currentY += cardHeight + 3.5;
  });

  // ==========================================
  // NUMERACIÓN DE PÁGINAS Y PIE DE PÁGINA
  // ==========================================
  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'Libro Oficial de Recuerdos - Bebe F.C. - Lia Saori',
      margin,
      pageHeight - 8
    );
    doc.text(`Pagina ${p} de ${totalPages}`, pageWidth - margin, pageHeight - 8, {
      align: 'right',
    });
  }

  // Descargar automáticamente el PDF
  const filename = `Dedicatorias_Lia_Saori_BebeFC_${new Date()
    .toISOString()
    .slice(0, 10)}.pdf`;
  doc.save(filename);
}

/**
 * Abre una ventana emergente / pestaña imprimible con diseño a todo color,
 * fuentes tipográficas y soporte completo de emojis para imprimir o "Guardar como PDF".
 */
export function openPrintableKeepsake(messages = []) {
  if (!messages || messages.length === 0) {
    alert('Aún no hay dedicatorias registradas en la base de datos para imprimir.');
    return;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert(
      'Por favor permite las ventanas emergentes en tu navegador para ver el libro imprimible.'
    );
    return;
  }

  const accentColors = ['#ec4899', '#f59e0b', '#0284c7', '#8b5cf6', '#10b981'];

  const messagesHtml = messages
    .map((msg, index) => {
      const accent = accentColors[index % accentColors.length];
      const dateFormatted = msg.fechaCreacion
        ? new Date(msg.fechaCreacion).toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : '25 de Octubre de 2026';

      const familyBadge = msg.codigoAcceso
        ? `<span class="badge">Boleto: ${msg.codigoAcceso} ${
            msg.numeroIntegrante > 1 ? `• Integrante #${msg.numeroIntegrante}` : ''
          }</span>`
        : '';

      return `
        <div class="card" style="border-left-color: ${accent};">
          <div class="card-header">
            <div class="card-author">
              <span class="num-badge" style="background-color: ${accent}15; color: ${accent};">
                ${index + 1}
              </span>
              <strong>${msg.nombre || 'Aficionado de Bebé F.C.'}</strong>
              ${familyBadge}
            </div>
            <span class="date">${dateFormatted}</span>
          </div>
          <div class="card-body">
            <span class="quote-mark" style="color: ${accent}40;">“</span>
            <p class="content">${msg.contenido || ''}</p>
          </div>
        </div>
      `;
    })
    .join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <title>Libro de Recuerdos • Bebé F.C. • Lía Saori</title>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 24px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
          }
          .toolbar {
            max-width: 800px;
            margin: 0 auto 20px auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #ffffff;
            padding: 12px 20px;
            border-radius: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          }
          .toolbar h2 {
            margin: 0;
            font-size: 15px;
            color: #0f172a;
          }
          .btn {
            background: linear-gradient(135deg, #ec4899, #db2777);
            color: #ffffff;
            border: none;
            padding: 10px 18px;
            border-radius: 10px;
            font-weight: 800;
            font-size: 13px;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(219,39,119,0.3);
          }
          .btn:hover {
            opacity: 0.95;
          }
          .book-page {
            max-width: 800px;
            margin: 0 auto;
            background: #ffffff;
            padding: 36px 40px;
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          }
          .banner {
            border: 2px solid #fbcfe8;
            border-radius: 16px;
            padding: 24px;
            background: linear-gradient(135deg, #fff5f8 0%, #ffffff 50%, #fffbeb 100%);
            margin-bottom: 24px;
            text-align: center;
          }
          .tag {
            display: inline-block;
            padding: 4px 14px;
            border-radius: 9999px;
            background: #fdf2f8;
            border: 1px solid #f472b6;
            color: #be185d;
            font-size: 10px;
            font-weight: 900;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 8px;
          }
          .banner h1 {
            margin: 0 0 6px 0;
            font-size: 24px;
            color: #0f172a;
          }
          .banner .reveal {
            font-size: 18px;
            font-weight: 800;
            color: #db2777;
            margin-bottom: 12px;
          }
          .banner .meta {
            display: flex;
            justify-content: center;
            gap: 14px;
            font-size: 11px;
            font-weight: 700;
            color: #475569;
            padding-top: 8px;
            border-top: 1px dashed #fbcfe8;
          }
          .section-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 2px solid #f1f5f9;
            font-size: 13px;
            font-weight: 800;
            text-transform: uppercase;
            color: #0f172a;
          }
          .card {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 14px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-left-width: 5px;
            border-left-style: solid;
            border-radius: 12px;
            padding: 14px 18px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.03);
          }
          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
          }
          .card-author {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .card-author strong {
            font-size: 14px;
            color: #0f172a;
          }
          .num-badge {
            display: inline-block;
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border-radius: 50%;
            font-weight: 800;
            font-size: 11px;
          }
          .badge {
            font-size: 9.5px;
            font-weight: 800;
            background: #f1f5f9;
            color: #475569;
            padding: 2px 8px;
            border-radius: 9999px;
            text-transform: uppercase;
          }
          .date {
            font-size: 10px;
            color: #64748b;
            font-weight: 600;
          }
          .card-body {
            position: relative;
            padding-left: 10px;
            margin-top: 4px;
          }
          .quote-mark {
            position: absolute;
            left: -2px;
            top: -6px;
            font-size: 22px;
            font-family: Georgia, serif;
            line-height: 1;
          }
          .content {
            margin: 0;
            font-size: 12px;
            line-height: 1.6;
            color: #334155;
            font-style: italic;
            white-space: pre-wrap;
          }
          .footer-note {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-top: 28px;
            padding: 16px;
            border-radius: 12px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            text-align: center;
          }
          .footer-note strong {
            display: block;
            font-size: 12px;
            color: #0f172a;
            margin-bottom: 3px;
          }
          .footer-note span {
            font-size: 10.5px;
            color: #64748b;
          }

          @media print {
            body {
              background: #ffffff;
              padding: 0;
            }
            .toolbar {
              display: none;
            }
            .book-page {
              box-shadow: none;
              padding: 0;
              max-width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="toolbar">
          <h2>📖 Vista de Impresión • Bebé F.C.</h2>
          <button class="btn" onclick="window.print()">🖨️ Imprimir / Guardar como PDF</button>
        </div>

        <div class="book-page">
          <div class="banner">
            <div class="tag">⚽ BEBÉ F.C. • LIBRO OFICIAL DE RECUERDOS Y DEDICATORIAS 🎀</div>
            <h1>Baby Shower & Revelación de Género</h1>
            <div class="reveal">¡Es Niña! Bienvenida Lía Saori ✨</div>
            <div class="meta">
              <span>👨‍👩‍👧 <strong>Padres:</strong> Yolanda Ramírez & Ulises Lavariega</span>
              <span>•</span>
              <span>📅 <strong>Fecha:</strong> 25 de Octubre de 2026</span>
              <span>•</span>
              <span>💌 <strong>Total:</strong> ${messages.length} dedicatorias</span>
            </div>
          </div>

          <div class="section-title">
            <span>Pizarra de Felicitaciones de la Afición</span>
            <span style="font-size: 11px; color: #64748b; font-weight: 600;">Total: ${messages.length} mensajes</span>
          </div>

          ${messagesHtml}

          <div class="footer-note">
            <strong>¡Gracias por formar parte de la alineación titular de nuestras vidas! 🏆💖</strong>
            <span>Con todo el cariño para Lía Saori • Bebé F.C. • Yolanda & Ulises</span>
          </div>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
}
