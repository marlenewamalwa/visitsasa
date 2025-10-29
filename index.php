<!-- Test update from local -->
<?php
include 'config.php';
include 'header.php';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VisitSasa - Discover Kenya</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #ffff;
            color: #0F445F;
        }

        /* Hero Section */
        .hero {
            height: 80vh;
            background: url('images/beach.jpg') no-repeat center center/cover;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 2rem;
            position: relative;
            overflow: hidden;
           
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 68, 95, 0.5);
        }

        .hero-content {
            position: relative;
            z-index: 1;
            max-width: 900px;
        }

        .hero h1 {
            color: #F3FAFB;
            font-size: 5rem;
            margin-bottom: 1.5rem;
            font-weight: 300;
            letter-spacing: 2px;
        }

        .hero p {
            color: #F3FAFB;
            font-size: 1.4rem;
            margin-bottom: 3rem;
            font-weight: 300;
            line-height: 1.8;
        }

        /* Search Box */
        .search-field {
            background: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 600px;
            margin: 0 auto;
        }
        .search-field label {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            color: #0F445F;
            font-weight: 600;
        }
        .search-input-wrapper {
            display: flex;
            width: 100%;
        }
        .search-input-wrapper input {
            flex: 1;
            padding: 0.8rem 1rem;
            border: 2px solid #0F445F;
            border-right: none;
            border-radius: 8px 0 0 8px;
            font-size: 1rem;
            outline: none;
        }
        .search-input-wrapper input:focus {
            border-color: #11989B;
        }
        .btn-search {
            background: #0F445F;
            color: white;
            border: none;
            padding: 0 1.5rem;
            border-radius: 0 8px 8px 0;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.3s;
        }
        .btn-search:hover {
            background: #0F445F;
        }

        /* Categories Section */
        .categories-section {
            padding: 6rem 5%;
            background: white;
        }

        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .section-header h2 {
            color: #0F445F;q
            font-size: 3rem;
            margin-bottom: 1rem;
            font-weight: 300;
            letter-spacing: 2px;
        }

        .section-header p {
            color: #11989B;
            font-size: 1.1rem;
            font-weight: 300;
        }

        .categories-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
            max-width: 1400px;
            margin: 0 auto;
        }

        .category-card {
           
            padding: 2rem 1rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
            border: 1px solid #F3FAFB;
            position: relative;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            text-decoration: none;
            color: inherit;
            font-size: 0.95rem;
            font-weight: 300;
            letter-spacing: 1px;
            line-height: 1.6;
            box-sizing: border-box;
            overflow: hidden;
            background: #fff;
            margin-left: 10px;

        }

        .category-card::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 3px;
            background: #11989B;
            transition: width 0.3s;
        }

        .category-card:hover::after {
            width: 80%;
        }

        .category-card:hover {
            background: #F3FAFB;
        }

        .category-card h3 {
            color: #0F445F;
            font-size: 1.3rem;
            margin-bottom: 1rem;
            font-weight: 600;
            letter-spacing: 1px;
        }

        .category-card p {
            color: #11989B;
            line-height: 1.7;
            font-size: 0.95rem;
        }

        /* Popular Destinations */
        .destinations-section {
            padding: 6rem 5%;
            background: #F3FAFB;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .destination-card {
            position: relative;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.4s;
            height: 450px;
        }

        .destination-card:hover {
            transform: translateY(-8px);
        }

        .destination-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s;
            filter: brightness(0.85);
        }

        .destination-card:hover img {
            transform: scale(1.05);
            filter: brightness(0.7);
        }

        .destination-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 68, 95, 0.3);
            z-index: 1;
        }

        .destination-info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 2.5rem;
            z-index: 2;
        }

        .destination-name {
            color: white;
            font-size: 2.5rem;
            font-weight: 300;
            margin-bottom: 0.8rem;
            letter-spacing: 2px;
        }

        .destination-desc {
            color: white;
            font-size: 1rem;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s;
            font-weight: 300;
        }

        .destination-card:hover .destination-desc {
            opacity: 1;
            transform: translateY(0);
        }

        .deluxe-section {
  padding: 50px 20px;
  background: #f7f9fc;
  text-align: center;
}

.deluxe-section h2 {
  font-size: 32px;
  margin-bottom: 30px;
  color: #0F445F;
}

.deluxe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1100px;
  margin: 0 auto;
}

.deluxe-card {
  background: white;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.deluxe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.deluxe-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.deluxe-info h3 {
  margin: 10px 0 5px 0;
  color: #1a5c7a;
}

.deluxe-info p {
  margin: 5px 0;
  color: #555;
}


        /* Features Section */
        .features-section {
            padding: 6rem 5%;
            background: white;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 3rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .feature-card {
            background: white;
            padding: 3rem 2rem;
            text-align: center;
            transition: all 0.3s;
            border: 2px solid #F3FAFB;
        }

        .feature-card:hover {
            border-color: #11989B;
            transform: translateY(-5px);
        }

        .feature-card h3 {
            color: #0F445F;
            margin-bottom: 1rem;
            font-size: 1.4rem;
            font-weight: 600;
            letter-spacing: 1px;
        }

        .feature-card p {
            color: #11989B;
            line-height: 1.8;
            font-size: 0.95rem;
        }

        
        /* Responsive */
        @media (max-width: 1024px) {
            .categories-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .features-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            .hero h1 {
                font-size: 3rem;
            }

            .hero p {
                font-size: 1.1rem;
            }

            .search-container {
                padding: 1.5rem;
            }

            .search-input-wrapper {
                flex-direction: column;
            }

            .search-field input {
                border: 2px solid #0F445F;
                border-bottom: none;
            }

            .btn-search {
                width: 100%;
                border: 2px solid #11989B;
            }

            .section-header h2 {
                font-size: 2rem;
            }

            .categories-grid {
                grid-template-columns: 1fr;
            }

            .grid {
                grid-template-columns: 1fr;
            }

            .destination-card {
                height: 350px;
            }

            .features-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>Discover Kenya</h1>
            <p>From pristine beaches to wild savannahs, explore the beauty and diversity of Kenya</p>
            
        <form action="destinations.php" method="get" class="search-field">
    <label>Where To?</label>
    <div class="search-input-wrapper">
        <input type="text" name="location" placeholder="Search destinations, cities, or attractions" id="location">
        <button class="btn-search" type="submit">Search</button>
    </div>
</form>
        </div>
    </section>

    <!-- Popular Destinations -->
    <section class="destinations-section">
        <div class="section-header">
            <h2>Popular Destinations</h2>
            <p>Discover Kenya's most beloved locations</p>
        </div>
        <div class="grid">
            <a href="destinations.php?location=mombasa">
  <div class="destination-card">
    <img src="images/mombasa.jpeg" alt="Mombasa">
    <div class="destination-info">
      <div class="destination-name">MOMBASA</div>
      <div class="destination-desc">Historic port city with stunning beaches and Swahili culture</div>
    </div>
  </div>
</a>

<a href="destinations.php?location=maasaimara">
  <div class="destination-card">
    <img src="images/cheetah.jpg" alt="maasaimara">
    <div class="destination-info">
      <div class="destination-name">MAASAI MARA</div>
      <div class="destination-desc">The Maasai Mara is absolutely spectacular! It's Kenya's most famous wildlife reserve and a leading safari destination in East Africa</div>
    </div>
  </div>
</a>

<a href="destinations.php?location=nakuru">
  <div class="destination-card">
    <img src="images/hippos.jpg" alt="Nakuru">
    <div class="destination-info">
      <div class="destination-name">LAKE NAKURU</div>
      <div class="destination-desc">The lake is home to fuchsia pink flamingos, of which there are often more than a million, and sometimes two million</div>
    </div>
  </div>
</a>

<a href="destinations.php?location=diani">
  <div class="destination-card">
    <img src="images/diani.jpg" alt="Watamu">
    <div class="destination-info">
      <div class="destination-name">DIANI</div>
      <div class="destination-desc">Marine paradise with coral reefs and sea turtle sanctuary</div>
    </div>
  </div>
</a>
        </div>
</section>

<!-- Categories Section -->
    <section class="categories-section">
  <div class="section-header">
    <h2>Explore by Experience</h2>
    <p>Choose your perfect Kenyan adventure</p>
  </div>
  
  <div class="categories-grid">
    <a href="beach_coast.php" class="category-card">
      <h3>Beach & Coast</h3>
      <p>White sand beaches, crystal waters, and coastal culture along the Indian Ocean</p>
    </a>

    <a href="wildlife.php" class="category-card">
      <h3>Wildlife Safari</h3>
      <p>Witness the Big Five and incredible wildlife migrations in world-class national parks</p>
    </a>

    <a href="mountains_hiking.php" class="category-card">
      <h3>Mountains & Hiking</h3>
      <p>Conquer peaks and explore lush highland landscapes from Mount Kenya to the Rift Valley</p>
    </a>

    <a href="culture_heritage.php" class="category-card">
      <h3>Culture & Heritage</h3>
      <p>Experience rich traditions, historical landmarks, and vibrant local communities</p>
    </a>
  </div>
</section>


    <!-- Features Section -->
    <section class="features-section">
        <div class="section-header">
            <h2>Why Choose VisitSasa</h2>
            <p>Your trusted guide to exploring Kenya</p>
        </div>
        <div class="features-grid">
            <div class="feature-card">
                <h3>Comprehensive Guides</h3>
                <p>Detailed information about every destination, from hidden gems to iconic landmarks across Kenya.</p>
            </div>
            <div class="feature-card">
                <h3>Authentic Reviews</h3>
                <p>Real experiences from travelers who've explored Kenya's diverse destinations and attractions.</p>
            </div>
            <div class="feature-card">
                <h3>Local Insights</h3>
                <p>Insider tips and recommendations from locals who know Kenya's best-kept secrets.</p>
            </div>
            <div class="feature-card">
                <h3>Easy Planning</h3>
                <p>Plan your entire Kenyan adventure with our intuitive tools and curated itineraries.</p>
            </div>
            <div class="feature-card">
                <h3>Personalized Recommendations</h3>
                <p>Get suggestions tailored to your interests, whether adventure, culture, or relaxation.</p>
            </div>
            <div class="feature-card">
                <h3>Complete Coverage</h3>
                <p>From coast to highlands, cities to savannahs - explore every corner of Kenya.</p>
            </div>
        </div>
    </section>

  

    <script>
        function searchDestination() {
            const location = document.getElementById('location').value.trim();

            if (!location) {
                alert('Please enter a destination to explore');
                return;
            }

            const params = new URLSearchParams({
                location: location
            });

            window.location.href = 'search.php?' + params.toString();
        }

        document.getElementById('location').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchDestination();
            }
        });
    </script>
</body>
</html>