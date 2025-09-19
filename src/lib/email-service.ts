import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  static async sendEmail(options: EmailOptions) {
    try {
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@paratysailfestival.com',
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });

      if (error) {
        console.error('Erro ao enviar email:', error);
        throw new Error(`Falha ao enviar email: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Erro no serviço de email:', error);
      throw error;
    }
  }

  static async sendInscricaoConfirmation(
    email: string, 
    nomeComandante: string, 
    nomeBarco: string,
    categoria: string,
    valorTotal: number
  ) {
    const subject = 'Confirmação de Inscrição - 1ª Regata Amyr Klink';
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmação de Inscrição</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0d9488, #f59e0b); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .boat-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .button { display: inline-block; background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .highlight { color: #0d9488; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏆 Paraty Sail Festival 2025</h1>
              <h2>1ª Regata Amyr Klink</h2>
              <p>Inscrição Recebida com Sucesso!</p>
            </div>
            
            <div class="content">
              <h3>Olá, ${nomeComandante}!</h3>
              
              <p>Recebemos sua inscrição para a <strong>1ª Regata Amyr Klink</strong> e estamos muito animados em tê-lo(a) conosco!</p>
              
              <div class="boat-info">
                <h4>📋 Detalhes da sua inscrição:</h4>
                <ul>
                  <li><strong>Embarcação:</strong> ${nomeBarco}</li>
                  <li><strong>Categoria:</strong> ${categoria}</li>
                  <li><strong>Valor Total:</strong> <span class="highlight">R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></li>
                </ul>
              </div>
              
              <h4>📋 Próximos passos:</h4>
              <ol>
                <li><strong>Aguarde a confirmação:</strong> Nossa equipe irá analisar sua inscrição nos próximos dias úteis</li>
                <li><strong>Prepare sua embarcação:</strong> Certifique-se de que tudo está em ordem para o evento</li>
                <li><strong>Fique atento:</strong> Você receberá mais informações sobre briefing e detalhes da regata</li>
              </ol>
              
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p><strong>⚠️ Importante:</strong> Esta é apenas uma confirmação de recebimento. Sua participação será confirmada após análise da documentação.</p>
              </div>
              
              <p>Se você tiver alguma dúvida, não hesite em entrar em contato conosco.</p>
              
              <p>Vamos navegar juntos!</p>
              
              <p><strong>Equipe Paraty Sail Festival</strong></p>
            </div>
            
            <div class="footer">
              <p>Paraty Sail Festival 2025 | Paraty - RJ</p>
              <p>Este é um email automático, não responda.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
      Paraty Sail Festival 2025 - 1ª Regata Amyr Klink
      
      Olá, ${nomeComandante}!
      
      Recebemos sua inscrição para a 1ª Regata Amyr Klink e estamos muito animados em tê-lo(a) conosco!
      
      Detalhes da sua inscrição:
      - Embarcação: ${nomeBarco}
      - Categoria: ${categoria}
      - Valor Total: R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      
      Próximos passos:
      1. Aguarde a confirmação: Nossa equipe irá analisar sua inscrição nos próximos dias úteis
      2. Prepare sua embarcação: Certifique-se de que tudo está em ordem para o evento
      3. Fique atento: Você receberá mais informações sobre briefing e detalhes da regata
      
      IMPORTANTE: Esta é apenas uma confirmação de recebimento. Sua participação será confirmada após análise da documentação.
      
      Se você tiver alguma dúvida, não hesite em entrar em contato conosco.
      
      Vamos navegar juntos!
      
      Equipe Paraty Sail Festival
    `;

    return this.sendEmail({
      to: email,
      subject,
      html,
      text
    });
  }

  static async sendAdminNotification(
    nomeComandante: string,
    nomeBarco: string,
    categoria: string,
    email: string,
    telefone: string
  ) {
    const subject = `Nova Inscrição - ${nomeBarco} (${nomeComandante})`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nova Inscrição Recebida</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 Nova Inscrição Recebida</h1>
              <p>1ª Regata Amyr Klink</p>
            </div>
            
            <div class="content">
              <h3>Uma nova inscrição foi recebida!</h3>
              
              <div class="info-box">
                <h4>👤 Dados do Comandante:</h4>
                <ul>
                  <li><strong>Nome:</strong> ${nomeComandante}</li>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>Telefone:</strong> ${telefone}</li>
                </ul>
                
                <h4>⛵ Dados da Embarcação:</h4>
                <ul>
                  <li><strong>Nome:</strong> ${nomeBarco}</li>
                  <li><strong>Categoria:</strong> ${categoria}</li>
                </ul>
              </div>
              
              <p><strong>Acesse o painel administrativo para visualizar todos os detalhes e aprovar a inscrição.</strong></p>
              
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/inscricoes" class="button">
                Ver no Painel Admin
              </a>
            </div>
          </div>
        </body>
      </html>
    `;

    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || ['admin@paratysailfestival.com'];

    return this.sendEmail({
      to: adminEmails,
      subject,
      html
    });
  }

  static async sendStatusUpdate(
    email: string,
    nomeComandante: string,
    nomeBarco: string,
    novoStatus: string
  ) {
    const statusMessages = {
      confirmada: {
        subject: '✅ Inscrição Confirmada - 1ª Regata Amyr Klink',
        title: 'Sua inscrição foi confirmada!',
        message: 'Parabéns! Sua inscrição para a 1ª Regata Amyr Klink foi aprovada. Aguarde mais informações sobre o briefing e detalhes do evento.',
        color: '#059669'
      },
      cancelada: {
        subject: '❌ Inscrição Cancelada - 1ª Regata Amyr Klink',
        title: 'Sua inscrição foi cancelada',
        message: 'Informamos que sua inscrição para a 1ª Regata Amyr Klink foi cancelada. Se você tem dúvidas sobre este cancelamento, entre em contato conosco.',
        color: '#dc2626'
      }
    };

    const statusInfo = statusMessages[novoStatus as keyof typeof statusMessages];
    if (!statusInfo) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Atualização de Inscrição</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: ${statusInfo.color}; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .boat-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏆 Paraty Sail Festival 2025</h1>
              <h2>${statusInfo.title}</h2>
            </div>
            
            <div class="content">
              <h3>Olá, ${nomeComandante}!</h3>
              
              <p>${statusInfo.message}</p>
              
              <div class="boat-info">
                <h4>📋 Detalhes da inscrição:</h4>
                <ul>
                  <li><strong>Embarcação:</strong> ${nomeBarco}</li>
                  <li><strong>Status:</strong> ${novoStatus === 'confirmada' ? 'Confirmada' : 'Cancelada'}</li>
                </ul>
              </div>
              
              <p>Se você tiver alguma dúvida, não hesite em entrar em contato conosco.</p>
              
              <p><strong>Equipe Paraty Sail Festival</strong></p>
            </div>
            
            <div class="footer">
              <p>Paraty Sail Festival 2025 | Paraty - RJ</p>
              <p>Este é um email automático, não responda.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: statusInfo.subject,
      html
    });
  }
}