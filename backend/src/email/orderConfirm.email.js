export const ORDER_CONFIRMATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmed - Aromatic Heaven</title>
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
        .confirmation-banner {
            background-color: #fdfaf4;
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid #eeeeee;
        }
        .confirmation-banner h2 {
            color: #1b4332;
            margin: 0;
            font-size: 20px;
        }
        .content {
            padding: 30px 40px;
            line-height: 1.6;
            color: #555555;
        }
        
        /* Booking Details Card */
        .details-card {
            background-color: #ffffff;
            border: 1px solid #d4af37;
            border-radius: 6px;
            margin: 20px 0;
            padding: 20px;
        }
        .details-row {
            padding: 10px 0;
            border-bottom: 1px border #f4f4f4;
            display: flex;
            justify-content: space-between;
        }
        .label {
            font-weight: bold;
            color: #1b4332;
            width: 40%;
            display: inline-block;
        }
        .value {
            color: #333333;
            width: 55%;
            display: inline-block;
            text-align: right;
        }

        .price-total {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 2px dashed #d4af37;
            font-size: 18px;
            font-weight: bold;
            color: #1b4332;
            text-align: right;
        }

        .footer {
            background-color: #f9f9f9;
            padding: 25px;
            text-align: center;
            font-size: 13px;
            color: #888888;
        }
        .button {
            background-color: #1b4332;
            color: #ffffff !important;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            display: inline-block;
            margin-top: 20px;
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
                <td class="confirmation-banner">
                    <h2>Booking Successful!</h2>
                    <p style="margin: 5px 0 0; color: #666;">We have reserved your spot for relaxation.</p>
                </td>
            </tr>

            <tr>
                <td class="content">
                    <p>Namaste <strong>[User Name]</strong>,</p>
                    <p>Your appointment with Aromatic Heaven is confirmed. We are looking forward to providing you with a soothing and revitalizing experience.</p>

                    <div class="details-card">
                        <div class="details-row">
                            <span class="label">Service Booked:</span>
                            <span class="value">[Type of Service, e.g., Stress-Buster Head Massage]</span>
                        </div>
                        <div class="price-total">
                            Amount to Pay: ₹[Price]
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="#" class="button">MANAGE BOOKING</a>
                    </div>
                </td>
            </tr>

            <tr>
                <td class="footer">
                    <p><strong>Need to reschedule?</strong><br>
                    Please call us at +91 XXXXX XXXXX at least 4 hours in advance.</p>
                    <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p><strong>Aromatic Heaven</strong><br>
                    Tier-1 City Premium Wellness Center<br>
                    Follow our journey on <a href="#" style="color: #d4af37;">Instagram</a></p>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>`