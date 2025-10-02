<?php
session_start();

if (!isset($_SESSION['user_id']) || !isset($_SESSION['selected_package'])) {
    header("Location: select-package.php");
    exit();
}

$package = $_SESSION['selected_package'];
$price = ($package === "Premium") ? 20 : 149; 
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Payment - Visitsasa</title>
  <style>
    body { font-family: Arial, sans-serif; background:#f7f9fc; text-align:center; padding:50px; }
    .box { background:white; padding:30px; border-radius:15px; max-width:400px; margin:auto; 
           box-shadow:0 8px 20px rgba(0,0,0,0.1); }
    h2 { margin-bottom:20px; }
  </style>
</head>
<body>
  <div class="box">
    <h2>Checkout</h2>
    <p>You selected the <b><?php echo $package; ?></b> package.</p>
    <p><b>Amount: $<?php echo $price; ?></b></p>

    <!-- PayPal Button -->
    <div id="paypal-button-container"></div>
  </div>

  <!-- Load PayPal SDK -->
  <script src="https://www.paypal.com/sdk/js?client-id=AfeEehUOPvTQ5IxHkhx63CBTgmEI2dQKYtKVlgLk908D36K8eFE4EsL_HdUAUXGR-Dwjo5BUABwwgjhP&currency=USD"></script>

  <script>
  paypal.Buttons({
      createOrder: function(data, actions) {
          return actions.order.create({
              purchase_units: [{
                  amount: {
                      value: '<?php echo $price; ?>'
                  },
                  description: "Visitsasa <?php echo $package; ?> Package"
              }]
          });
      },
      onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
              alert("Payment completed by " + details.payer.name.given_name);

              // Redirect to success page
              window.location.href = "payment-success.php?package=<?php echo $package; ?>&amount=<?php echo $price; ?>";
          });
      }
  }).render('#paypal-button-container');
  </script>
</body>
</html>
