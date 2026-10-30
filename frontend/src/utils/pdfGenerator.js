import html2pdf from 'html2pdf.js';

export async function exportMessagesPdf(messages = []) {
  if (!messages || messages.length === 0) {
    alert('No hay mensajes registrados para exportar a PDF.');
    return;
  }

  // Create temporary container for PDF rendering
  const container = document.createElement('div');
  container.id = 'pdf-render-container';
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px'; // Standard A4 width at 96 DPI
  container.style.backgroundColor = '#ffffff';
  container.style.padding = '32px 36px';
  container.style.boxSizing = 'border-box';
  container.style.fontFamily = "'Outfit', 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif";
  container.style.color = '#1e293b';

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
        ? `<span style="display: inline-block; font-size: 10px; font-weight: 800; background-color: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px;">Boleto: ${msg.codigoAcceso} ${msg.numeroIntegrante > 1 ? `• Integrante #${msg.numeroIntegrante}` : ''}</span>`
        : '';

      return `
        <div style="page-break-inside: avoid; break-inside: avoid; margin-bottom: 16px; background-color: #ffffff; border: 1px solid #e2e8f0; border-left: 5px solid ${accent}; border-radius: 14px; padding: 16px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="display: inline-block; width: 26px; height: 26px; line-height: 26px; text-align: center; border-radius: 50%; background-color: ${accent}15; color: ${accent}; font-weight: 800; font-size: 11px;">
                ${index + 1}
              </span>
              <strong style="font-size: 15px; color: #0f172a; font-weight: 800;">
                ${msg.nombre || 'Aficionado de Bebé F.C.'}
              </strong>
              ${familyBadge}
            </div>
            <span style="font-size: 10.5px; color: #64748b; font-weight: 600;">
              ${dateFormatted}
            </span>
          </div>
          <div style="position: relative; padding-left: 12px; margin-top: 6px;">
            <span style="position: absolute; left: -2px; top: -6px; font-size: 24px; color: ${accent}40; font-family: Georgia, serif; line-height: 1;">“</span>
            <p style="margin: 0; font-size: 12.5px; line-height: 1.6; color: #334155; font-style: italic; white-space: pre-wrap;">
              ${msg.contenido || ''}
            </p>
          </div>
        </div>
      `;
    })
    .join('');

  container.innerHTML = `
    <div style="border: 2px solid #fbcfe8; border-radius: 20px; padding: 24px 26px; background: linear-gradient(135deg, #fff5f8 0%, #ffffff 50%, #fffbeb 100%); margin-bottom: 24px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
      <div style="display: inline-block; padding: 4px 16px; border-radius: 9999px; background-color: #fdf2f8; border: 1px solid #f472b6; color: #be185d; font-size: 10.5px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px;">
        ⚽ BEBÉ F.C. • LIBRO OFICIAL DE RECUERDOS Y DEDICATORIAS 🎀
      </div>
      <h1 style="margin: 0 0 6px 0; font-size: 26px; font-weight: 900; color: #0f172a; letter-spacing: -0.5px;">
        Baby Shower & Revelación de Género
      </h1>
      <div style="font-size: 20px; font-weight: 800; color: #db2777; margin-bottom: 12px;">
        ¡Es Niña! Bienvenida <span style="text-decoration: underline; text-decoration-color: #f472b6;">Lía Saori</span> ✨
      </div>
      <div style="display: flex; justify-content: center; gap: 16px; font-size: 11.5px; font-weight: 700; color: #475569; padding-top: 8px; border-top: 1px dashed #fbcfe8;">
        <span>👨‍👩‍👧 <strong>Padres:</strong> Yolanda Ramírez & Ulises Lavariega</span>
        <span>•</span>
        <span>📅 <strong>Fecha:</strong> 25 de Octubre de 2026</span>
        <span>•</span>
        <span>💌 <strong>Dedicatorias:</strong> ${messages.length} firmas registradas</span>
      </div>
    </div>

    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 2px solid #f1f5f9;">
        <span style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #0f172a;">
          Pizarra de Felicitaciones de la Afición
        </span>
        <span style="font-size: 11px; color: #64748b; font-weight: 600;">
          Total: ${messages.length} mensajes recibidos
        </span>
      </div>
      ${messagesHtml}
    </div>

    <div style="page-break-inside: avoid; break-inside: avoid; margin-top: 32px; padding: 18px 24px; border-radius: 14px; background-color: #f8fafc; border: 1px solid #e2e8f0; text-align: center;">
      <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 800; color: #0f172a;">
        ¡Gracias por formar parte de la alineación titular de nuestras vidas! 🏆💖
      </p>
      <p style="margin: 0; font-size: 11px; color: #64748b; font-weight: 600;">
        Con todo el cariño para Lía Saori • Bebé F.C. • Yolanda & Ulises
      </p>
    </div>
  `;

  document.body.appendChild(container);

  const opt = {
    margin: [10, 10, 10, 10], // Margen en mm [top, left, bottom, right]
    filename: `Dedicatorias_Lia_Saori_BebeFC_${new Date().toISOString().slice(0, 10)}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  try {
    await html2pdf().set(opt).from(container).save();
  } catch (err) {
    console.error('Error al generar el PDF de mensajes:', err);
    alert('Ocurrió un inconveniente al generar el PDF. Por favor intenta de nuevo.');
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}
