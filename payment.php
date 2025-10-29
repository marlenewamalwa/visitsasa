<?php
include 'config.php'; // connect to your database

session_start();
$user_id = $_SESSION['user_id'] ?? 1; // use your actual logged-in user session

$package = $_GET['package'] ?? 'premium';

// set price based on package
switch ($package) {
  case 'deluxe':
    $price = '10.00';
    break;
  case 'premium':
    $price = '5.00';
    break;
  default:
    $price = '0.00';
    break;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Payment - Visit Sasa</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f3f7f9;
      color: #0F445F;
      text-align: center;
      padding: 40px;
    }
    h2 { margin-bottom: 10px; }
  </style>
</head>
<body>
  <h2>Pay for <?php echo ucfirst($package); ?> Package</h2>
  <p>Amount: $<?php echo $price; ?></p>

  <div id="paypal-button-container"></div>

  <script src="https://www.paypal.com/sdk/js?client-id=AfeEehUOPvTQ5IxHkhx63CBTgmEI2dQKYtKVlgLk908D36K8eFE4EsL_HdUAUXGR-Dwjo5BUABwwgjhP&currency=USD"></script>
  <script>
    paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: { value: '<?php echo $price; ?>' }
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          // Save payment details
          fetch('save_payment.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              transaction_id: details.id,
              payer_name: details.payer.name.given_name,
              amount: details.purchase_units[0].amount.value,
              package: '<?php echo $package; ?>'
            })
          })
          .then(response => response.text())
          .then(data => {
            // redirect to listing form
            window.location.href = "add_listing.php?package=<?php echo $package; ?>";
          });
        });
      }
    }).render('#paypal-button-container');
  </script>
</body>
</html>
