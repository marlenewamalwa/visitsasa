<?php
session_start();
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name     = trim($_POST['name']);
    $email    = trim($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Check if email already exists
    $check = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $check->execute([$email]);
    if ($check->fetch()) {
        echo "<script>alert('Email already registered. Please log in.');</script>";
    } else {
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        if ($stmt->execute([$name, $email, $password])) {
            // Store ID and Name for later use
            $_SESSION['user_id']   = $pdo->lastInsertId();
            $_SESSION['user_name'] = $name;

            echo "<script>
                    alert('Signup successful!');
                    window.location.href='select-package.php';
                  </script>";
            exit();
        } else {
            echo "<script>alert('Error signing up. Please try again.');</script>";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sign Up - Visitsasa</title>
<style>
/* ===== modern CSS kept intact ===== */
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;
     background:linear-gradient(135deg,#0F445F 0%,#1a5c7a 100%);
     min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;}
.signup-container{background:white;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,0.3);
     overflow:hidden;max-width:450px;width:100%;animation:slideUp 0.5s ease;}
@keyframes slideUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
.signup-header{background:linear-gradient(135deg,#0F445F 0%,#1a5c7a 100%);
     padding:40px 30px;text-align:center;color:white;}
.signup-header h1{font-size:32px;font-weight:700;margin-bottom:8px;}
.signup-header p{font-size:16px;opacity:0.9;}
.signup-form{padding:40px 30px;}
.form-group{margin-bottom:25px;}
.form-group label{display:block;margin-bottom:8px;font-weight:600;color:#333;font-size:14px;}
.form-group input{width:100%;padding:14px 16px;border:2px solid #e0e0e0;border-radius:10px;
     font-size:15px;transition:all 0.3s ease;outline:none;}
.form-group input:focus{border-color:#0F445F;box-shadow:0 0 0 3px rgba(15,68,95,0.1);}
.form-group input::placeholder{color:#999;}
.signup-btn{width:100%;padding:16px;background:linear-gradient(135deg,#0F445F 0%,#1a5c7a 100%);
     color:white;border:none;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;
     transition:all 0.3s ease;margin-top:10px;}
.signup-btn:hover{transform:translateY(-2px);box-shadow:0 10px 25px rgba(15,68,95,0.4);}
.login-link{text-align:center;margin-top:25px;font-size:14px;color:#666;}
.login-link a{color:#0F445F;text-decoration:none;font-weight:600;}
.login-link a:hover{text-decoration:underline;}
.password-strength{height:4px;background:#e0e0e0;border-radius:2px;margin-top:8px;overflow:hidden;display:none;}
.password-strength-bar{height:100%;width:0%;transition:all 0.3s ease;background:#e74c3c;}
.password-strength.active{display:block;}
@media(max-width:480px){
    .signup-container{border-radius:0;}
    .signup-header{padding:30px 20px;}
    .signup-form{padding:30px 20px;}
    .signup-header h1{font-size:28px;}
}
</style>
</head>
<body>
<div class="signup-container">
    <div class="signup-header">
        <h1>Visitsasa</h1>
        <p>Start your journey today</p>
    </div>

    <div class="signup-form">
        <form method="post" action="">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your full name" required>
            </div>

            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Create a strong password" required>
                <div class="password-strength" id="passwordStrength">
                    <div class="password-strength-bar" id="strengthBar"></div>
                </div>
            </div>

            <button type="submit" class="signup-btn">Create Account</button>

            <div style="text-align:center; margin-top:20px;">
    <a href="google_login.php" style="
        display:inline-flex; align-items:center; justify-content:center;
        gap:10px; background:#fff; color:#444;
        border:2px solid #e0e0e0; border-radius:10px;
        padding:12px 20px; text-decoration:none; font-weight:600;
        transition:0.3s; box-shadow:0 5px 15px rgba(0,0,0,0.05);">
        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" style="width:20px;">
        Continue with Google
    </a>
</div>

        </form>

        <div class="login-link">
            Already have an account? <a href="login.php">Log in</a>
        </div>
    </div>
</div>

<script>
const passwordInput = document.getElementById('password');
const strengthBar   = document.getElementById('strengthBar');
const strengthBox   = document.getElementById('passwordStrength');

passwordInput.addEventListener('input', function () {
    const val = this.value;
    if (!val) { strengthBox.classList.remove('active'); return; }

    strengthBox.classList.add('active');
    let strength = 0;
    if (val.length >= 8) strength += 25;
    if (/[a-z]/.test(val)) strength += 25;
    if (/[A-Z]/.test(val)) strength += 25;
    if (/[0-9]/.test(val)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(val)) strength += 10;

    strengthBar.style.width = strength + '%';
    strengthBar.style.background =
        strength < 40 ? '#e74c3c' :
        strength < 70 ? '#f39c12' : '#27ae60';
});
</script>
</body>
</html>
