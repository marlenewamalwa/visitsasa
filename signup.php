<?php session_start();
include 'config.php';
$google_login_url = $client->createAuthUrl();
$errors = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name  = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $pass  = $_POST['password'] ?? '';
    $pass2 = $_POST['confirm_password'] ?? '';

    // Basic validation
    if ($name === '') $errors[] = 'Name is required.';
    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required.';
    if (strlen($pass) < 8) $errors[] = 'Password must be at least 8 characters.';
    if ($pass !== $pass2) $errors[] = 'Passwords do not match.';

    // Check duplicate email
    if (empty($errors)) {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            $errors[] = 'An account with that email already exists.';
        }
    }
    // Insert user
    if (empty($errors)) {
        $hash = password_hash($pass, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$name, $email, $hash]);
        $userId = $pdo->lastInsertId();

        // Auto-login
        $_SESSION['user_id']   = $userId;
        $_SESSION['user_name'] = $name;

        header('Location: profile.php');
        exit();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sign Up - Visitsasa</title>
<style>
/* Minimal styling to match login page */
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,Helvetica,sans-serif;background:linear-gradient(135deg,#0F445F,#1a5c7a);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.container{background:#fff;border-radius:14px;padding:30px;max-width:480px;width:100%;box-shadow:0 20px 50px rgba(0,0,0,0.25)}
h2{color:#0F445F;margin-bottom:18px;text-align:center}
.form-group{margin-bottom:14px}
label{display:block;margin-bottom:6px;font-weight:600;color:#333}
input[type="text"],input[type="email"],input[type="password"]{width:100%;padding:12px;border:2px solid #e6e6e6;border-radius:8px;font-size:15px}
button{width:100%;padding:12px;border:0;border-radius:8px;background:linear-gradient(135deg,#0F445F,#1a5c7a);color:#fff;font-weight:700;cursor:pointer}
.error{background:#ffecec;color:#991b1b;padding:10px;border-radius:8px;margin-bottom:12px}
.success{background:#e6fffb;color:#0a6b6c;padding:10px;border-radius:8px;margin-bottom:12px}
.small{font-size:13px;color:#666;text-align:center;margin-top:10px}
.small a{color:#0F445F;text-decoration:none;font-weight:600}
</style>
</head>
<body>
<div class="container">
    <h2>Create an account</h2>

    <?php if (!empty($errors)): ?>
        <div class="error">
            <?php foreach ($errors as $e) echo htmlspecialchars($e) . '<br>'; ?>
        </div>
    <?php endif; ?>

    <form method="post" action="">
        <div class="form-group">
            <label for="name">Full name</label>
            <input id="name" name="name" type="text" value="<?php echo isset($name) ? htmlspecialchars($name) : ''; ?>" required>
        </div>

        <div class="form-group">
            <label for="email">Email address</label>
            <input id="email" name="email" type="email" value="<?php echo isset($email) ? htmlspecialchars($email) : ''; ?>" required>
        </div>

        <div class="form-group">
            <label for="password">Password (min 8 characters)</label>
            <input id="password" name="password" type="password" required>
        </div>

        <div class="form-group">
            <label for="confirm_password">Confirm password</label>
            <input id="confirm_password" name="confirm_password" type="password" required>
        </div>

        <button type="submit">Sign Up</button>
        <a href="<?php echo $google_login_url; ?>">
  <button type="button">Continue with Google</button>
</a>
    </form>

    <div class="small">
        Already have an account? <a href="login.php">Log in</a>
    </div>
</div>
</body>
</html>