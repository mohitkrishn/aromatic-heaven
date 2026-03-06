export const WELCOME_EMAIL_TEMPLATE = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Aromatic Heaven</title>
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
        img {
            border: 0;
        }

        /* Layout */
        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #f4f7f4;
            padding-bottom: 40px;
        }
        .main {
            background-color: #ffffff;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            font-family: sans-serif;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        /* Elements */
        .header {
            background-color: #1b4332; /* Deep Forest Green */
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            color: #d4af37; /* Gold */
            margin: 0;
            font-size: 28px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        .hero {
            padding: 30px 40px;
            text-align: center;
        }
        .hero h2 {
            color: #1b4332;
            font-size: 24px;
            margin-bottom: 10px;
        }
        .content {
            padding: 0 40px 30px;
            line-height: 1.6;
            color: #555555;
            text-align: center;
        }
        .service-box {
            background-color: #fdfaf4;
            border-left: 4px solid #d4af37;
            margin: 10px 0;
            padding: 15px;
            text-align: left;
        }
        .service-title {
            color: #1b4332;
            font-weight: bold;
            display: block;
        }
        .button-container {
            padding: 20px 0;
            text-align: center;
        }
        .button {
            background-color: #d4af37;
            color: #ffffff !important;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            display: inline-block;
        }
        .footer {
            background-color: #eeeeee;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>
<body>
    <center class="wrapper">
        <table class="main" width="100%">
            <tr>
                <td class="header">
                    <h1>AROMATIC HEAVEN</h1>
                    <p style="color: #ffffff; margin-top: 5px; font-style: italic; opacity: 0.8;">Pure Bliss. Naturally.</p>
                </td>
            </tr>

            <tr>
                <td class="hero">
                    <h2>Namaste, [User Name]!</h2>
                    <p>We are delighted to have you join our community of wellness and tranquility.</p>
                </td>
            </tr>

            <tr>
                <td class="content">
                    At <strong>Aromatic Heaven</strong>, we believe that self-care isn't a luxury—it's a necessity. Whether you're looking to melt away office stress or rejuvenate your skin, our expert therapists are here to guide you to a state of complete calm.
                </td>
            </tr>

            <tr>
                <td style="padding: 0 40px;">
                    <p style="color: #1b4332; font-weight: bold; text-align: center;">Discover Our Signature Rituals:</p>
                    
                    <div class="service-box">
                        <span class="service-title">✨ Body Firming & Toning Ritual</span>
                        <small>Tighten up your complete body with our soothing massage.</small>
                    </div>

                    <div class="service-box">
                        <span class="service-title">💆 The Stress-Buster Head Massage</span>
                        <small>Our premium 'Champi' for instant mental clarity.</small>
                    </div>

                    <div class="service-box">
                        <span class="service-title">👣 Happy Feet Relaxation</span>
                        <small>The perfect relief for tired, aching legs.</small>
                    </div>

                    <div class="service-box">
                        <span class="service-title">🛡️ Deep Relief Back Rescue</span>
                        <small>Erase the stiffness from your long work days.</small>
                    </div>
                </td>
            </tr>

            <tr>
                <td class="button-container">
                    <p style="margin-bottom: 20px;">Ready to begin your journey?</p>
                    <a href="#" class="button">BOOK YOUR FIRST SESSION</a>
                </td>
            </tr>

            <tr>
                <td class="footer">
                    <p><strong>Aromatic Heaven</strong><br>
                    Ancient aroma therapy | Tier-1 City Services<br>
                    Contact us: +91 9852364710 | info@aromaticheaven.in</p>
                    <p style="margin-top: 10px;">
                        <a href="#" style="color: #d4af37; text-decoration: none;">Instagram</a> | 
                        <a href="#" style="color: #d4af37; text-decoration: none;">Facebook</a>
                    </p>
                    <p>© 2026 Aromatic Heaven. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
`