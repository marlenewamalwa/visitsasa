<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kenya Mountains & Hiking - Summit Adventures</title>
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

        header {
            background: linear-gradient(rgba(27, 94, 32, 0.6), rgba(46, 125, 50, 0.7)), url('https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1600&h=500&fit=crop');
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

        #mount-kenya .card-image {
            background-image: url('https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=600&h=400&fit=crop');
        }

        #aberdares .card-image {
            background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop');
        }

        #mount-longonot .card-image {
            background-image: url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop');
        }

        #mount-elgon .card-image {
            background-image: url('https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&h=400&fit=crop');
        }

        #kakamega .card-image {
            background-image: url('https://images.unsplash.com/photo-1511497584788-876760111969?w=600&h=400&fit=crop');
        }

        #karura .card-image {
            background-image: url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop');
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
    <header>
        <h1>Kenya Mountains & Hiking</h1>
        <p>Conquer the Peaks of East Africa</p>
        <div class="wave"></div>
    </header>

    <div class="container">
        <div class="intro">
            <h2>Discover Kenya's Mountain Adventures</h2>
            <p>From snow-capped peaks to lush forested mountains, Kenya offers incredible hiking and climbing experiences. Scale Africa's second-highest mountain, trek through ancient forests, or enjoy day hikes with breathtaking views. Whether you're an experienced mountaineer or a casual hiker, Kenya's diverse mountain landscapes promise unforgettable adventures.</p>
        </div>

        <div class="destinations-grid">
            <div id="mount-kenya" class="destination-card" onclick="openModal('mount-kenya')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Mount Kenya</h3>
                    <p>Africa's second-highest mountain at 5,199m, a UNESCO World Heritage Site offering technical climbing and scenic trekking routes.</p>
                    <ul class="attractions">
                        <li>Point Lenana (4,985m) - trekking peak</li>
                        <li>Technical climbs to Batian & Nelion</li>
                        <li>Diverse vegetation zones</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="aberdares" class="destination-card" onclick="openModal('aberdares')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Aberdare Ranges</h3>
                    <p>Mountain moorlands, bamboo forests, and cascading waterfalls. Perfect for multi-day hiking adventures through pristine wilderness.</p>
                    <ul class="attractions">
                        <li>Karura Falls & Gura Falls</li>
                        <li>Afro-alpine moorlands</li>
                        <li>Wildlife including elephants</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="mount-longonot" class="destination-card" onclick="openModal('mount-longonot')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Mount Longonot</h3>
                    <p>A dormant stratovolcano with a spectacular crater. Popular day hike offering panoramic views of the Great Rift Valley.</p>
                    <ul class="attractions">
                        <li>3-4 hour crater rim hike</li>
                        <li>Stunning Rift Valley views</li>
                        <li>Wildlife spotting opportunities</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="mount-elgon" class="destination-card" onclick="openModal('mount-elgon')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Mount Elgon</h3>
                    <p>Ancient extinct volcano straddling the Kenya-Uganda border, featuring caves, hot springs, and unique montane vegetation.</p>
                    <ul class="attractions">
                        <li>Kitum Cave exploration</li>
                        <li>Wagagai Peak (4,321m)</li>
                        <li>Diverse ecosystems</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="kakamega" class="destination-card" onclick="openModal('kakamega')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Kakamega Forest</h3>
                    <p>Kenya's last remnant of ancient equatorial rainforest. Gentle hiking trails through lush tropical vegetation and incredible biodiversity.</p>
                    <ul class="attractions">
                        <li>Pristine rainforest trails</li>
                        <li>Over 400 bird species</li>
                        <li>Unique butterflies & primates</li>
                    </ul>
                    <button class="btn">Learn More</button>
                </div>
            </div>

            <div id="karura" class="destination-card" onclick="openModal('karura')">
                <div class="card-image"></div>
                <div class="card-content">
                    <h3>Karura Forest</h3>
                    <p>Urban forest sanctuary in Nairobi offering peaceful walking and cycling trails, waterfalls, and caves just minutes from the city.</p>
                    <ul class="attractions">
                        <li>50km of trails & cycling paths</li>
                        <li>Waterfalls & limestone caves</li>
                        <li>Perfect for family outings</li>
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
        <p>&copy; 2025 Kenya Mountains & Hiking | Reach New Heights</p>
        <p>Climb Higher | Trek Further | Explore Nature</p>
    </footer>

    <script>
        const destinationDetails = {
            'mount-kenya': {
                title: 'Mount Kenya',
                content: `
                    <h2>Mount Kenya - The Jewel of East Africa</h2>
                    <p><strong>Elevation:</strong> 5,199 meters (17,057 feet)</p>
                    <p>Mount Kenya is Africa's second-highest mountain and a UNESCO World Heritage Site. With its snow-capped peaks, diverse ecosystems, and challenging routes, it offers one of the continent's most rewarding mountain experiences.</p>
                    
                    <h3>Main Routes:</h3>
                    <ul>
                        <li>Sirimon Route - Most scenic, gentle ascent (3-4 days)</li>
                        <li>Naro Moru Route - Most direct, steeper (3-4 days)</li>
                        <li>Chogoria Route - Most beautiful descent (4-5 days)</li>
                        <li>Burguret Route - Less crowded, wilderness experience</li>
                    </ul>
                    
                    <h3>Peaks:</h3>
                    <ul>
                        <li>Batian (5,199m) - Technical rock climbing, highest peak</li>
                        <li>Nelion (5,188m) - Technical climbing, second highest</li>
                        <li>Point Lenana (4,985m) - Trekking peak, no technical skills needed</li>
                    </ul>
                    
                    <h3>Highlights:</h3>
                    <ul>
                        <li>Pass through five distinct vegetation zones</li>
                        <li>See unique Afro-alpine plants like giant lobelias</li>
                        <li>Glaciers and tarns (mountain lakes)</li>
                        <li>Wildlife including elephants, buffalo, and rock hyrax</li>
                        <li>Stunning sunrise views from Point Lenana</li>
                    </ul>
                    
                    <h3>Best Time to Climb:</h3>
                    <p>January to February and August to September for clearest weather and best views.</p>
                    
                    <h3>Preparation:</h3>
                    <p>Acclimatization is essential. Most climbers spend 4-5 days to reach Point Lenana safely. Temperatures can drop to -10°C at night.</p>
                `
            },
            'aberdares': {
                title: 'Aberdare Ranges',
                content: `
                    <h2>Aberdare Ranges - The Moorland Mountains</h2>
                    <p><strong>Highest Point:</strong> Ol Donyo Lesatima (4,001m)</p>
                    <p>The Aberdare Range is a volcanic mountain range covered with bamboo forests, moorlands, and beautiful waterfalls. It offers excellent hiking with diverse wildlife encounters.</p>
                    
                    <h3>Major Peaks:</h3>
                    <ul>
                        <li>Ol Donyo Lesatima (4,001m) - Highest peak</li>
                        <li>Kinangop (3,906m) - Second highest</li>
                        <li>Table Mountain (3,791m) - Plateau hiking</li>
                    </ul>
                    
                    <h3>Hiking Trails:</h3>
                    <ul>
                        <li>Chania Falls Trail - 3 hour day hike</li>
                        <li>Karura Falls - Beautiful waterfall trek</li>
                        <li>Gura Falls - Kenya's highest waterfall (300m)</li>
                        <li>Elephant Trail - Multi-day moorland trek</li>
                        <li>Peaks Circuit - 3-4 day wilderness adventure</li>
                    </ul>
                    
                    <h3>Wildlife:</h3>
                    <ul>
                        <li>Elephants, buffalo, and black leopards</li>
                        <li>Bongo antelope (rare forest dweller)</li>
                        <li>Black rhinos in the moorlands</li>
                        <li>Over 250 bird species</li>
                    </ul>
                    
                    <h3>Ecosystems:</h3>
                    <ul>
                        <li>Montane bamboo forests</li>
                        <li>Hagenia-Hypericum forest</li>
                        <li>Afro-alpine moorlands above 3,300m</li>
                        <li>Numerous streams and waterfalls</li>
                    </ul>
                    
                    <h3>Best Time to Visit:</h3>
                    <p>Dry seasons from January to February and June to September. Be prepared for rain and cold temperatures year-round.</p>
                `
            },
            'mount-longonot': {
                title: 'Mount Longonot',
                content: `
                    <h2>Mount Longonot - The Perfect Day Hike</h2>
                    <p><strong>Elevation:</strong> 2,776 meters (9,108 feet)</p>
                    <p>Mount Longonot is a dormant stratovolcano southeast of Lake Naivasha. Its distinctive crater makes it one of Kenya's most popular day hikes with spectacular Rift Valley views.</p>
                    
                    <h3>The Hike:</h3>
                    <ul>
                        <li>Total distance: 13.5 km (with full crater rim)</li>
                        <li>Duration: 3-5 hours round trip</li>
                        <li>Elevation gain: 600 meters from base</li>
                        <li>Difficulty: Moderate to challenging</li>
                        <li>Trail: Well-marked steep ascent</li>
                    </ul>
                    
                    <h3>Crater Rim Circuit:</h3>
                    <ul>
                        <li>Option to hike around the entire crater rim (7.2 km)</li>
                        <li>360-degree panoramic views</li>
                        <li>View into the 1.6 km wide, 150m deep crater</li>
                        <li>Steam vents visible inside crater</li>
                        <li>Takes an additional 2-3 hours</li>
                    </ul>
                    
                    <h3>Views & Scenery:</h3>
                    <ul>
                        <li>Lake Naivasha and surrounding areas</li>
                        <li>Great Rift Valley escarpment</li>
                        <li>Mount Suswa and Mount Margaret</li>
                        <li>Distant views of Mount Kenya on clear days</li>
                    </ul>
                    
                    <h3>Wildlife:</h3>
                    <ul>
                        <li>Buffaloes, zebras, and gazelles</li>
                        <li>Giraffes on the lower slopes</li>
                        <li>Various bird species including raptors</li>
                    </ul>
                    
                    <h3>Tips:</h3>
                    <ul>
                        <li>Start early morning (7-8 AM) to avoid midday heat</li>
                        <li>Bring plenty of water (2-3 liters per person)</li>
                        <li>Wear good hiking boots for steep, loose terrain</li>
                        <li>Entry fee: 300 KES for Kenyan residents</li>
                    </ul>
                `
            },
            'mount-elgon': {
                title: 'Mount Elgon',
                content: `
                    <h2>Mount Elgon - The Ancient Giant</h2>
                    <p><strong>Elevation:</strong> 4,321 meters (14,177 feet) at Wagagai Peak</p>
                    <p>Mount Elgon is an ancient extinct shield volcano on the Kenya-Uganda border, older than Mount Kenya and Kilimanjaro. It offers diverse ecosystems, fascinating caves, and less crowded trails.</p>
                    
                    <h3>Main Routes (Kenya Side):</h3>
                    <ul>
                        <li>Chorlim Gate Route - 4-5 days to summit</li>
                        <li>Passes through beautiful montane forest</li>
                        <li>Access to Kitum Cave and other salt caves</li>
                        <li>Summit Koitoboss Peak (4,187m) on Kenya side</li>
                        <li>Can extend to Wagagai (highest, on Uganda side)</li>
                    </ul>
                    
                    <h3>The Famous Caves:</h3>
                    <ul>
                        <li>Kitum Cave - 200m deep, elephants mine salt here</li>
                        <li>Makingeny Cave - Largest cave system</li>
                        <li>Chepnyalil Cave (Cave of the Bees)</li>
                        <li>Ancient volcanic tubes and chambers</li>
                        <li>Historical cultural significance to local communities</li>
                    </ul>
                    
                    <h3>Unique Features:</h3>
                    <ul>
                        <li>World's largest volcanic caldera (40km x 80km)</li>
                        <li>Natural hot springs near the caves</li>
                        <li>Pristine mountain streams and waterfalls</li>
                        <li>Ancient podocarpus forest</li>
                        <li>Bamboo and heath zones</li>
                    </ul>
                    
                    <h3>Wildlife & Flora:</h3>
                    <ul>
                        <li>Elephants (famous cave-dwelling salt miners)</li>
                        <li>Buffalo, duiker, and colobus monkeys</li>
                        <li>Over 300 bird species including eagles</li>
                        <li>Giant lobelias and groundsels at higher elevations</li>
                    </ul>
                    
                    <h3>Best Time to Visit:</h3>
                    <p>June to August and December to March. Avoid April-May rainy season.</p>
                `
            },
            'kakamega': {
                title: 'Kakamega Forest',
                content: `
                    <h2>Kakamega Forest - The Last Rainforest</h2>
                    <p><strong>Location:</strong> Western Kenya near Kakamega town</p>
                    <p>Kakamega Forest is Kenya's only tropical rainforest, a remnant of the once vast Guineo-Congolian rainforest. It's a biodiversity hotspot offering gentle hiking through lush, ancient forest.</p>
                    
                    <h3>Hiking Trails:</h3>
                    <ul>
                        <li>Isecheno Trail - 7 km forest circuit (3-4 hours)</li>
                        <li>Buyangu Nature Trail - Short educational walk</li>
                        <li>Kisere Forest Trail - Through pristine rainforest</li>
                        <li>Crying Stone Trail - Historical and cultural site</li>
                        <li>Canopy Walkway - Elevated forest experience</li>
                    </ul>
                    
                    <h3>Biodiversity:</h3>
                    <ul>
                        <li>Over 400 species of birds (including 9 endemic)</li>
                        <li>7 primate species: black-and-white colobus, red-tailed monkeys</li>
                        <li>Over 400 species of butterflies</li>
                        <li>150+ tree species including ancient giants</li>
                        <li>Unique reptiles and amphibians</li>
                    </ul>
                    
                    <h3>Bird Watching Paradise:</h3>
                    <ul>
                        <li>Great blue turaco</li>
                        <li>Turner's eremomela (endemic)</li>
                        <li>Blue-headed bee-eater</li>
                        <li>Black-billed weaver</li>
                        <li>Many forest hornbill species</li>
                    </ul>
                    
                    <h3>Accommodation:</h3>
                    <ul>
                        <li>Udo's Bandas - Eco-lodges in the forest</li>
                        <li>Forest Rest House - Basic accommodation</li>
                        <li>Camping sites available</li>
                        <li>Guided walks with local forest guides recommended</li>
                    </ul>
                    
                    <h3>What to Bring:</h3>
                    <ul>
                        <li>Rain gear (can rain any time)</li>
                        <li>Binoculars for bird watching</li>
                        <li>Good walking shoes (trails can be muddy)</li>
                        <li>Insect repellent</li>
                    </ul>
                    
                    <h3>Best Time to Visit:</h3>
                    <p>Year-round destination. Drier months (June-September) offer easier hiking but less lush vegetation.</p>
                `
            },
            'karura': {
                title: 'Karura Forest',
                content: `
                    <h2>Karura Forest - Nairobi's Urban Sanctuary</h2>
                    <p><strong>Location:</strong> Northern Nairobi, just 10km from city center</p>
                    <p>Karura Forest is a 1,041-hectare urban forest offering a peaceful escape from city life. It features well-maintained trails, waterfalls, caves, and abundant wildlife.</p>
                    
                    <h3>Trail Network:</h3>
                    <ul>
                        <li>Over 50 km of walking, jogging, and cycling trails</li>
                        <li>River Trail - Follows the Nairobi River (easy, 5 km)</li>
                        <li>Waterfall Trail - Leads to beautiful waterfall (moderate, 6 km)</li>
                        <li>Cave Trail - Explores limestone caves (moderate, 4 km)</li>
                        <li>Central Park Loop - Family-friendly circular route (easy, 3 km)</li>
                    </ul>
                    
                    <h3>Main Attractions:</h3>
                    <ul>
                        <li>15-meter high waterfall with viewing platform</li>
                        <li>Mau Mau caves - Historical hideouts from independence struggle</li>
                        <li>Lily Lake - Picturesque spot for picnics</li>
                        <li>Sacred grove with indigenous trees</li>
                        <li>Riparian forest ecosystem</li>
                    </ul>
                    
                    <h3>Activities:</h3>
                    <ul>
                        <li>Walking and jogging on designated paths</li>
                        <li>Mountain biking on cycling trails</li>
                        <li>Picnicking at designated sites</li>
                        <li>Bird watching (over 200 species)</li>
                        <li>Photography</li>
                        <li>Nature education programs</li>
                    </ul>
                    
                    <h3>Wildlife:</h3>
                    <ul>
                        <li>Colobus monkeys and Sykes monkeys</li>
                        <li>Bushbucks and duikers</li>
                        <li>Over 200 bird species including sunbirds and turacos</li>
                        <li>Butterflies and other insects</li>
                        <li>Small mammals like hyrax</li>
                    </ul>
                    
                    <h3>Facilities:</h3>
                    <ul>
                        <li>Multiple entry gates with parking</li>
                        <li>Clean restrooms at main gates</li>
                        <li>Bike rental available at some gates</li>
                        <li>Picnic benches and shelters</li>
                        <li>Well-marked and maintained trails</li>
                    </ul>
                    
                    <h3>Visitor Information:</h3>
                    <ul>
                        <li>Open daily: 6:00 AM to 6:30 PM</li>
                        <li>Entry fee: 100 KES for adults, 50 KES for children</li>
                        <li>Bike rental: 200 KES per hour</li>
                        <li>Safe for solo visitors and families</li>
                        <li>No littering - keep the forest clean</li>
                    </ul>
                    
                    <h3>Perfect For:</h3>
                    <ul>
                        <li>Morning jogs and fitness walks</li>
                        <li>Family weekend outings</li>
                        <li>Peaceful nature retreats</li>
                        <li>Educational field trips</li>
                        <li>Photography and bird watching</li>
                    </ul>
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