<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kenya Coastal Destinations - Discover Paradise</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background: #f0f8ff;
        }
        .back-btn {
     /* Dark blue */
  color: #0F445F;
  padding: 8px 8px;
  border: none;
  border-radius: 8px;
  font-size: 10px;
  cursor: pointer;
  transition: 0.3s ease;
}

.back-btn:hover {
  background: #11989B;      /* Accent */
}
        header {
            background: linear-gradient(rgba(0, 119, 182, 0.7), rgba(0, 150, 199, 0.8)), url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&h=500&fit=crop');
            background-size: cover;
            background-position: center;
            height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
        }

        .wave {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100px;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"><path fill="%23f0f8ff" d="M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z"/></svg>');
            background-size: cover;
            animation: wave 10s linear infinite;
        }

        @keyframes wave {
            0% { background-position: 0 0; }
            100% { background-position: 1200px 0; }
        }

        header h1 {
            font-size: 3.5em;
            margin-bottom: 20px;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
            animation: fadeInDown 1s ease-out;
        }

        header p {
            font-size: 1.3em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            animation: fadeInUp 1s ease-out 0.3s both;
        }

        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .intro {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,119,182,0.1);
            margin-bottom: 50px;
            text-align: center;
            border-left: 5px solid #0077b6;
        }

        .intro h2 {
            color: #0077b6;
            margin-bottom: 20px;
            font-size: 2.2em;
        }

        .destinations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 30px;
            margin-bottom: 50px;
        }

        .destination-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0,119,182,0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
            border-bottom: 4px solid #00b4d8;
        }

        .destination-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(0,119,182,0.25);
        }

        .card-image {
            width: 100%;
            height: 250px;
            background-size: cover;
            background-position: center;
            position: relative;
            overflow: hidden;
        }

        .card-image::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
            transform: translateX(-100%);
            transition: transform 0.6s;
        }

        .destination-card:hover .card-image::after {
            transform: translateX(100%);
        }

        #diani .card-image {
            background-image: url('images/diani.jpg');
        }

        #mombasa .card-image {
            background-image: url('images/mombasa.jpeg');
        }

        #malindi .card-image {
            background-image: url('images/malindi.webp');
        }

        #watamu .card-image {
            background-image: url('images/watamu.webp');
        }

        #lamu .card-image {
            background-image: url('images/lamu.webp');
        }

        #kilifi .card-image {
            background-image: url('images/kilifi.webp');
        }

        .card-content {
            padding: 25px;
        }

        .card-content h3 {
            color: #0077b6;
            margin-bottom: 15px;
            font-size: 1.6em;
        }

        .card-content p {
            color: #555;
            margin-bottom: 15px;
        }

        .attractions {
            list-style: none;
            margin: 15px 0;
        }

        .attractions li {
            padding: 8px 0;
            padding-left: 25px;
            position: relative;
            color: #444;
        }

        .attractions li::before {
            content: '•';
            position: absolute;
            left: 8px;
            color: #00b4d8;
            font-size: 1.5em;
        }

        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #0077b6;
            color: white;
            text-decoration: none;
            border-radius: 25px;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 1em;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0, 119, 182, 0.3);
        }

        .btn:hover {
            background: #005f8f;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 119, 182, 0.4);
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 1000;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .modal-content {
            background: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            animation: slideIn 0.3s;
            border-top: 5px solid #0077b6;
        }

        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .modal-content h2 {
            color: #0077b6;
            margin-bottom: 20px;
        }

        .modal-content h3 {
            color: #00b4d8;
            margin-top: 20px;
            margin-bottom: 10px;
        }

        .modal-content ul {
            list-style: none;
            padding-left: 0;
        }

        .modal-content ul li {
            padding: 5px 0;
            padding-left: 25px;
            position: relative;
        }

        .modal-content ul li::before {
            content: '•';
            position: absolute;
            left: 8px;
            color: #00b4d8;
            font-size: 1.3em;
        }

        .close {
            position: absolute;
            top: 20px;
            right: 25px;
            font-size: 30px;
            cursor: pointer;
            color: #999;
            transition: color 0.3s;
        }

        .close:hover {
            color: #0077b6;
        }

        @media (max-width: 768px) {
            header h1 {
                font-size: 2.5em;
            }
            
            .destinations-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <button class="back-btn" onclick="goBack()">← Back</button>
    <header>
        <h1>Kenya's Coastal Paradise</h1>
        <p>Discover the Magic of the Indian Ocean</p>
        <div class="wave"></div>
    </header>

    <div class="container">
        <div class="intro">
            <h2>Welcome to Kenya's Stunning Coast</h2>
            <p>Experience pristine white-sand beaches, crystal-clear turquoise waters, and vibrant coral reefs. Kenya's coastline stretches over 480 kilometers along the Indian Ocean, offering unforgettable tropical adventures, rich Swahili culture, and world-class marine parks.</p>
        </div>

        <div class="destinations-grid">
            <div id="diani" class="destination-card" onclick="openModal('diani')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Diani Beach</h3>
                    <p>Voted Africa's leading beach destination, Diani Beach features powdery white sand and warm waters perfect for swimming and water sports.</p>
                    <ul class="attractions">
                        <li>Kite surfing & diving</li>
                        <li>Coral reefs snorkeling</li>
                        <li>Colobus monkey sanctuary</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="mombasa" class="destination-card" onclick="openModal('mombasa')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Mombasa</h3>
                    <p>Kenya's second-largest city blends historical charm with modern beach resorts. Explore Fort Jesus, old town, and vibrant coastal culture.</p>
                    <ul class="attractions">
                        <li>Fort Jesus UNESCO site</li>
                        <li>Old Town architecture</li>
                        <li>Nyali & Bamburi beaches</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="malindi" class="destination-card" onclick="openModal('malindi')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Malindi</h3>
                    <p>A historic coastal town with Italian influences, Malindi offers marine parks, pristine beaches, and the famous Vasco da Gama Pillar.</p>
                    <ul class="attractions">
                        <li>Malindi Marine Park</li>
                        <li>Gede Ruins</li>
                        <li>Deep-sea fishing</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="watamu" class="destination-card" onclick="openModal('watamu')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Watamu</h3>
                    <p>A marine paradise known for turtle conservation, incredible coral gardens, and some of the best snorkeling spots in East Africa.</p>
                    <ul class="attractions">
                        <li>Watamu Marine Park</li>
                        <li>Turtle conservation center</li>
                        <li>Bio-Ken Snake Farm</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="lamu" class="destination-card" onclick="openModal('lamu')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Lamu Island</h3>
                    <p>A UNESCO World Heritage Site, Lamu is Kenya's oldest living town with narrow streets, traditional dhows, and authentic Swahili culture.</p>
                    <ul class="attractions">
                        <li>Car-free island</li>
                        <li>Traditional dhow sailing</li>
                        <li>Swahili architecture</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="kilifi" class="destination-card" onclick="openModal('kilifi')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Kilifi</h3>
                    <p>A tranquil coastal town with a stunning creek, perfect for water sports, fishing, and enjoying spectacular sunsets over the Indian Ocean.</p>
                    <ul class="attractions">
                        <li>Kilifi Creek</li>
                        <li>Mnarani Ruins</li>
                        <li>Water sports hub</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>
        </div>
    </div>

    <div id="modal" class="modal" onclick="closeModal(event)">
        <div class="modal-content" onclick="event.stopPropagation()">
            <span class="close" onclick="closeModal()">&times;</span>
            <div id="modal-body"></div>
        </div>
    </div>
    <script>
        function goBack() {
            window.history.back();
        }
        const destinationDetails = {
            diani: {
                title: 'Diani Beach',
                content: `
                    <h2>Diani Beach - Africa's Premier Beach Destination</h2>
                    <p><strong>Location:</strong> 30 km south of Mombasa</p>
                    <p>Diani Beach consistently ranks as one of the world's best beaches with its stunning 17-kilometer stretch of pristine white sand bordered by lush coastal forest and the warm Indian Ocean.</p>
                    
                    <h3>Top Activities:</h3>
                    <ul>
                        <li>Kite surfing and windsurfing</li>
                        <li>Scuba diving at Kisite-Mpunguti Marine Park</li>
                        <li>Visit Colobus Conservation for monkey encounters</li>
                        <li>Camel rides along the beach</li>
                        <li>Shimba Hills National Reserve day trips</li>
                    </ul>
                    
                    <h3>Best Time to Visit:</h3>
                    <p>Year-round destination, but particularly great from December to March and July to October for perfect beach weather.</p>
                    
                    <h3>Getting There:</h3>
                    <p>Accessible via Ukunda Airstrip (15 min) or road from Mombasa (1 hour).</p>
                `
            },
            mombasa: {
                title: 'Mombasa',
                content: `
                    <h2>Mombasa - The Gateway to Kenya's Coast</h2>
                    <p><strong>Location:</strong> Kenya's second-largest city on the coast</p>
                    <p>Mombasa is a vibrant port city with over 1,000 years of history, blending Arab, Portuguese, and British influences with authentic Swahili culture.</p>
                    
                    <h3>Must-See Attractions:</h3>
                    <ul>
                        <li>Fort Jesus - UNESCO World Heritage Site (built 1593)</li>
                        <li>Old Town with narrow streets and Swahili architecture</li>
                        <li>Nyali, Bamburi, and Shanzu beaches</li>
                        <li>Haller Park wildlife sanctuary</li>
                        <li>Mamba Village crocodile farm</li>
                    </ul>
                    
                    <h3>Cultural Experiences:</h3>
                    <p>Explore spice markets, taste Swahili cuisine, and witness the call to prayer echoing across the Old Town's historic mosques.</p>
                    
                    <h3>Shopping:</h3>
                    <p>Visit local markets for Maasai crafts, kikoi fabrics, and beautiful woodcarvings.</p>
                `
            },
            malindi: {
                title: 'Malindi',
                content: `
                    <h2>Malindi - Where History Meets Marine Beauty</h2>
                    <p><strong>Location:</strong> 120 km north of Mombasa</p>
                    <p>Malindi has been a trading hub for centuries and features a unique blend of African, Arab, and Italian cultures. It's famous for its marine life and historical significance.</p>
                    
                    <h3>Key Highlights:</h3>
                    <ul>
                        <li>Malindi Marine National Park - Kenya's first marine park</li>
                        <li>Vasco da Gama Pillar (erected in 1498)</li>
                        <li>Gede Ruins - mysterious Swahili town ruins</li>
                        <li>World-class deep-sea fishing</li>
                        <li>Nearby Arabuko Sokoke Forest</li>
                    </ul>
                    
                    <h3>Marine Activities:</h3>
                    <p>The marine park offers spectacular glass-bottom boat tours, snorkeling among colorful coral gardens, and dolphin watching.</p>
                    
                    <h3>Italian Quarter:</h3>
                    <p>Malindi has a significant Italian community, reflected in authentic Italian restaurants and gelato shops along the waterfront.</p>
                `
            },
            watamu: {
                title: 'Watamu',
                content: `
                    <h2>Watamu - Marine Paradise & Turtle Haven</h2>
                    <p><strong>Location:</strong> 15 km south of Malindi</p>
                    <p>Watamu is a small beach resort town renowned for its marine biodiversity, coral reefs, and sea turtle conservation efforts.</p>
                    
                    <h3>Marine Wonders:</h3>
                    <ul>
                        <li>Watamu Marine National Park & Reserve</li>
                        <li>Local Ocean Conservation - turtle rescue center</li>
                        <li>Three pristine bays with coral gardens</li>
                        <li>Whale shark season (October to March)</li>
                        <li>World-class snorkeling and diving</li>
                    </ul>
                    
                    <h3>Eco-Tourism:</h3>
                    <p>Visit Bio-Ken Snake Farm, explore Arabuko Sokoke Forest for rare bird species, and participate in turtle conservation programs.</p>
                    
                    <h3>Best For:</h3>
                    <p>Nature lovers, divers, and those seeking a peaceful, eco-friendly beach experience away from crowds.</p>
                `
            },
            lamu: {
                title: 'Lamu Island',
                content: `
                    <h2>Lamu Island - Step Back in Time</h2>
                    <p><strong>Location:</strong> Lamu Archipelago, northern Kenya coast</p>
                    <p>Lamu Old Town is Kenya's oldest continuously inhabited settlement and a UNESCO World Heritage Site, preserving Swahili culture dating back to the 12th century.</p>
                    
                    <h3>Unique Features:</h3>
                    <ul>
                        <li>No cars - only donkeys and dhows for transport</li>
                        <li>Traditional dhow sailing experiences</li>
                        <li>Stunning Swahili architecture with carved doors</li>
                        <li>Ancient mosques and cultural heritage</li>
                        <li>Pristine beaches at Shela village</li>
                    </ul>
                    
                    <h3>Experiences:</h3>
                    <p>Take a sunset dhow cruise, explore narrow alleyways, visit the Lamu Museum, enjoy fresh seafood, and immerse yourself in authentic Swahili life.</p>
                    
                    <h3>Getting There:</h3>
                    <p>Accessible by air from Nairobi or Mombasa, followed by a boat ride to the island.</p>
                `
            },
            kilifi: {
                title: 'Kilifi',
                content: `
                    <h2>Kilifi - Creek Town Charm</h2>
                    <p><strong>Location:</strong> 56 km north of Mombasa</p>
                    <p>Kilifi is a laid-back coastal town built around the stunning Kilifi Creek, offering a perfect blend of beach relaxation and water sports activities.</p>
                    
                    <h3>Attractions:</h3>
                    <ul>
                        <li>Kilifi Creek - perfect for kayaking and paddleboarding</li>
                        <li>Mnarani Ruins - 14th-century Swahili settlement</li>
                        <li>Bofa Beach and other hidden coves</li>
                        <li>Fishing and sailing adventures</li>
                        <li>Mangrove forests and nature walks</li>
                    </ul>
                    
                    <h3>Activities:</h3>
                    <p>Kilifi is known for its vibrant water sports scene, including windsurfing, kitesurfing, and sailing. The creek offers calm waters ideal for beginners.</p>
                    
                    <h3>Culture:</h3>
                    <p>Visit the Mnarani Ruins and Snake Park, explore local artisan workshops, and enjoy the relaxed coastal lifestyle with stunning creek-side restaurants.</p>
                `
            }
        };

        function openModal(destination) {
            const modal = document.getElementById('modal');
            const modalBody = document.getElementById('modal-body');
            const details = destinationDetails[destination];
            
            modalBody.innerHTML = details.content;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeModal(event) {
            if (!event || event.target.id === 'modal') {
                const modal = document.getElementById('modal');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    </script>
</body>
</html>