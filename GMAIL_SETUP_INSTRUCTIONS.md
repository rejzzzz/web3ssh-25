# Gmail SMTP Setup Instructions for Web3SSH 2025

## Issue

The current Gmail password (`Aadi@#12122005@#`) is not working because Gmail requires App Passwords for SMTP authentication when 2-Factor Authentication is enabled.

## Solution: Generate Gmail App Password

### Step 1: Enable 2-Factor Authentication (if not already enabled)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click on "2-Step Verification"
3. Follow the setup process if not already enabled

### Step 2: Generate App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click on "2-Step Verification"
3. Scroll down and click on "App passwords"
4. Select "Mail" from the dropdown
5. Select "Other (Custom name)" and enter "Web3SSH 2025"
6. Click "Generate"
7. **Copy the 16-character app password** (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Update Environment Variables

Replace the current password in `.env.local`:

```bash
MAIL_EMAIL=aadipatel1911@gmail.com
MAIL_PASSWORD=your-16-character-app-password-here
```

**Important**:

- Remove all spaces from the app password
- Use the app password, not your regular Gmail password
- The app password should be exactly 16 characters

### Step 4: Test the Configuration

After updating the password, you can test it by running:

```bash
node test-email.cjs
```

## Alternative: Using App-Specific Configuration

If you continue to have issues, you can also try this enhanced configuration in the EmailService:

```typescript
this.transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
```

## Troubleshooting

### Common Issues:

1. **"Invalid login" error**: App password not generated or incorrect
2. **"Less secure app access" error**: Enable 2FA and use app password
3. **Network issues**: Check firewall/proxy settings

### Quick Test:

You can quickly test if your credentials work by running:

```bash
# Test just the connection
node -e "
const nodemailer = require('nodemailer');
require('dotenv').config({path: '.env.local'});
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.MAIL_EMAIL, pass: process.env.MAIL_PASSWORD }
});
transport.verify().then(() => console.log('✅ Success!')).catch(err => console.log('❌ Error:', err.message));
"
```

## Security Notes

- App passwords are more secure than regular passwords for applications
- Each app password is unique and can be revoked individually
- Never share your app password publicly
