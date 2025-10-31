<?php // start session at the very top
$isLoggedIn = !empty($_SESSION['user']['id']); 
$userName   = $isLoggedIn && !empty($_SESSION['user']['name'])
? htmlspecialchars($_SESSION['user']['name'])
: '';
?>
<style>
        /* Navigation */
        nav {
            background: rgba(255, 255, 255, 0.95);
            padding: 1rem 5%;
            position: relative;
            width: 100%;
            height: 90px;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .nav-container {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #F3FAFB;
            font-size: 1.8rem;
            font-weight: bold;
            text-decoration: none;
        }
        .logo-icon {
            width: 40px;
            height: 40px;
            background: #11989B;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }
        .nav-links {
            display: flex;
            gap: 2.5rem;
            align-items: center;
        }
        .nav-links a {
            color: #11989B;
            text-decoration: none;
            font-size: 1rem;
            transition: color 0.3s;
        }
        .nav-links a:hover {
            color: #0F445F;
        }
        .btn-sign-in {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 0.6rem 1.2rem;
            background: transparent;
            border: 2px solid #F3FAFB;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .btn-sign-in:hover {
            background: #F3FAFB;
            color: #0F445F;
        }
        .btn-add-listing {
            padding: 0.6rem 1.5rem;
            background: #0F445F;
            border: none;
            border-radius: 6px;
            color: #F3FAFB;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .btn-add-listing:hover {
            background: #0d7a7d;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(17, 152, 155, 0.3);
        }
    </style>
<header>
    <nav>
        <div class="nav-container">
            <a href="index.php" class="logo">
                <img src="images/logo.png" alt="VisitSasa Logo" style="height:70px;">
            </a>
            <div class="nav-links">
                <a href="index.php">Home</a>
                <a href="destinations.php">Destinations</a>
                <a href="about.php">About</a>
                <a href="contact.php">Contact</a>

                <?php if ($isLoggedIn): ?>
                    <!-- Logged in: show name instead of Log In -->
                    <a href="profile.php" class="btn-sign-in">👤 <?= $userName ?></a>
                    <button class="btn-add-listing" onclick="location.href='select_package.php'">
                        + Add Listing
                    </button>
                <?php else: ?>
                    <!-- Not logged in -->
                    <a href="login.php" class="btn-sign-in">👤 Log In</a>
                    <button class="btn-add-listing" onclick="location.href='signup.php'">
                        + Add Listing
                    </button>
                <?php endif; ?>
            </div>
        </div>
    </nav>
</header>

