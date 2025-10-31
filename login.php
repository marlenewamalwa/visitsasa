<?php
include 'config.php';
$google_login_url = $client->createAuthUrl();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email    = trim($_POST['email']);
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // ✅ Store all needed info
        $_SESSION['user'] = [
            'id'       => $user['id'],
            'name'     => $user['name'],
            'email'    => $user['email'],
            'is_admin' => $user['is_admin'] ?? 0
        ];

        // ✅ Redirect based on role
       if ($user['is_admin'] == 1) {
    header("Location: admin.php");
    exit();
} else {
    header("Location: profile.php");
    exit();
}

    } else {
        echo "<script>alert('Invalid email or password.');</script>";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login - Visitsasa</title>
<style> /* ===== Modern Look to match signup page ===== */ *{margin:0;padding:0;box-sizing:border-box;} body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif; background:linear-gradient(135deg,#0F445F 0%,#1a5c7a 100%); min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;} .login-container{background:white;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,0.3); max-width:450px;width:100%;overflow:hidden;animation:slideUp 0.5s ease;} @keyframes slideUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}} .login-header{background:linear-gradient(135deg,#0F445F 0%,#1a5c7a 100%); padding:40px 30px;text-align:center;color:white;} .login-header h1{font-size:32px;font-weight:700;margin-bottom:8px;} .login-header p{font-size:16px;opacity:0.9;} .login-form{padding:40px 30px;} .form-group{margin-bottom:25px;} .form-group label{display:block;margin-bottom:8px;font-weight:600;color:#333;font-size:14px;} .form-group input{width:100%;padding:14px 16px;border:2px solid #e0e0e0;border-radius:10px; font-size:15px;transition:all 0.3s ease;outline:none;} .form-group input:focus{border-color:#0F445F;box-shadow:0 0 0 3px rgba(15,68,95,0.1);} .login-btn{width:100%;padding:16px;background:linear-gradient(135deg,#0F445F 0%,#1a5c7a 100%); color:white;border:none;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer; transition:all 0.3s ease;margin-top:10px;} .login-btn:hover{transform:translateY(-2px);box-shadow:0 10px 25px rgba(15,68,95,0.4);} .signup-link{text-align:center;margin-top:25px;font-size:14px;color:#666;} .signup-link a{color:#0F445F;text-decoration:none;font-weight:600;} .signup-link a:hover{text-decoration:underline;} @media(max-width:480px){ .login-container{border-radius:0;} .login-header{padding:30px 20px;} .login-form{padding:30px 20px;} .login-header h1{font-size:28px;} } </style>
</head>
<body>
<div class="login-container">
    <div class="login-header">
        <h1>Welcome Back</h1>
        <p>Log in to continue</p>
    </div>

    <div class="login-form">
        <form method="post" action="">
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
            </div>

            <button type="submit" class="login-btn">Log In</button>
            <button type="button" class="login-btn" onclick="window.location.href='<?php echo $google_login_url; ?>'">
                Continue with Google
            </button>
        </form>

        <div class="signup-link">
            Don't have an account? <a href="signup.php">Sign up here</a>
        </div>
    </div>
</div>
</body>
</html>
