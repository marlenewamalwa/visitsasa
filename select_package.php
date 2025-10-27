<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f7f9;
            color: #0F445F;
            padding: 20px;
        }
        h2 {
            text-align: center;
        }
        .packages {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
        }
        .package {
            background-color: #fff;
            border: 2px solid #0F445F;
            border-radius: 10px;
            padding: 20px;
            width: 200px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .package h3 {
            margin-top: 0;
        }
        .package p {
            font-size: 14px;
            color: #58707A;
        }
        .btn {
            display: inline-block;
            margin-top: 15px;
            padding: 10px 15px;
            background-color: #0F445F;
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
        }
        .btn:hover {
            background-color: #1a5c7a;
        }
    </style>
</head>
<body>
     <h2>Select Your Package</h2>
<div class="packages">
  <div class="package">
    <h3>Standard (Free)</h3>
    <p>1 image, basic info</p>
    <a href="add_listing.php?package=standard" class="btn">Select</a>
  </div>

  <div class="package">
    <h3>Premium (Ksh 500)</h3>
    <p>Up to 5 images, description, contact info</p>
    <a href="payment.php?package=premium" class="btn">Select</a>
  </div>

  <div class="package">
    <h3>Deluxe (Ksh 1000)</h3>
    <p>Up to 10 images, full description, contact, social links, featured spot</p>
    <a href="payment.php?package=deluxe" class="btn">Select</a>
  </div>
</div>

</body>
</html> 
 
 