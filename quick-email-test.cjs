// Quick email test script
require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

async function quickEmailTest() {
  console.log('🔍 Testing email configuration...\n');

  // Check environment variables
  console.log('📧 Email:', process.env.MAIL_EMAIL || '❌ Not set');
  console.log(
    '🔑 Password length:',
    process.env.MAIL_PASSWORD ? process.env.MAIL_PASSWORD.length : '❌ Not set',
  );
  console.log('');

  if (!process.env.MAIL_EMAIL || !process.env.MAIL_PASSWORD) {
    console.log('❌ Email credentials not found in .env.local');
    return false;
  }

  // Test connection
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    console.log('🔌 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');

    // Send test email
    console.log('📨 Sending test email...');
    const info = await transporter.sendMail({
      from: {
        name: 'Web3SSH 2025 Test',
        address: process.env.MAIL_EMAIL,
      },
      to: 'aadi.p23@iiits.in', // Your email
      subject: '🧪 Email Service Test - Web3SSH 2025',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
          <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; margin: 0 auto;">
            <h2 style="color: #667eea;">🎉 Email Service Working!</h2>
            <p>This test email confirms that the Web3SSH 2025 email service is properly configured.</p>
            <div style="background: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <strong>Test Details:</strong><br>
              • From: ${process.env.MAIL_EMAIL}<br>
              • Time: ${new Date().toLocaleString()}<br>
              • Status: ✅ Success
            </div>
            <p style="color: #4CAF50; font-weight: bold;">Your project submission emails will work perfectly! 🚀</p>
          </div>
        </div>
      `,
      text: 'Email service test successful! Project submission emails will work.',
    });

    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('🎉 Email service is ready for project submissions!');
    return true;
  } catch (error) {
    console.log('❌ Email test failed:', error.message);

    if (error.code === 'EAUTH') {
      console.log('\n📋 Gmail Setup Required:');
      console.log('1. Go to: https://myaccount.google.com/security');
      console.log('2. Enable 2-Factor Authentication');
      console.log('3. Go to "App passwords"');
      console.log('4. Generate new app password for "Mail"');
      console.log('5. Update .env.local with the 16-character app password');
      console.log(
        '\nCurrent password format appears to be a regular password, not an app password.',
      );
    }

    return false;
  }
}

quickEmailTest()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Test script error:', error);
    process.exit(1);
  });
