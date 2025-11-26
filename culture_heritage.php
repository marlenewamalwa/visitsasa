<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kenya Culture & Heritage - Discover Our Rich Legacy</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #5d4037;
            background: #fef5e7;
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
            background: linear-gradient(rgba(191, 54, 12, 0.7), rgba(230, 81, 0, 0.7)), url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&h=500&fit=crop');
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
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"><path fill="%23fef5e7" d="M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z"/></svg>');
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
            box-shadow: 0 10px 30px rgba(191, 54, 12, 0.1);
            margin-bottom: 50px;
            text-align: center;
            border-left: 5px solid #d84315;
        }

        .intro h2 {
            color: #bf360c;
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
            box-shadow: 0 5px 20px rgba(191, 54, 12, 0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
            border-bottom: 4px solid #ff6f00;
        }

        .destination-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(191, 54, 12, 0.25);
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

        #lamu .card-image {
            background-image: url('https://images.unsplash.com/photo-1609198092357-8e14f2c4b89c?w=600&h=400&fit=crop');
        }

        #gedi .card-image {
            background-image: url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=400&fit=crop');
        }

        #great-rift .card-image {
            background-image: url('https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&h=400&fit=crop');
        }

        #fort-jesus .card-image {
            background-image: url('https://images.unsplash.com/photo-1555881603-f4991e5b6e4f?w=600&h=400&fit=crop');
        }

        #bomas .card-image {
            background-image: url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=400&fit=crop');
        }

        #nairobi-museum .card-image {
            background-image: url('https://images.unsplash.com/photo-1566127444979-b3d2b767e560?w=600&h=400&fit=crop');
        }

        .card-content {
            padding: 25px;
        }

        .card-content h3 {
            color: #d84315;
            margin-bottom: 15px;
            font-size: 1.6em;
        }

        .card-content p {
            color: #5d4037;
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
            color: #6d4c41;
        }

        .attractions li::before {
            content: '•';
            position: absolute;
            left: 8px;
            color: #ff6f00;
            font-size: 1.5em;
        }

        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #d84315;
            color: white;
            text-decoration: none;
            border-radius: 25px;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 1em;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(216, 67, 21, 0.3);
        }

        .btn:hover {
            background: #bf360c;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(216, 67, 21, 0.4);
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
            border-top: 5px solid #d84315;
        }

        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .modal-content h2 {
            color: #bf360c;
            margin-bottom: 20px;
        }

        .modal-content h3 {
            color: #d84315;
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
            color: #ff6f00;
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
            color: #d84315;
        }

        footer {
            background: #bf360c;
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
        <h1>Kenya Culture & Heritage</h1>
        <p>Discover Our Rich Legacy and Living Traditions</p>
        <div class="wave"></div>
    </header>

    <div class="container">
        <div class="intro">
            <h2>Experience Kenya's Cultural Treasures</h2>
            <p>Kenya's cultural heritage is a vibrant tapestry woven from over 40 ethnic communities, ancient Swahili civilizations, and significant archaeological sites. From UNESCO World Heritage coastal towns to prehistoric human origins, Kenya offers a journey through time that celebrates our diverse traditions, languages, music, art, and the enduring spirit of our people.</p>
        </div>

        <div class="destinations-grid">
            <div id="lamu" class="destination-card" onclick="openModal('lamu')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Lamu Old Town</h3>
                    <p>Kenya's oldest living Swahili settlement and UNESCO World Heritage Site. A timeless island where donkeys outnumber cars and tradition thrives.</p>
                    <ul class="attractions">
                        <li>Ancient Swahili architecture</li>
                        <li>Traditional dhow sailing</li>
                        <li>Lamu Cultural Festival</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="fort-jesus" class="destination-card" onclick="openModal('fort-jesus')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Fort Jesus, Mombasa</h3>
                    <p>16th-century Portuguese fortress, UNESCO World Heritage Site showcasing coastal military architecture and East African trade history.</p>
                    <ul class="attractions">
                        <li>Portuguese military architecture</li>
                        <li>Coastal trade history exhibits</li>
                        <li>Panoramic ocean views</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="gedi" class="destination-card" onclick="openModal('gedi')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Gedi Ruins</h3>
                    <p>Mysterious 13th-century Swahili town hidden in coastal forest. Stone houses, mosques, and palaces reveal a sophisticated medieval civilization.</p>
                    <ul class="attractions">
                        <li>Medieval Swahili architecture</li>
                        <li>Great Mosque and Palace</li>
                        <li>Archaeological mysteries</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="great-rift" class="destination-card" onclick="openModal('great-rift')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Cradle of Humankind Sites</h3>
                    <p>Lake Turkana region archaeological sites where some of the oldest human fossils have been discovered, revealing our evolutionary journey.</p>
                    <ul class="attractions">
                        <li>Ancient human fossil sites</li>
                        <li>Koobi Fora Museum</li>
                        <li>Prehistoric tool discoveries</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="bomas" class="destination-card" onclick="openModal('bomas')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Bomas of Kenya</h3>
                    <p>Living cultural village showcasing traditional homesteads from Kenya's diverse ethnic communities with daily dance performances.</p>
                    <ul class="attractions">
                        <li>Traditional homesteads from 40+ tribes</li>
                        <li>Daily cultural performances</li>
                        <li>Traditional crafts demonstrations</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="nairobi-museum" class="destination-card" onclick="openModal('nairobi-museum')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Nairobi National Museum</h3>
                    <p>Kenya's flagship museum featuring extensive collections on natural history, culture, contemporary art, and human evolution.</p>
                    <ul class="attractions">
                        <li>Human evolution exhibits</li>
                        <li>Contemporary Kenyan art</li>
                        <li>Cultural heritage galleries</li>
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
        <p>&copy; 2025 Kenya Culture & Heritage | Preserving Our Legacy</p>
        <p>Celebrate Diversity | Honor Tradition | Embrace Heritage</p>
    </footer>

    <script>
        function goBack() {
            window.history.back();
        }
        const destinationDetails = {
            'lamu': {
                title: 'Lamu Old Town',
                content: `
                    <h2>Lamu Old Town - Timeless Swahili Heritage</h2>
                    <p><strong>UNESCO World Heritage Site since 2001</strong></p>
                    <p>Lamu Old Town is Kenya's oldest and best-preserved Swahili settlement, continuously inhabited for over 700 years. This enchanting island town offers an authentic glimpse into traditional coastal life where time seems to stand still.</p>
                    
                    <h3>Architectural Heritage:</h3>
                    <ul>
                        <li>Narrow winding streets and alleys</li>
                        <li>Traditional Swahili houses with carved wooden doors</li>
                        <li>Coral stone and mangrove pole construction</li>
                        <li>Inner courtyards and rooftop terraces</li>
                        <li>No motorized vehicles - donkeys and dhows for transport</li>
                    </ul>
                    
                    <h3>Key Historic Sites:</h3>
                    <ul>
                        <li>Lamu Fort - Built by Sultan of Pate in early 1800s</li>
                        <li>Lamu Museum - Swahili culture and maritime history</li>
                        <li>German Post Office Museum - Colonial era building</li>
                        <li>Riyadha Mosque - Important Islamic pilgrimage site</li>
                        <li>Swahili House Museum - Traditional home interior</li>
                    </ul>
                    
                    <h3>Cultural Experiences:</h3>
                    <ul>
                        <li>Traditional dhow sailing trips</li>
                        <li>Swahili cooking classes</li>
                        <li>Henna painting demonstrations</li>
                        <li>Traditional craftsmen workshops</li>
                        <li>Guided walking tours through old town</li>
                    </ul>
                    
                    <h3>Annual Festivals:</h3>
                    <ul>
                        <li>Lamu Cultural Festival (November) - dhow races, traditional dances</li>
                        <li>Maulidi Festival - Islamic celebration of Prophet's birthday</li>
                        <li>Traditional donkey races</li>
                        <li>Swimming competitions</li>
                    </ul>
                    
                    <h3>Swahili Culture:</h3>
                    <ul>
                        <li>Blend of African, Arab, Persian, and Indian influences</li>
                        <li>Traditional Swahili cuisine - biriyani, pilau, samosas</li>
                        <li>Islamic architectural elements</li>
                        <li>Traditional dress - kangas and buibuis</li>
                        <li>Swahili poetry and music traditions</li>
                    </ul>
                    
                    <h3>Best Time to Visit:</h3>
                    <p>Year-round destination. November for the Cultural Festival. Cooler months (June-October) are most comfortable for walking tours.</p>
                `
            },
            'fort-jesus': {
                title: 'Fort Jesus, Mombasa',
                content: `
                    <h2>Fort Jesus - Guardian of the Coast</h2>
                    <p><strong>UNESCO World Heritage Site since 2011</strong></p>
                    <p>Built by the Portuguese in 1593-1596, Fort Jesus is one of the finest examples of 16th-century Portuguese military architecture. It tells the dramatic story of coastal East Africa's cultural exchange between Europe, Asia, and Africa.</p>
                    
                    <h3>Historical Significance:</h3>
                    <ul>
                        <li>Designed by Italian architect Giovanni Battista Cairati</li>
                        <li>Changed hands nine times between Portuguese and Omani Arabs</li>
                        <li>Famous siege of 1696-1698 lasted 33 months</li>
                        <li>British colonial prison in early 20th century</li>
                        <li>National monument since 1958</li>
                    </ul>
                    
                    <h3>Architectural Features:</h3>
                    <ul>
                        <li>Man-shaped design when viewed from above</li>
                        <li>Massive coral stone walls up to 15 meters high</li>
                        <li>Portuguese bastions named after Christian saints</li>
                        <li>Original gun emplacements and battlements</li>
                        <li>Captain's house with Omani additions</li>
                    </ul>
                    
                    <h3>Museum Collections:</h3>
                    <ul>
                        <li>Portuguese ceramics and artifacts</li>
                        <li>Omani jewelry and weapons</li>
                        <li>Finds from shipwrecks including Santo Antonio de Tanna</li>
                        <li>Traditional Swahili pottery</li>
                        <li>Historical documents and photographs</li>
                    </ul>
                    
                    <h3>What to See:</h3>
                    <ul>
                        <li>The Chapel - Now houses museum exhibits</li>
                        <li>Portuguese barracks and gun platforms</li>
                        <li>Omani Arab house with ornate plasterwork</li>
                        <li>Prison cells from British era</li>
                        <li>Panoramic views from battlements</li>
                        <li>Archaeological excavation sites</li>
                    </ul>
                    
                    <h3>Cultural Programs:</h3>
                    <ul>
                        <li>Sound and light shows in the evening</li>
                        <li>Guided historical tours</li>
                        <li>Cultural festivals and exhibitions</li>
                        <li>School education programs</li>
                    </ul>
                    
                    <h3>Visitor Information:</h3>
                    <ul>
                        <li>Open daily 8:00 AM - 6:00 PM</li>
                        <li>Located in Mombasa Old Town</li>
                        <li>Entry fee for adults and children</li>
                        <li>Allow 1.5-2 hours for thorough visit</li>
                        <li>Combine with Old Town walking tour</li>
                    </ul>
                `
            },
            'gedi': {
                title: 'Gedi Ruins',
                content: `
                    <h2>Gedi Ruins - The Lost Swahili City</h2>
                    <p><strong>National Monument</strong></p>
                    <p>Hidden within coastal forest near Malindi, Gedi was a thriving Swahili town from the 13th to 17th centuries. Its mysterious abandonment and sophisticated architecture continue to fascinate archaeologists and visitors.</p>
                    
                    <h3>Historical Mystery:</h3>
                    <ul>
                        <li>Founded in 13th century, abandoned by early 17th century</li>
                        <li>Not mentioned in any historical texts</li>
                        <li>Reasons for abandonment remain debated</li>
                        <li>Possibly abandoned due to raids or water scarcity</li>
                        <li>Rediscovered in 1884, excavated from 1948</li>
                    </ul>
                    
                    <h3>Architectural Highlights:</h3>
                    <ul>
                        <li>Great Mosque - Large with minaret and ablution facilities</li>
                        <li>Palace - Multi-story building with unique features</li>
                        <li>Stone houses with inner courtyards</li>
                        <li>Pillar tombs for important persons</li>
                        <li>Complex drainage and sewage systems</li>
                        <li>Coral stone construction with lime mortar</li>
                    </ul>
                    
                    <h3>Archaeological Findings:</h3>
                    <ul>
                        <li>Chinese porcelain from Ming Dynasty</li>
                        <li>Glass beads from India</li>
                        <li>Persian pottery and Islamic coins</li>
                        <li>Evidence of iron smelting</li>
                        <li>Carved wooden doors and decorative elements</li>
                    </ul>
                    
                    <h3>Site Features:</h3>
                    <ul>
                        <li>14 mosques throughout the town</li>
                        <li>Stone houses numbered for easy navigation</li>
                        <li>Town walls remnants visible</li>
                        <li>Well-preserved pillar tombs</li>
                        <li>Ancient wells still visible</li>
                    </ul>
                    
                    <h3>Nature and Wildlife:</h3>
                    <ul>
                        <li>Set within indigenous coastal forest</li>
                        <li>Sykes monkeys and vervet monkeys</li>
                        <li>Golden-rumped elephant shrew (rare)</li>
                        <li>Various bird species including hornbills</li>
                        <li>Ancient baobab and tamarind trees</li>
                    </ul>
                    
                    <h3>Museum:</h3>
                    <ul>
                        <li>On-site museum with excavated artifacts</li>
                        <li>Chinese porcelain displays</li>
                        <li>Traditional Swahili items</li>
                        <li>Information panels on Swahili culture</li>
                        <li>Reconstructions of daily life</li>
                    </ul>
                    
                    <h3>Visitor Tips:</h3>
                    <ul>
                        <li>Located 16 km south of Malindi</li>
                        <li>Best visited early morning or late afternoon</li>
                        <li>Wear comfortable walking shoes</li>
                        <li>Bring insect repellent</li>
                        <li>Allow 2-3 hours for full exploration</li>
                        <li>Guided tours highly recommended</li>
                    </ul>
                `
            },
            'great-rift': {
                title: 'Cradle of Humankind Sites',
                content: `
                    <h2>Lake Turkana - The Cradle of Humankind</h2>
                    <p><strong>UNESCO World Heritage Site</strong></p>
                    <p>The Lake Turkana region in northern Kenya has yielded some of the most important fossils for understanding human evolution. These sites have fundamentally changed our understanding of human origins.</p>
                    
                    <h3>Major Discovery Sites:</h3>
                    <ul>
                        <li>Koobi Fora - East of Lake Turkana, richest site</li>
                        <li>Nariokotome - West side, Turkana Boy discovery</li>
                        <li>Lomekwi - Oldest stone tools ever found (3.3 million years)</li>
                        <li>Allia Bay - Important australopithecine site</li>
                        <li>Ileret - Ancient footprints preserved</li>
                    </ul>
                    
                    <h3>Historic Fossil Discoveries:</h3>
                    <ul>
                        <li>Turkana Boy (1984) - Most complete early human skeleton (1.5 million years)</li>
                        <li>Australopithecus anamensis fossils (4.2 million years)</li>
                        <li>Homo habilis remains (2.4 million years)</li>
                        <li>Homo erectus specimens</li>
                        <li>Over 200 fossil specimens of early hominids</li>
                    </ul>
                    
                    <h3>Koobi Fora Museum:</h3>
                    <ul>
                        <li>Located near main fossil sites</li>
                        <li>Replica casts of major discoveries</li>
                        <li>Interactive human evolution exhibits</li>
                        <li>Stone tool collections</li>
                        <li>Paleoenvironment reconstructions</li>
                        <li>Research station for ongoing excavations</li>
                    </ul>
                    
                    <h3>Archaeological Significance:</h3>
                    <ul>
                        <li>Evidence spanning 7 million years of evolution</li>
                        <li>Multiple hominin species coexisting</li>
                        <li>Evolution of stone tool technology</li>
                        <li>Ancient climate and environment data</li>
                        <li>Insight into early human behavior</li>
                    </ul>
                    
                    <h3>Research Legacy:</h3>
                    <ul>
                        <li>Richard and Meave Leakey's groundbreaking work</li>
                        <li>Kamoya Kimeu's fossil discoveries</li>
                        <li>Ongoing international research projects</li>
                        <li>Training ground for African paleontologists</li>
                        <li>National Museums of Kenya management</li>
                    </ul>
                    
                    <h3>Cultural Context:</h3>
                    <ul>
                        <li>Home to Turkana, El Molo, and Rendille peoples</li>
                        <li>Traditional pastoral lifestyles continue</li>
                        <li>Ancient rock art in surrounding areas</li>
                        <li>Living cultural heritage alongside prehistory</li>
                    </ul>
                    
                    <h3>Visiting Information:</h3>
                    <ul>
                        <li>Remote location requires planning</li>
                        <li>Access by road or charter flight</li>
                        <li>Best visited May-September (dry season)</li>
                        <li>Organized tours recommended</li>
                        <li>Limited accommodation near sites</li>
                        <li>Extreme heat - bring plenty of water</li>
                    </ul>
                    
                    <h3>Conservation:</h3>
                    <ul>
                        <li>Protected archaeological sites</li>
                        <li>Restricted excavation areas</li>
                        <li>Community involvement in conservation</li>
                        <li>Climate change threats to preservation</li>
                    </ul>
                `
            },
            'bomas': {
                title: 'Bomas of Kenya',
                content: `
                    <h2>Bomas of Kenya - Living Cultural Heritage</h2>
                    <p><strong>Location:</strong> Langata, Nairobi</p>
                    <p>Bomas of Kenya is a unique cultural center showcasing the traditional lifestyles, architecture, and performing arts of Kenya's diverse ethnic communities. It offers an immersive experience into Kenya's rich cultural tapestry.</p>
                    
                    <h3>Traditional Homesteads:</h3>
                    <ul>
                        <li>Authentic replicas of traditional bomas (homesteads)</li>
                        <li>Represents over 40 Kenyan ethnic communities</li>
                        <li>Different architectural styles from regions</li>
                        <li>Kikuyu, Luo, Maasai, Kalenjin, Luhya structures</li>
                        <li>Coastal Swahili houses</li>
                        <li>Nomadic pastoralist dwellings</li>
                    </ul>
                    
                    <h3>Daily Performances:</h3>
                    <ul>