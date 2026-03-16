export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const getOtpHtml = (otp) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OTP Verification</title>

<style>
  body{
    margin:0;
    padding:0;
    background-color:#f4f4f4;
    font-family: Arial, Helvetica, sans-serif;
  }

  .container{
    max-width:500px;
    margin:50px auto;
    background:#ffffff;
    padding:30px;
    border-radius:8px;
    box-shadow:0 4px 10px rgba(0,0,0,0.1);
    text-align:center;
  }

  h1{
    color:#333;
    margin-bottom:10px;
  }

  p{
    color:#555;
    font-size:16px;
    line-height:1.6;
  }

  .otp{
    margin:20px 0;
    font-size:32px;
    letter-spacing:5px;
    font-weight:bold;
    color:#2c7be5;
    background:#f1f5ff;
    padding:15px;
    border-radius:6px;
    display:inline-block;
  }

  .footer{
    margin-top:20px;
    font-size:14px;
    color:#888;
  }
</style>
</head>

<body>

<div class="container">
  
  <h1>Email Verification</h1>
  
  <p>Hello,</p>
  
  <p>Your One Time Password (OTP) for verification is:</p>

  <div class="otp">
    ${otp}
  </div>

  <p>This OTP is valid for the next <strong>5 minutes</strong>. Please do not share it with anyone.</p>

  <div class="footer">
    <p>If you didn’t request this, you can safely ignore this email.</p>
  </div>

</div>

</body>
</html>`;
};

