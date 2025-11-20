<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discover Kenya | Travel Guides & Inspiration</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #2c3643;
            background-color: #fff;
        }

        /* Header & Navigation */
        header {
            background: #fff;
            border-bottom: 1px solid #dbe6ec;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        nav {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: #297CBB;
            text-decoration: none;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
        }

        .nav-links a {
            color: #3b444f;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: #297CBB;
        }

        /* Hero Section */
        .hero {
            position: relative;
            height: 70vh;
            background: linear-gradient(135deg, #142b44 0%, #1d508d 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><path d="M0,300 Q300,200 600,300 T1200,300 L1200,600 L0,600 Z" fill="rgba(255,255,255,0.05)"/></svg>') no-repeat center;
            background-size: cover;
        }

        .hero-content {
            position: relative;
            z-index: 1;
            max-width: 800px;
            padding: 2rem;
        }

        .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            font-weight: 700;
        }

        .hero p {
            font-size: 1.3rem;
            margin-bottom: 2rem;
            opacity: 0.95;
        }

        .hero-cta {
            display: inline-block;
            background: #0FDEBD;
            color: #142b44;
            padding: 1rem 2.5rem;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
        }

        .hero-cta:hover {
            background: #16c98d;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(15, 222, 189, 0.4);
        }

        /* Featured Section */
        .featured {
            background: #feef6d;
            padding: 3rem 2rem;
            text-align: center;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .featured h2 {
            font-size: 2rem;
            color: #142b44;
            margin-bottom: 1rem;
        }

        .featured p {
            font-size: 1.1rem;
            color: #3b444f;
            margin-bottom: 1.5rem;
        }

        .featured-btn {
            display: inline-block;
            background: #142b44;
            color: white;
            padding: 0.8rem 2rem;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 600;
            transition: background 0.3s;
        }

        .featured-btn:hover {
            background: #1d508d;
        }

        /* Destinations Section */
        .destinations {
            padding: 4rem 2rem;
            background: #fff;
        }

        .section-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .section-header h2 {
            font-size: 2.5rem;
            color: #2c3643;
            margin-bottom: 0.5rem;
        }

        .section-header p {
            color: #67747c;
            font-size: 1.1rem;
        }

        .dest-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .dest-card {
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            cursor: pointer;
        }

        .dest-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .dest-image {
            height: 300px;
            background-size: cover;
            background-position: center;
            position: relative;
        }

        .dest-image::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50%;
            background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
        }

        .dest-info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1.5rem;
            color: white;
            z-index: 1;
        }

        .dest-info h3 {
            font-size: 1.5rem;
            margin-bottom: 0.3rem;
        }

        .dest-info p {
            font-size: 0.9rem;
            opacity: 0.95;
        }

        .view-all {
            text-align: center;
            margin-top: 2rem;
        }

        .view-all a {
            color: #297CBB;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
        }

        .view-all a:hover {
            text-decoration: underline;
        }

        /* Stories Section */
        .stories {
            background: #f9f9f9;
            padding: 4rem 2rem;
        }

        .stories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
        }

        .story-card {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: transform 0.3s;
        }

        .story-card:hover {
            transform: translateY(-3px);
        }

        .story-image {
            height: 220px;
            background-size: cover;
            background-position: center;
        }

        .story-content {
            padding: 1.5rem;
        }

        .story-tag {
            display: inline-block;
            background: #dbe6ec;
            color: #1d508d;
            padding: 0.3rem 0.8rem;
            border-radius: 3px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-bottom: 0.8rem;
        }

        .story-content h3 {
            font-size: 1.3rem;
            color: #2c3643;
            margin-bottom: 0.5rem;
            line-height: 1.3;
        }

        .story-meta {
            color: #99a9b3;
            font-size: 0.85rem;
        }

        /* Instagram Section */
        .instagram {
            padding: 4rem 2rem;
            background: white;
            text-align: center;
        }

        .instagram h2 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            color: #2c3643;
        }

        .instagram-handle {
            color: #297CBB;
            font-size: 1.2rem;
            margin-bottom: 2rem;
            text-decoration: none;
        }

        .instagram-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .instagram-item {
            height: 200px;
            background-size: cover;
            background-position: center;
            border-radius: 4px;
            transition: transform 0.3s;
            cursor: pointer;
        }

        .instagram-item:hover {
            transform: scale(1.05);
        }

        /* Footer */
        footer {
            background: #142b44;
            color: white;
            padding: 3rem 2rem 1rem;
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .footer-section h4 {
            margin-bottom: 1rem;
            color: #0FDEBD;
        }

        .footer-section ul {
            list-style: none;
        }

        .footer-section a {
            color: #dbe6ec;
            text-decoration: none;
            display: block;
            margin-bottom: 0.5rem;
            transition: color 0.3s;
        }

        .footer-section a:hover {
            color: #0FDEBD;
        }

        .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.1);
            color: #99a9b3;
        }

        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .nav-links {
                gap: 1rem;
            }

            .dest-grid, .stories-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <nav>
            <a href="#" class="logo">🇰🇪 Discover Kenya</a>
            <ul class="nav-links">
                <li><a href="#destinations">Destinations</a></li>
                <li><a href="#experiences">Experiences</a></li>
                <li><a href="#stories">Stories</a></li>
                <li><a href="#plan">Plan</a></li>
            </ul>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>Welcome to Kenya</h1>
            <p>Discover wild safaris, pristine beaches, rich cultures, and unforgettable adventures in the heart of East Africa</p>
            <a href="#destinations" class="hero-cta">Start Exploring</a>
        </div>
    </section>

    <!-- Featured Banner -->
    <section class="featured">
        <div class="container">
            <h2>🌟 Best in Kenya 2025</h2>
            <p>Your dream itinerary starts here. Discover the hottest destinations and experiences across Kenya</p>
            <a href="#" class="featured-btn">Explore the Guide</a>
        </div>
    </section>

    <!-- Destinations Section -->
    <section id="destinations" class="destinations">
        <div class="container">
            <div class="section-header">
                <h2>Where to next?</h2>
                <p>Explore Kenya's most incredible destinations</p>
            </div>
            
            <div class="dest-grid">
                <div class="dest-card">
                    <div class="dest-image" style="background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);">
                        <div class="dest-info">
                            <h3>Maasai Mara</h3>
                            <p>Witness the Great Migration and incredible wildlife</p>
                        </div>
                    </div>
                </div>
                
                <div class="dest-card">
                    <div class="dest-image" style="background: linear-gradient(135deg, #1E90FF 0%, #00CED1 100%);">
                        <div class="dest-info">
                            <h3>Diani Beach</h3>
                            <p>White sands and turquoise waters of the Indian Ocean</p>
                        </div>
                    </div>
                </div>
                
                <div class="dest-card">
                    <div class="dest-image" style="background: linear-gradient(135deg, #2F4F4F 0%, #708090 100%);">
                        <div class="dest-info">
                            <h3>Mount Kenya</h3>
                            <p>Africa's second-highest peak with stunning glaciers</p>
                        </div>
                    </div>
                </div>
                
                <div class="dest-card">
                    <div class="dest-image" style="background: linear-gradient(135deg, #696969 0%, #A9A9A9 100%);">
                        <div class="dest-info">
                            <h3>Nairobi</h3>
                            <p>Vibrant capital blending urban energy and wildlife</p>
                        </div>
                    </div>
                </div>
                
                <div class="dest-card">
                    <div class="dest-image" style="background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);">
                        <div class="dest-info">
                            <h3>Lake Nakuru</h3>
                            <p>Home to millions of pink flamingos</p>
                        </div>
                    </div>
                </div>
                
                <div class="dest-card">
                    <div class="dest-image" style="background: linear-gradient(135deg, #20B2AA 0%, #48D1CC 100%);">
                        <div class="dest-info">
                            <h3>Lamu Island</h3>
                            <p>Ancient Swahili culture meets pristine beaches</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="view-all">
                <a href="#destinations">View all destinations →</a>
            </div>
        </div>
    </section>

    <!-- Stories Section -->
    <section id="stories" class="stories">
        <div class="container">
            <div class="section-header">
                <h2>Travel stories and news</h2>
                <p>Explore our latest guides and inspiration</p>
            </div>
            
            <div class="stories-grid">
                <div class="story-card">
                    <div class="story-image" style="background: linear-gradient(135deg, #8B4513 0%, #CD853F 100%);"></div>
                    <div class="story-content">
                        <span class="story-tag">Wildlife</span>
                        <h3>The ultimate guide to safari in Maasai Mara</h3>
                        <p class="story-meta">Nov 15, 2025 • 12 min read</p>
                    </div>
                </div>
                
                <div class="story-card">
                    <div class="story-image" style="background: linear-gradient(135deg, #1E90FF 0%, #87CEEB 100%);"></div>
                    <div class="story-content">
                        <span class="story-tag">Beach & Coast</span>
                        <h3>10 stunning beaches you must visit in Kenya</h3>
                        <p class="story-meta">Nov 12, 2025 • 8 min read</p>
                    </div>
                </div>
                
                <div class="story-card">
                    <div class="story-image" style="background: linear-gradient(135deg, #228B22 0%, #32CD32 100%);"></div>
                    <div class="story-content">
                        <span class="story-tag">Culture</span>
                        <h3>Living with the Maasai: a cultural immersion</h3>
                        <p class="story-meta">Nov 10, 2025 • 10 min read</p>
                    </div>
                </div>
                
                <div class="story-card">
                    <div class="story-image" style="background: linear-gradient(135deg, #4682B4 0%, #5F9EA0 100%);"></div>
                    <div class="story-content">
                        <span class="story-tag">Adventure</span>
                        <h3>Climbing Mount Kenya: what you need to know</h3>
                        <p class="story-meta">Nov 8, 2025 • 15 min read</p>
                    </div>
                </div>
                
                <div class="story-card">
                    <div class="story-image" style="background: linear-gradient(135deg, #DC143C 0%, #FF6347 100%);"></div>
                    <div class="story-content">
                        <span class="story-tag">Food & Drink</span>
                        <h3>A foodie's guide to Nairobi's best restaurants</h3>
                        <p class="story-meta">Nov 5, 2025 • 7 min read</p>
                    </div>
                </div>
                
                <div class="story-card">
                    <div class="story-image" style="background: linear-gradient(135deg, #8B008B 0%, #9932CC 100%);"></div>
                    <div class="story-content">
                        <span class="story-tag">Tips & Advice</span>
                        <h3>First time in Kenya? Here's what to expect</h3>
                        <p class="story-meta">Nov 3, 2025 • 11 min read</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Instagram Section -->
    <section class="instagram">
        <div class="container">
            <h2>Follow the journey</h2>
            <a href="https://instagram.com/discoverkenya" class="instagram-handle">#discoverkenya</a>
            
            <div class="instagram-grid">
                <div class="instagram-item" style="background: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%);"></div>
                <div class="instagram-item" style="background: linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%);"></div>
                <div class="instagram-item" style="background: linear-gradient(135deg, #A8E6CF 0%, #3EECAC 100%);"></div>
                <div class="instagram-item" style="background: linear-gradient(135deg, #F38181 0%, #FCE38A 100%);"></div>
                <div class="instagram-item" style="background: linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%);"></div>
                <div class="instagram-item" style="background: linear-gradient(135deg, #FD79A8 0%, #FDCB6E 100%);"></div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>Destinations</h4>
                    <ul>
                        <li><a href="#">Maasai Mara</a></li>
                        <li><a href="#">Nairobi</a></li>
                        <li><a href="#">Mombasa</a></li>
                        <li><a href="#">Mount Kenya</a></li>
                        <li><a href="#">Amboseli</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Experiences</h4>
                    <ul>
                        <li><a href="experiences.php">All Experiences</a></li>
                        <li><a href="#">Wildlife Safari</a></li>
                        <li><a href="#">Beach Holidays</a></li>
                        <li><a href="#">Cultural Tours</a></li>
                        <li><a href="#">Adventure Activities</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Plan Your Trip</h4>
                    <ul>
                        <li><a href="#">When to Visit</a></li>
                        <li><a href="#">Visa Information</a></li>
                        <li><a href="#">Getting Around</a></li>
                        <li><a href="#">Where to Stay</a></li>
                        <li><a href="#">Travel Tips</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>About</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Newsletter</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2025 Discover Kenya. Your journey begins here.</p>
            </div>
        </div>
    </footer>
</body>
</html>