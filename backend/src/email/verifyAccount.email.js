export const VERIFY_ACCOUNT_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - Aromatic Heaven</title>
    <style>
        /* General Reset */
        body {
            margin: 0;
            padding: 0;
            background-color: #f4f7f4;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333333;
        }
        table {
            border-spacing: 0;
        }
        td {
            padding: 0;
        }

        /* Layout */
        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #f4f7f4;
            padding-top: 20px;
            padding-bottom: 40px;
        }
        .main {
            background-color: #ffffff;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        /* Elements */
        .header {
            background-color: #1b4332;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            color: #d4af37;
            margin: 0;
            font-size: 24px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        .icon-section {
            text-align: center;
            padding: 30px 0 10px;
        }
        .content {
            padding: 0 40px 30px;
            line-height: 1.6;
            color: #555555;
            text-align: center;
        }
        
        .button-container {
            padding: 20px 0;
            text-align: center;
        }
        .button {
            background-color: #d4af37;
            color: #ffffff !important;
            padding: 15px 35px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            display: inline-block;
            font-size: 16px;
        }

        .security-note {
            background-color: #fdfaf4;
            margin: 20px 40px;
            padding: 15px;
            border-radius: 6px;
            font-size: 13px;
            color: #777777;
            border: 1px solid #e8e0d0;
        }

        .footer {
            background-color: #f9f9f9;
            padding: 25px;
            text-align: center;
            font-size: 12px;
            color: #888888;
        }
        .link-text {
            word-break: break-all;
            color: #d4af37;
            font-size: 11px;
        }
    </style>
</head>
<body>
    <center class="wrapper">
        <table class="main" width="100%">
            <tr>
                <td class="header">
                    <h1>AROMATIC HEAVEN</h1>
                </td>
            </tr>

            <tr>
                <td class="icon-section">
                    <span style="font-size: 50px;">🔐</span>
                </td>
            </tr>

            <tr>
                <td class="content">
                    <h2 style="color: #1b4332; margin-bottom: 10px;">Password Reset Request</h2>
                    <p>Namaste <strong>[User Name]</strong>,</p>
                    <p>Please verify your account by clicking the button below and get back to your journey of relaxation.</p>

                    <div class="button-container">
                        <a href="[ResetLinkURL]" class="button">Verify Account</a>
                    </div>
                </td>
            </tr>

            <tr>
                <td>
                    <div class="security-note">
                        <strong>Security Note:</strong> This link will expire after 24 hours.
                    </div>
                </td>
            </tr>

            <tr>
                <td style="padding: 0 40px 30px; text-align: center;">
                    <p style="font-size: 12px; margin-bottom: 5px;">If the button above doesn't work, copy and paste this link into your browser:</p>
                    <span class="link-text">[ResetLinkURL]</span>
                </td>
            </tr>

            <tr>
                <td class="footer">
                    <p><strong>Aromatic Heaven</strong><br>
                    Premium Wellness & Skin Care<br>
                    Need help? Contact our support at <a href="mailto:support@aromaticheaven.in" style="color: #1b4332; text-decoration: none;">support@aromaticheaven.in</a></p>
                    <p style="margin-top: 15px;">© 2026 Aromatic Heaven. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>`