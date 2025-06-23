// Simple test script for email service
require('dotenv').config({ path: '.env.local' });

// Import the email service - we'll use CommonJS for this test
const nodemailer = require('nodemailer');

async function testEmailService() {
  try {
    console.log('Testing email service...');
    console.log('Email:', process.env.MAIL_EMAIL);
    console.log(
      'Password length:',
      process.env.MAIL_PASSWORD
        ? process.env.MAIL_PASSWORD.length
        : 'undefined',
    );

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // Verify connection
    console.log('Verifying email connection...');
    await transporter.verify();
    console.log('✅ Email service connection verified!');

    // Send test email
    console.log('Sending test email...');
    const testEmailData = {
      from: {
        name: 'Web3SSH 2025',
        address: process.env.MAIL_EMAIL,
      },
      to: process.env.MAIL_EMAIL, // Send to same email for testing
      subject: '🧪 Test Email - Web3SSH 2025 Email Service',
      text: 'This is a test email to verify that the email service is working correctly.',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea;">🧪 Email Service Test</h2>
          <p>This is a test email to verify that the Web3SSH 2025 email service is working correctly.</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Test Details:</strong></p>
            <ul>
              <li>Email Service: Gmail SMTP</li>
              <li>From: ${process.env.MAIL_EMAIL}</li>
              <li>Test Time: ${new Date().toLocaleString()}</li>
            </ul>
          </div>
          <p style="color: #4CAF50; font-weight: bold;">✅ Email service is working correctly!</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(testEmailData);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);

    return true;
  } catch (error) {
    console.error('❌ Email service test failed:', error.message);

    if (error.code === 'EAUTH') {
      console.log('\n📋 Gmail SMTP Authentication Issue:');
      console.log(
        '1. Make sure 2-factor authentication is enabled on the Gmail account',
      );
      console.log(
        '2. Generate an App Password instead of using the regular password',
      );
      console.log('3. Go to: https://myaccount.google.com/apppasswords');
      console.log(
        '4. Select "Mail" and "Other" as the app, then generate the password',
      );
      console.log(
        '5. Use the generated app password in MAIL_PASSWORD instead of the regular password',
      );
    }

    return false;
  }
}

// Run the test
testEmailService()
  .then((success) => {
    if (success) {
      console.log('\n🎉 Email service is ready for production!');
    } else {
      console.log('\n❌ Email service needs attention before deployment.');
    }
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Test script failed:', error);
    process.exit(1);
  });
