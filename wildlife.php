<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kenya Wildlife Destinations - Safari Adventures</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #1a4d2e;
            background: #e8f5e9;
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
            background: linear-gradient(rgba(27, 94, 32, 0.6), rgba(46, 125, 50, 0.7)), url('https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&h=500&fit=crop');
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
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"><path fill="%23e8f5e9" d="M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z"/></svg>');
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
            box-shadow: 0 10px 30px rgba(27, 94, 32, 0.1);
            margin-bottom: 50px;
            text-align: center;
            border-left: 5px solid #2e7d32;
        }

        .intro h2 {
            color: #1b5e20;
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
            box-shadow: 0 5px 20px rgba(27, 94, 32, 0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
            border-bottom: 4px solid #43a047;
        }

        .destination-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(27, 94, 32, 0.25);
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

        #masai-mara .card-image {
            background-image: url('images/maasaimara.webp');
        }

        #amboseli .card-image {
            background-image: url('images/amboseli.webp');
        }

        #tsavo .card-image {
            background-image: url('images/tsavo.webp');
        }

        #samburu .card-image {
            background-image: url('images/samburur.webp');
        }

        #lake-nakuru .card-image {
            background-image: url('images/Lake-Nakurusss.jpg');
        }

        #hell-gate .card-image {
            background-image: url('images/hellsgate.webp');
        }

        .card-content {
            padding: 25px;
        }

        .card-content h3 {
            color: #2e7d32;
            margin-bottom: 15px;
            font-size: 1.6em;
        }

        .card-content p {
            color: #3e4e3a;
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
            color: #2d4a2b;
        }

        .attractions li::before {
            content: '•';
            position: absolute;
            left: 8px;
            color: #43a047;
            font-size: 1.5em;
        }

        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #2e7d32;
            color: white;
            text-decoration: none;
            border-radius: 25px;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 1em;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3);
        }

        .btn:hover {
            background: #1b5e20;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(46, 125, 50, 0.4);
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
            border-top: 5px solid #2e7d32;
        }

        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .modal-content h2 {
            color: #1b5e20;
            margin-bottom: 20px;
        }

        .modal-content h3 {
            color: #388e3c;
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
            color: #43a047;
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
            color: #2e7d32;
        }

        footer {
            background: #1b5e20;
            color: white;
            text-align: center;
            padding: 30px 20px;
            margin-top: 50px;
        }

        footer p {
            margin: 5px 0;
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
        <h1>Kenya Wildlife Safari</h1>
        <p>Experience Africa's Most Spectacular Wildlife</p>
        <div class="wave"></div>
    </header>

    <div class="container">
        <div class="intro">
            <h2>Discover Kenya's Wildlife Wonders</h2>
            <p>Kenya is home to some of the world's most incredible wildlife and spectacular national parks. From the Great Migration in the Masai Mara to the elephants of Amboseli against the backdrop of Mount Kilimanjaro, Kenya offers unforgettable safari experiences with the Big Five and countless other species in their natural habitat.</p>
        </div>

        <div class="destinations-grid">
            <div id="masai-mara" class="destination-card" onclick="openModal('masai-mara')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Masai Mara National Reserve</h3>
                    <p>World-famous for the Great Migration, the Masai Mara is Kenya's premier wildlife destination with exceptional year-round game viewing.</p>
                    <ul class="attractions">
                        <li>The Great Migration (July-October)</li>
                        <li>Big Five sightings</li>
                        <li>Hot air balloon safaris</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="amboseli" class="destination-card" onclick="openModal('amboseli')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Amboseli National Park</h3>
                    <p>Famous for large elephant herds and stunning views of Mount Kilimanjaro, Amboseli offers incredible photography opportunities.</p>
                    <ul class="attractions">
                        <li>Elephant research center</li>
                        <li>Mount Kilimanjaro views</li>
                        <li>Diverse bird species</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="tsavo" class="destination-card" onclick="openModal('tsavo')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Tsavo National Parks</h3>
                    <p>Kenya's largest national park system, divided into Tsavo East and West, known for red elephants and diverse landscapes.</p>
                    <ul class="attractions">
                        <li>Red elephants of Tsavo</li>
                        <li>Mzima Springs</li>
                        <li>Lugard Falls</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="samburu" class="destination-card" onclick="openModal('samburu')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Samburu National Reserve</h3>
                    <p>A unique semi-arid reserve in northern Kenya, home to rare species found nowhere else in the country.</p>
                    <ul class="attractions">
                        <li>Special Five species</li>
                        <li>Ewaso Ng'iro River</li>
                        <li>Samburu culture experiences</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="lake-nakuru" class="destination-card" onclick="openModal('lake-nakuru')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Lake Nakuru National Park</h3>
                    <p>A birdwatcher's paradise famous for flamingos, and home to both black and white rhinos in a beautiful lake setting.</p>
                    <ul class="attractions">
                        <li>Flamingo populations</li>
                        <li>Rhino sanctuary</li>
                        <li>Leopard sightings</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="hell-gate" class="destination-card" onclick="openModal('hell-gate')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Hell's Gate National Park</h3>
                    <p>Unique for allowing walking and cycling safaris, Hell's Gate features dramatic landscapes and geothermal activity.</p>
                    <ul class="attractions">
                        <li>Walking & cycling safaris</li>
                        <li>Rock climbing opportunities</li>
                        <li>Geothermal features</li>
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

    <footer>
        <p>&copy; 2025 Kenya Wildlife Destinations | Experience the Wild Heart of Africa</p>
        <p>Discover Nature | Witness Wildlife | Create Memories</p>
    </footer>

    <script>
        function goBack() {
  window.history.back();
}

        const destinationDetails = {
            'masai-mara': {
                title: 'Masai Mara National Reserve',
                content: `
                    <h2>Masai Mara National Reserve - The Greatest Wildlife Show on Earth</h2>
                    <p><strong>Location:</strong> Southwestern Kenya, bordering Tanzania's Serengeti</p>
                    <p>The Masai Mara is Kenya's most celebrated game reserve, offering an unparalleled safari experience with the highest concentration of wildlife in Africa.</p>
                    
                    <h3>Wildlife Highlights:</h3>
                    <ul>
                        <li>The Great Wildebeest Migration (July to October)</li>
                        <li>Big Five - lion, leopard, elephant, rhino, buffalo</li>
                        <li>Large prides of lions and cheetah families</li>
                        <li>Over 470 bird species</li>
                        <li>Hippopotamus and crocodiles in the Mara River</li>
                    </ul>
                    
                    <h3>Best Experiences:</h3>
                    <ul>
                        <li>Hot air balloon safaris at sunrise</li>
                        <li>Witness river crossings during migration</li>
                        <li>Visit Maasai villages for cultural experiences</li>
                        <li>Game drives morning and evening</li>
                        <li>Bush picnics in the wilderness</li>
                    </ul>
                    
                    <h3>Best Time to Visit:</h3>
                    <p>Year-round destination, but July to October for the Great Migration. January to February for calving season.</p>
                    
                    <h3>Size:</h3>
                    <p>1,510 square kilometers of pristine savannah grassland.</p>
                `
            },
            'amboseli': {
                title: 'Amboseli National Park',
                content: `
                    <h2>Amboseli National Park - Land of Giants</h2>
                    <p><strong>Location:</strong> Southern Kenya, at the foot of Mount Kilimanjaro</p>
                    <p>Amboseli is famous for its large elephant herds and spectacular views of Africa's highest mountain, Mount Kilimanjaro.</p>
                    
                    <h3>Wildlife Highlights:</h3>
                    <ul>
                        <li>Over 1,600 elephants - some of Africa's largest tuskers</li>
                        <li>Big Five viewing opportunities</li>
                        <li>Large populations of wildebeest, zebra, and giraffe</li>
                        <li>Over 400 bird species including pelicans and kingfishers</li>
                        <li>Predators including lions, cheetahs, and hyenas</li>
                    </ul>
                    
                    <h3>Unique Features:</h3>
                    <ul>
                        <li>Observation Hill for panoramic views</li>
                        <li>Amboseli Elephant Research Project (longest-running study)</li>
                        <li>Swamps fed by Kilimanjaro's melting snow</li>
                        <li>Maasai cultural encounters</li>
                        <li>Outstanding photography opportunities</li>
                    </ul>
                    
                    <h3>Best Time to Visit:</h3>
                    <p>June to October (dry season) and January to February for clear Kilimanjaro views.</p>
                    
                    <h3>Size:</h3>
                    <p>392 square kilometers of diverse habitats including dried-up lake bed, wetlands, and savannah.</p>
                `
            },
            'tsavo': {
                title: 'Tsavo National Parks',
                content: `
                    <h2>Tsavo National Parks - The Land of the Red Elephants</h2>
                    <p><strong>Location:</strong> Southeastern Kenya, split into Tsavo East and Tsavo West</p>
                    <p>Together forming Kenya's largest national park, Tsavo offers vast wilderness areas with diverse landscapes and abundant wildlife.</p>
                    
                    <h3>Wildlife Highlights:</h3>
                    <ul>
                        <li>Large elephant herds covered in red dust</li>
                        <li>Big Five present in both parks</li>
                        <li>Man-eating lions of Tsavo (historical)</li>
                        <li>Black rhinos in sanctuaries</li>
                        <li>Over 500 bird species</li>
                    </ul>
                    
                    <h3>Tsavo West Attractions:</h3>
                    <ul>
                        <li>Mzima Springs - crystal-clear pools with hippos and crocodiles</li>
                        <li>Shetani lava flows</li>
                        <li>Chaimu Crater</li>
                        <li>Ngulia Rhino Sanctuary</li>
                        <li>Scenic volcanic hills and rock formations</li>
                    </ul>
                    
                    <h3>Tsavo East Attractions:</h3>
                    <ul>
                        <li>Lugard Falls on the Galana River</li>
                        <li>Mudanda Rock - natural water hole viewpoint</li>
                        <li>Yatta Plateau - world's longest lava flow</li>
                        <li>Aruba Dam - excellent wildlife viewing</li>
                    </ul>
                    
                    <h3>Size:</h3>
                    <p>Combined 22,000 square kilometers - one of the world's largest national parks.</p>
                `
            },
            'samburu': {
                title: 'Samburu National Reserve',
                content: `
                    <h2>Samburu National Reserve - The Remote Wilderness</h2>
                    <p><strong>Location:</strong> Northern Kenya, along the Ewaso Ng'iro River</p>
                    <p>Samburu offers a unique safari experience with rare species found only in northern Kenya and a dramatically different landscape from southern parks.</p>
                    
                    <h3>The Samburu Special Five:</h3>
                    <ul>
                        <li>Grevy's zebra (largest zebra species)</li>
                        <li>Reticulated giraffe (most beautiful giraffe)</li>
                        <li>Beisa oryx (long-horned antelope)</li>
                        <li>Gerenuk (long-necked antelope)</li>
                        <li>Somali ostrich (blue-legged ostrich)</li>
                    </ul>
                    
                    <h3>Other Wildlife:</h3>
                    <ul>
                        <li>Large elephant populations</li>
                        <li>Lions and leopards (including tree-climbing)</li>
                        <li>Cheetahs hunting on open plains</li>
                        <li>Over 450 bird species</li>
                        <li>Crocodiles in the Ewaso Ng'iro River</li>
                    </ul>
                    
                    <h3>Cultural Experiences:</h3>
                    <ul>
                        <li>Visit Samburu villages and learn about warrior culture</li>
                        <li>Traditional dancing and ceremonies</li>
                        <li>Beadwork and craft demonstrations</li>
                    </ul>
                    
                    <h3>Best Time to Visit:</h3>
                    <p>June to October (dry season) for concentrated wildlife around the river.</p>
                `
            },
            'lake-nakuru': {
                title: 'Lake Nakuru National Park',
                content: `
                    <h2>Lake Nakuru National Park - The Pink Paradise</h2>
                    <p><strong>Location:</strong> Central Kenya, part of the Great Rift Valley</p>
                    <p>Lake Nakuru is one of Kenya's finest national parks, famous for its flamingos and serving as a rhino sanctuary.</p>
                    
                    <h3>Bird Life:</h3>
                    <ul>
                        <li>Millions of flamingos (when conditions are right)</li>
                        <li>Over 450 bird species recorded</li>
                        <li>Pelicans, cormorants, and kingfishers</li>
                        <li>African fish eagles</li>
                        <li>Goliath herons and hamerkops</li>
                    </ul>
                    
                    <h3>Wildlife Highlights:</h3>
                    <ul>
                        <li>Black and white rhinos (over 100 individuals)</li>
                        <li>Rothschild's giraffe population</li>
                        <li>Lions including tree-climbing lions</li>
                        <li>Leopards (frequently spotted)</li>
                        <li>Waterbucks, impalas, and buffalo</li>
                    </ul>
                    
                    <h3>Scenic Attractions:</h3>
                    <ul>
                        <li>Baboon Cliff viewpoint overlooking the lake</li>
                        <li>Makalia Falls waterfall</li>
                        <li>Euphorbia forest</li>
                        <li>Rocky escarpments and acacia woodlands</li>
                    </ul>
                    
                    <h3>Best Time to Visit:</h3>
                    <p>Year-round destination. Flamingo numbers vary with water levels.</p>
                `
            },
            'hell-gate': {
                title: "Hell's Gate National Park",
                content: `
                    <h2>Hell's Gate National Park - Walk on the Wild Side</h2>
                    <p><strong>Location:</strong> Near Lake Naivasha in the Great Rift Valley</p>
                    <p>Hell's Gate is unique among Kenyan parks for allowing visitors to walk and cycle among wildlife, offering an adventurous safari experience.</p>
                    
                    <h3>Wildlife (Safe to Walk Among):</h3>
                    <ul>
                        <li>Zebras, giraffes, and gazelles</li>
                        <li>Warthogs and baboons</li>
                        <li>Buffalo (in designated areas)</li>
                        <li>Over 100 bird species including Verreaux's eagles</li>
                        <li>Klipspringers on rocky outcrops</li>
                    </ul>
                    
                    <h3>Unique Features:</h3>
                    <ul>
                        <li>Walking and cycling safaris without a guide</li>
                        <li>Rock climbing on Fischer's Tower and Central Tower</li>
                        <li>Hell's Gate Gorge - dramatic narrow canyon</li>
                        <li>Geothermal power stations and hot springs</li>
                        <li>Inspiration for Disney's "The Lion King" scenery</li>
                    </ul>
                    
                    <h3>Activities:</h3>
                    <ul>
                        <li>Bike rentals at the gate</li>
                        <li>Guided gorge walks</li>
                        <li>Rock climbing expeditions</li>
                        <li>Camping in the park</li>
                        <li>Photography of dramatic landscapes</li>
                    </ul>
                    
                    <h3>Best Time to Visit:</h3>
                    <p>Year-round destination. Mornings and late afternoons are cooler for walking and cycling.</p>
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