<?php 
include 'config.php';
// Fetch deluxe listings
try {
    // Fetch all listings where package = 'Deluxe'
    $stmt = $pdo->prepare("SELECT Property_name, location, images FROM listings WHERE package = 'Deluxe'");
    $stmt->execute();
    $deluxeListings = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Database error: " . $e->getMessage());
}
include 'header.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VisitSasa - Discover Kenya</title>
    <link rel="icon" type="image/png" href="images/logo.png">
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
            padding: 0 2rem;
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
       
        /* Destinations Section */
        .destinations {
            padding: 6rem 5%;
            background: #F3FAFB;
        }
        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }
        .section-header h2 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            color: #0F445F;
        }
        .section-header p {
            color: #11989B;
            font-size: 1.1rem;
        }

         .dest-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-top: 40px;
            max-width: 1400px;
            padding: 0 10px;
        }

        .dest-card {
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
            height: 300px;
        }

        .dest-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        }

        .dest-image {
            width: 100%;
            height: 100%;
            position: relative;
            background-size: cover;
            background-position: center;
        }

        .dest-image::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%);
        }

        .dest-info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 25px;
            color: white;
            z-index: 1;
        }

        .dest-info h3 {
            font-size: 1.8em;
            margin-bottom: 8px;
        }

        .dest-info p {
            font-size: 1em;
            opacity: 0.9;
        }

        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            animation: fadeIn 0.3s ease;
        }

        .modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .modal-content {
            background: white;
            border-radius: 20px;
            max-width: 700px;
            width: 90%;
            max-height: 85vh;
            overflow-y: auto;
            position: relative;
            animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .modal-header {
            height: 250px;
            background-size: cover;
            background-position: center;
            border-radius: 20px 20px 0 0;
            position: relative;
        }

        .modal-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%);
        }

        .modal-title {
            position: absolute;
            bottom: 20px;
            left: 30px;
            color: white;
            font-size: 2.5em;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 1.5em;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            z-index: 10;
        }

        .close-btn:hover {
            background: #f0f0f0;
            transform: rotate(90deg);
        }

        .modal-body {
            padding: 30px;
        }

        .modal-section {
            margin-bottom: 25px;
        }

        .modal-section h3 {
            color: #0F445F;
            font-size: 1.5em;
            margin-bottom: 12px;
            padding-bottom: 8px;
        }

        .modal-section p {
            line-height: 1.8;
            color: #333;
            margin-bottom: 10px;
        }

        .modal-section ul {
            list-style: none;
            padding-left: 0;
        }

        .modal-section li {
            padding: 8px 0;
            padding-left: 25px;
            position: relative;
            color: #555;
        }

        .modal-section li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #0F445F;
            font-weight: bold;
        }
.dest-guide{
    position: relative;
    min-height: 360px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    overflow: hidden;
  }

  /* background image — swap URL for your preferred hero image */
  .dest-guide::before{
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop");
    background-size: cover;
    background-position: center;
    filter: contrast(0.95) saturate(1.05);
    transform-origin: center;
    z-index: 0;
  }

  .dest-guide__overlay{
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.55));
    z-index: 1;
  }

  .dest-guide__content{
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: var(--max-width);
    padding: 40px;
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 30px;
    align-items: center;
  }

  /* text column */
  .dest-guide__text{
    background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
    padding: 28px;
    border-radius: 12px;
    backdrop-filter: blur(6px) saturate(1.05);
    box-shadow: 0 10px 30px rgba(2,6,23,0.45);
  }

  .dest-guide__text h2{
    font-size: 1.9rem;
    margin-bottom: 10px;
    letter-spacing: -0.02em;
  }

  .dest-guide__text .lead{
    color: var(--muted);
    margin-bottom: 16px;
    font-size: 1rem;
    max-width: 46ch;
  }

  .highlights{
    list-style: none;
    margin: 0 0 20px 0;
    padding-left: 0;
    color: var(--muted);
    line-height: 1.5;
  }

  .highlights li{
    padding: 6px 0;
  }

  .cta-row{
    display:flex;
    gap:12px;
    align-items:center;
    flex-wrap:wrap;
  }

  .btn-download{
    display:inline-flex;
    gap:10px;
    align-items:center;
    background: var(--accent);
    color: white;
    padding: 10px 16px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 600;
    box-shadow: 0 8px 20px rgba(251,107,53,0.18);
    transition: transform .15s ease, box-shadow .15s ease;
  }

  .btn-download svg{ opacity: .95; }

  .btn-download:hover{
    transform: translateY(-3px);
    box-shadow: 0 14px 34px rgba(251,107,53,0.22);
  }

  .btn-learn{
    color: var(--muted);
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.08);
    font-weight:600;
    transition: background .12s ease, color .12s ease;
  }

  .btn-learn:hover{
    background: rgba(255,255,255,0.04);
    color: white;
  }

  /* right image card (decorative) */
  .dest-guide__image{
    height: 240px;
    border-radius: 12px;
    background-image: url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=600&fit=crop");
    background-size: cover;
    background-position: center;
    box-shadow: 0 10px 30px rgba(2,6,23,0.45);
    border: 3px solid rgba(255,255,255,0.06);
  }

  /* responsive */
  @media (max-width: 900px){
    .dest-guide__content{
      grid-template-columns: 1fr;
      padding: 28px;
    }

    .dest-guide__image{
      height: 160px;
      order: -1; /* image above text on small screens */
      margin-bottom: 14px;
    }
  }


/* Responsive */
@media (max-width: 900px) {
  .hero-inner {
    flex-direction: column;
    text-align: center;
  }

  .hero-title {
    font-size: 2.8rem;
  }
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
         .feature
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
            
  <form action="results.php" method="get" class="search-field">
  <label>Where To?</label>
  <div class="search-input-wrapper">
      <input type="text" name="q" placeholder="Search destinations, cities, or attractions" id="location">
      <button class="btn-search" type="submit">Search</button>
  </div>
</form>

        </div>
    </section>
    
 <section id="destinations" class="destinations">
        <div class="container">
            <div class="section-header">
                <h2>Where to next?</h2>
                <p>Explore Kenya's most incredible destinations</p>
            </div>
            
            <div class="dest-grid">
                <div class="dest-card" onclick="openModal('maasai-mara')">
                    <div class="dest-image" style="background-image: url('https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800');">
                        <div class="dest-info">
                            <h3>Maasai Mara</h3>
                            <p>Witness the Great Migration and incredible wildlife</p>
                        </div>
                    </div>
                </div>
                
                <div class="dest-card" onclick="openModal('diani-beach')">
                    <div class="dest-image" style="background-image: url('images/diani.jpg');">
                        <div class="dest-info">
                            <h3>Diani Beach</h3>
                            <p>White sands and turquoise waters of the Indian Ocean</p>
                        </div>
                    </div>
                </div>
                
                <div class="dest-card" onclick="openModal('mount-kenya')">
                    <div class="dest-image" style="background-image: url('https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800');">
                        <div class="dest-info">
                            <h3>Mount Kenya</h3>
                            <p>Africa's second-highest peak with stunning glaciers</p>
                        </div>
                    </div>
                </div>
                
                <div class="dest-card" onclick="openModal('nairobi')">
                    <div class="dest-image" style="background-image: url('https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800');">
                        <div class="dest-info">
                            <h3>Nairobi</h3>
                            <p>Vibrant capital blending urban energy and wildlife</p>
                        </div>
                    </div>
                </div>
                
                <div class="dest-card" onclick="openModal('lake-nakuru')">
                    <div class="dest-image" style="background-image: url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800');">
                        <div class="dest-info">
                            <h3>Lake Nakuru</h3>
                            <p>Home to millions of pink flamingos</p>
                        </div>
                    </div>
                </div>
                
                <div class="dest-card" onclick="openModal('lamu-island')">
                    <div class="dest-image" style="background-image: url('https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800');">
                        <div class="dest-info">
                            <h3>Lamu Island</h3>
                            <p>Ancient Swahili culture meets pristine beaches</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Modal -->
    <div id="destinationModal" class="modal" onclick="closeModalOutside(event)">
        <div class="modal-content" onclick="event.stopPropagation()">
            <button class="close-btn" onclick="closeModal()">&times;</button>
            <div class="modal-header" id="modalHeader">
                <h2 class="modal-title" id="modalTitle"></h2>
            </div>
            <div class="modal-body" id="modalBody"></div>
        </div>
    </div>
<!-- Destination Guide -->
<section class="dest-guide" aria-labelledby="guide-title">
  <div class="dest-guide__overlay"></div>

  <div class="dest-guide__content">
    <div class="dest-guide__text">
      <h2 id="guide-title">Kenya Coastal Pocket Guide</h2>
      <p class="lead">Everything you need for a perfect coastal escape — beaches, eats, transport tips, and local experiences packed into one handy guide.</p>
      <div class="cta-row">
        <a class="btn-download" href="DestinationGuide.pdf" download aria-label="Download Kenya Coastal Pocket Guide (PDF)">
          <!-- inline download icon -->
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M5 20h14v-2H5v2zm7-18L5.33 9h3.67v6h6V9h3.67L12 2z"/>
          </svg>
          <span>Download Guide (PDF)</span>
        </a>

    </div>
    </div>

    <div class="dest-guide__image" aria-hidden="true"></div>
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
    
    <script>
        const destinationsData = {
            'maasai-mara': {
                title: 'Maasai Mara',
                image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
                description: 'The Maasai Mara National Reserve is one of Africa\'s greatest wildlife reserves. Known for the annual Great Migration, it offers unparalleled game viewing opportunities.',
                whatToDo: [
                    'Witness the Great Migration (July to October)',
                    'Hot air balloon safaris at sunrise',
                    'Game drives to spot the Big Five',
                    'Visit traditional Maasai villages',
                    'Bird watching with over 470 species',
                    'Bush walks and nature trails'
                ],
                where: 'Located in southwestern Kenya, approximately 270km from Nairobi. Accessible by road (5-6 hours) or domestic flights to multiple airstrips.',
                bestTime: 'July to October for the Great Migration, though wildlife viewing is excellent year-round. Dry season (June to October) offers the best game viewing.'
            },
            'diani-beach': {
                title: 'Diani Beach',
                image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
                description: 'Diani Beach is a pristine stretch of white sandy beach along the Indian Ocean coast, consistently ranked among Africa\'s best beaches.',
                whatToDo: [
                    'Snorkeling and diving in coral reefs',
                    'Kite surfing and water sports',
                    'Visit the Colobus Conservation Center',
                    'Explore Shimba Hills National Reserve',
                    'Dhow sailing at sunset',
                    'Deep-sea fishing',
                    'Relax at world-class beach resorts'
                ],
                where: 'Located 30km south of Mombasa on Kenya\'s south coast. Accessible via Moi International Airport in Mombasa or by road from Nairobi (8-9 hours).',
                bestTime: 'December to March and July to October for dry weather and calm seas. Perfect beach weather year-round.'
            },
            'mount-kenya': {
                title: 'Mount Kenya',
                image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800',
                description: 'Mount Kenya is Africa\'s second-highest mountain and a UNESCO World Heritage Site, featuring stunning glaciers, alpine vegetation, and diverse ecosystems.',
                whatToDo: [
                    'Summit trekking (Point Lenana - 4,985m)',
                    'Rock climbing and mountaineering',
                    'Wildlife viewing in the national park',
                    'Forest walks and bird watching',
                    'Visit the mountain\'s unique alpine zones',
                    'Photography of glaciers and peaks',
                    'Cultural tours to local communities'
                ],
                where: 'Located in central Kenya, about 150km north of Nairobi. Multiple access points including Naro Moru, Sirimon, and Chogoria routes.',
                bestTime: 'January to February and August to September for the clearest weather. Avoid April-May and November rainy seasons.'
            },
            'nairobi': {
                title: 'Nairobi',
                image: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800',
                description: 'Kenya\'s vibrant capital city offers a unique blend of urban sophistication, cultural attractions, and remarkable wildlife experiences within city limits.',
                whatToDo: [
                    'Visit Nairobi National Park - wildlife with city skyline',
                    'Giraffe Centre - feed Rothschild giraffes',
                    'David Sheldrick Wildlife Trust - baby elephants',
                    'Karen Blixen Museum',
                    'Bomas of Kenya for cultural performances',
                    'Nairobi National Museum',
                    'Explore vibrant markets and restaurants',
                    'Karura Forest for hiking and cycling'
                ],
                where: 'Kenya\'s capital city, served by Jomo Kenyatta International Airport. Central location makes it ideal as a starting point for safaris.',
                bestTime: 'Year-round destination. June to September and December to March offer the most pleasant weather.'
            },
            'lake-nakuru': {
                title: 'Lake Nakuru',
                image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
                description: 'Lake Nakuru National Park is famous for its massive flocks of flamingos that turn the lake\'s shores pink, along with excellent rhino viewing.',
                whatToDo: [
                    'Flamingo watching (seasonal, numbers vary)',
                    'Black and white rhino spotting',
                    'Game drives to see lions and leopards',
                    'Bird watching - over 450 species',
                    'Visit Baboon Cliff viewpoint',
                    'Explore Makalia Falls',
                    'Photography of wildlife and landscapes'
                ],
                where: 'Located in the Rift Valley, about 160km northwest of Nairobi. Easily accessible as a day trip or weekend getaway from Nairobi.',
                bestTime: 'June to March for best flamingo viewing. Dry seasons (July-October and January-March) offer excellent wildlife viewing.'
            },
            'lamu-island': {
                title: 'Lamu Island',
                image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
                description: 'Lamu is a UNESCO World Heritage Site and Kenya\'s oldest living town, preserving centuries of Swahili culture in its narrow streets and ancient buildings.',
                whatToDo: [
                    'Explore Lamu Old Town\'s narrow streets',
                    'Visit historic mosques and museums',
                    'Traditional dhow sailing',
                    'Relax on pristine Shela Beach',
                    'Experience Swahili culture and cuisine',
                    'Snorkeling and diving excursions',
                    'Visit nearby Manda Island',
                    'Attend the annual Lamu Cultural Festival'
                ],
                where: 'Located off Kenya\'s northern coast. Accessible by domestic flights to Manda Airport or boat from the mainland. No cars on the island - transportation by donkey or foot.',
                bestTime: 'July to March for dry weather. Avoid April-May rainy season. Visit in November for the Lamu Cultural Festival.'
            }
        };

        function openModal(destination) {
            const data = destinationsData[destination];
            const modal = document.getElementById('destinationModal');
            const modalHeader = document.getElementById('modalHeader');
            const modalTitle = document.getElementById('modalTitle');
            const modalBody = document.getElementById('modalBody');

            modalHeader.style.backgroundImage = `url('${data.image}')`;
            modalTitle.textContent = data.title;

            modalBody.innerHTML = `
                <div class="modal-section">
                    <h3>Overview</h3>
                    <p>${data.description}</p>
                </div>
                <div class="modal-section">
                    <h3>What to Do</h3>
                    <ul>
                        ${data.whatToDo.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-section">
                    <h3>How to Get There</h3>
                    <p>${data.where}</p>
                </div>
                <div class="modal-section">
                    <h3>Best Time to Visit</h3>
                    <p>${data.bestTime}</p>
                </div>
            `;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            const modal = document.getElementById('destinationModal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function closeModalOutside(event) {
            if (event.target.id === 'destinationModal') {
                closeModal();
            }
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
    </script>
</body>
 <?php include 'footer.php'; ?>
</html>