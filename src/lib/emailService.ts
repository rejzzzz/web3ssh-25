import nodemailer from 'nodemailer';

interface EmailData {
  projectName: string;
  teamName?: string;
  participantNames: string[];
  submissionId: string;
  participantEmail: string;
  participantName: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendSubmissionConfirmation(emailData: EmailData): Promise<boolean> {
    try {
      const {
        projectName,
        teamName,
        participantNames,
        submissionId,
        participantEmail,
        participantName,
      } = emailData;

      const teamMembersText =
        participantNames.length > 1
          ? `Team Members: ${participantNames.join(', ')}`
          : `Individual Participant: ${participantName}`;

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Project Submission Confirmation</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              line-height: 1.7;
              color: #2d3748;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 30px 20px;
              min-height: 100vh;
            }
            .email-container {
              max-width: 650px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 25px 50px rgba(0,0,0,0.15);
              border: 1px solid rgba(255,255,255,0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 50px 40px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            .header::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
              background-size: 30px 30px;
              animation: float 20s infinite linear;
            }
            @keyframes float {
              0% { transform: translate(0, 0) rotate(0deg); }
              100% { transform: translate(-30px, -30px) rotate(360deg); }
            }
            .header-content {
              position: relative;
              z-index: 2;
            }
            .header h1 {
              margin: 0;
              font-size: 42px;
              font-weight: 700;
              letter-spacing: -0.5px;
              margin-bottom: 8px;
            }
            .header p {
              margin: 0;
              font-size: 20px;
              opacity: 0.95;
              font-weight: 500;
            }
            .content {
              padding: 50px 40px;
            }
            .success-badge {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: white;
              padding: 16px 28px;
              border-radius: 50px;
              display: inline-flex;
              align-items: center;
              font-weight: 600;
              margin-bottom: 30px;
              font-size: 16px;
              box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            }
            .success-badge::before {
              content: '✨';
              margin-right: 8px;
              font-size: 18px;
            }
            .greeting {
              font-size: 32px;
              font-weight: 700;
              color: #1a202c;
              margin-bottom: 20px;
              line-height: 1.3;
            }
            .intro-text {
              font-size: 18px;
              color: #4a5568;
              margin-bottom: 40px;
              line-height: 1.6;
            }
            .project-details {
              background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
              border-radius: 16px;
              padding: 35px;
              margin: 35px 0;
              border: 1px solid #e2e8f0;
              box-shadow: 0 4px 6px rgba(0,0,0,0.02);
            }
            .project-details h3 {
              font-size: 22px;
              font-weight: 700;
              color: #667eea;
              margin-bottom: 25px;
              display: flex;
              align-items: center;
            }
            .project-details h3::before {
              content: '📋';
              margin-right: 10px;
              font-size: 24px;
            }
            .detail-row {
              margin: 18px 0;
              display: grid;
              grid-template-columns: 160px 1fr;
              gap: 15px;
              align-items: start;
            }
            .detail-label {
              font-weight: 600;
              color: #667eea;
              font-size: 16px;
            }
            .detail-value {
              color: #2d3748;
              font-size: 16px;
              font-weight: 500;
            }
            .submission-id {
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              padding: 25px;
              border-radius: 16px;
              text-align: center;
              margin: 35px 0;
              box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            }
            .submission-id-label {
              font-size: 16px;
              opacity: 0.9;
              margin-bottom: 8px;
              font-weight: 500;
            }
            .submission-id-value {
              font-size: 24px;
              font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
              font-weight: 700;
              letter-spacing: 2px;
              margin: 8px 0;
            }
            .submission-id-note {
              font-size: 14px;
              opacity: 0.8;
              margin-top: 8px;
              font-weight: 400;
            }
            .next-steps {
              background: linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%);
              border-radius: 16px;
              padding: 35px;
              margin: 35px 0;
              border: 1px solid #bbf7d0;
            }
            .next-steps h3 {
              font-size: 22px;
              font-weight: 700;
              color: #059669;
              margin-bottom: 20px;
              display: flex;
              align-items: center;
            }
            .next-steps h3::before {
              content: '🚀';
              margin-right: 10px;
              font-size: 24px;
            }
            .next-steps ul {
              margin: 0;
              padding-left: 0;
              list-style: none;
            }
            .next-steps li {
              margin: 15px 0;
              color: #065f46;
              font-size: 16px;
              font-weight: 500;
              padding-left: 25px;
              position: relative;
            }
            .next-steps li::before {
              content: '✓';
              position: absolute;
              left: 0;
              color: #10b981;
              font-weight: bold;
              font-size: 18px;
            }
            .closing-message {
              background: linear-gradient(135deg, #fef7ff 0%, #faf5ff 100%);
              border-radius: 16px;
              padding: 30px;
              margin: 35px 0;
              border: 1px solid #e9d5ff;
              text-align: center;
            }
            .closing-message h4 {
              font-size: 20px;
              font-weight: 700;
              color: #581c87;
              margin-bottom: 15px;
            }
            .closing-message p {
              font-size: 16px;
              color: #7c3aed;
              line-height: 1.6;
              margin: 10px 0;
            }
            .footer {
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              padding: 40px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            }
            .social-links {
              margin: 25px 0;
              display: flex;
              justify-content: center;
              gap: 20px;
              flex-wrap: wrap;
            }
            .social-links a {
              display: inline-flex;
              align-items: center;
              padding: 12px 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              text-decoration: none;
              font-weight: 600;
              border-radius: 50px;
              font-size: 14px;
              transition: transform 0.2s ease;
              box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
            }
            .social-links a:hover {
              transform: translateY(-2px);
            }
            .contact-info {
              margin: 25px 0;
              color: #4a5568;
              font-size: 16px;
              line-height: 1.6;
            }
            .contact-info p {
              margin: 8px 0;
            }
            .contact-info strong {
              color: #2d3748;
              font-weight: 700;
            }
            .disclaimer {
              font-size: 13px;
              color: #a0aec0;
              margin-top: 30px;
              line-height: 1.5;
              font-style: italic;
            }
            @media (max-width: 600px) {
              body { padding: 15px 10px; }
              .content, .header, .footer { padding: 30px 25px; }
              .detail-row { 
                grid-template-columns: 1fr; 
                gap: 8px;
              }
              .detail-label { 
                font-size: 15px;
                margin-bottom: 5px;
              }
              .header h1 { font-size: 32px; }
              .greeting { font-size: 26px; }
              .intro-text { font-size: 16px; }
              .social-links { flex-direction: column; align-items: center; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="header-content">
                <h1>🎉 Web3SSH 2025</h1>
                <p>Summer School & Hackathon</p>
              </div>
            </div>
            
            <div class="content">
              <div class="success-badge">✅ Submission Successful</div>
              
              <h2 class="greeting">Congratulations, ${participantName}!</h2>
              <p class="intro-text">Your project has been successfully submitted to the Web3SSH 2025 Hackathon. We're excited to review your innovative work and see how it contributes to the future of Web3 technology!</p>
              
              <div class="project-details">
                <h3>📋 Project Details</h3>
                <div class="detail-row">
                  <span class="detail-label">Project Name:</span>
                  <span class="detail-value">${projectName}</span>
                </div>
                ${
                  teamName
                    ? `<div class="detail-row">
                  <span class="detail-label">Team Name:</span>
                  <span class="detail-value">${teamName}</span>
                </div>`
                    : ''
                }
                <div class="detail-row">
                  <span class="detail-label">${participantNames.length > 1 ? 'Team Members' : 'Participant'}:</span>
                  <span class="detail-value">${participantNames.join(', ')}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Submission Time:</span>
                  <span class="detail-value">${new Date().toLocaleString(
                    'en-IN',
                    {
                      timeZone: 'Asia/Kolkata',
                      dateStyle: 'full',
                      timeStyle: 'short',
                    },
                  )}</span>
                </div>
              </div>
              
              <div class="submission-id">
                <div class="submission-id-label">Your Submission ID</div>
                <div class="submission-id-value">${submissionId}</div>
                <div class="submission-id-note">Keep this ID for your records</div>
              </div>
              
              <div class="next-steps">
                <h3>🚀 What's Next?</h3>
                <ul>
                  <li><strong>Evaluation Period:</strong> Our expert panel will carefully review all submissions</li>
                  <li><strong>Results Announcement:</strong> Winners will be announced on July 6, 2025</li>
                  <li><strong>Stay Connected:</strong> Follow our social media for updates and announcements</li>
                  <li><strong>Questions?</strong> Feel free to contact our support team anytime</li>
                </ul>
              </div>
              
              <div class="closing-message">
                <h4>🌟 Thank you for participating in Web3SSH 2025!</h4>
                <p>Your innovation and creativity contribute to the future of Web3 technology. We appreciate your dedication and look forward to seeing the impact of your project.</p>
                <p style="font-style: italic; margin-top: 20px;">Best of luck with the evaluation, and thank you for being part of our amazing Web3 community!</p>
              </div>
            </div>
            
            <div class="footer">
              <div class="social-links">
                <a href="https://web3ssh.dev" target="_blank">🌐 Website</a>
                <a href="https://x.com/web3ssh" target="_blank">🐦 Twitter</a>
                <a href="https://linkedin.com/company/web3ssh" target="_blank">💼 LinkedIn</a>
                <a href="https://instagram.com/web3ssh" target="_blank">📸 Instagram</a>
              </div>
              
              <div class="contact-info">
                <p><strong>Web3SSH 2025 Organizing Team</strong></p>
                <p>IIIT Sri City | Summer School & Hackathon</p>
                <p>📧 Contact: team@web3ssh.com</p>
              </div>
              
              <p class="disclaimer">
                This is an automated confirmation email. Please do not reply to this email.<br>
                If you have any questions, please contact us through our official channels.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;

      const textContent = `
        🎉 Web3SSH 2025 - Project Submission Confirmation

        Congratulations, ${participantName}!

        Your project has been successfully submitted to the Web3SSH 2025 Hackathon.

        Project Details:
        ===============
        Project Name: ${projectName}
        ${teamName ? `Team Name: ${teamName}` : ''}
        ${teamMembersText}
        Submission ID: ${submissionId}
        Submission Time: ${new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'full',
          timeStyle: 'short',
        })}

        What's Next?
        ============
        • Evaluation Period: Our expert panel will review all submissions
        • Results Announcement: Winners will be announced on July 6, 2025
        • Stay Connected: Follow our social media for updates
        • Questions? Contact our support team anytime

        Thank you for participating in Web3SSH 2025! Your innovation contributes to the future of Web3 technology.

        Best regards,
        Web3SSH 2025 Organizing Team
        IIIT Sri City

        Website: https://web3ssh.dev
        Contact:web3ssh@iiits.in
      `;

      const mailOptions = {
        from: {
          name: 'Web3SSH 2025',
          address: process.env.MAIL_EMAIL!,
        },
        to: participantEmail,
        subject: `🎉 Project Submission Confirmed - Web3SSH 2025 | ${projectName}`,
        text: textContent,
        html: htmlContent,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return true;
    } catch (error: any) {
      console.error('Error sending email:', error);

      // Provide specific error guidance
      if (error.code === 'EAUTH') {
        console.error('❌ Authentication failed. Please check:');
        console.error('   1. Gmail account has 2FA enabled');
        console.error('   2. Using App Password instead of regular password');
        console.error('   3. App password is 16 characters without spaces');
        console.error('   4. Email address is correct');
      } else if (error.code === 'ECONNECTION') {
        console.error(
          '❌ Connection failed. Please check your internet connection.',
        );
      }

      return false;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('✅ Email service connection verified');
      return true;
    } catch (error: any) {
      console.error('❌ Email service connection failed:', error.message);

      // Provide specific error guidance
      if (error.code === 'EAUTH') {
        console.error('📋 Gmail Authentication Issue:');
        console.error('   1. Go to https://myaccount.google.com/security');
        console.error('   2. Enable 2-Factor Authentication');
        console.error('   3. Generate App Password for "Mail"');
        console.error(
          '   4. Update MAIL_PASSWORD in .env.local with the 16-character app password',
        );
      }

      return false;
    }
  }
}

export default EmailService;
 