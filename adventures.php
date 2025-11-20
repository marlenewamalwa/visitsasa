<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adventures in Kenya - Complete Guide</title>
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
            background-color: #f9f9f9;
        }

        header {
            background: linear-gradient(135deg, #142b44 0%, #1d508d 100%);
            color: white;
            padding: 4rem 2rem;
            text-align: center;
        }

        header h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        header p {
            font-size: 1.2rem;
            opacity: 0.95;
            max-width: 800px;
            margin: 0 auto;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
        }

        .filter-bar {
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            margin-bottom: 2rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            align-items: center;
        }

        .filter-group {
            display: flex;
            gap: 0.5rem;
            align-items: center;
        }

        .filter-btn {
            padding: 0.6rem 1.2rem;
            border: 2px solid #dbe6ec;
            background: white;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 500;
            color: #3b444f;
        }

        .filter-btn:hover, .filter-btn.active {
            background: #297CBB;
            color: white;
            border-color: #297CBB;
        }

        .category-section {
            margin-bottom: 4rem;
        }

        .category-header {
            margin-bottom: 2rem;
        }

        .category-header h2 {
            font-size: 2.2rem;
            color: #142b44;
            margin-bottom: 0.5rem;
        }

        .category-header p {
            color: #67747c;
            font-size: 1.1rem;
        }

        .adventures-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
            gap: 2rem;
        }

        .adventure-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            transition: all 0.3s;
            cursor: pointer;
        }

        .adventure-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        .adventure-image {
            height: 240px;
            background-size: cover;
            background-position: center;
            position: relative;
        }

        .adventure-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255,255,255,0.95);
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.85rem;
            color: #142b44;
        }

        .adventure-content {
            padding: 1.5rem;
        }

        .adventure-content h3 {
            font-size: 1.4rem;
            color: #142b44;
            margin-bottom: 0.8rem;
        }

        .adventure-content p {
            color: #67747c;
            margin-bottom: 1rem;
            line-height: 1.6;
        }

        .adventure-details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.8rem;
            margin-bottom: 1rem;
        }

        .detail-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            color: #3b444f;
        }

        .detail-icon {
            font-size: 1.1rem;
        }

        .adventure-tags {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-bottom: 1rem;
        }

        .tag {
            background: #f0f7ff;
            color: #1d508d;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 500;
        }

        .price-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 1rem;
            border-top: 1px solid #f0f0f0;
        }

        .price {
            font-size: 1.3rem;
            font-weight: 700;
            color: #0FDEBD;
        }

        .book-btn {
            background: #297CBB;
            color: white;
            padding: 0.6rem 1.5rem;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            transition: background 0.3s;
            border: none;
            cursor: pointer;
        }

        .book-btn:hover {
            background: #1d508d;
        }

        @media (max-width: 768px) {
            header h1 {
                font-size: 2rem;
            }

            .adventures-grid {
                grid-template-columns: 1fr;
            }

            .filter-bar {
                flex-direction: column;
                align-items: stretch;
            }
        }
    </style>
</head>
<body>
        <div class="container">
        <div class="filter-bar">
            <strong>Filter by:</strong>
            <div class="filter-group">
                <button class="filter-btn active" onclick="filterCategory('all')">All Adventures</button>
                <button class="filter-btn" onclick="filterCategory('wildlife')">Wildlife</button>
                <button class="filter-btn" onclick="filterCategory('water')">Water Sports</button>
                <button class="filter-btn" onclick="filterCategory('mountain')">Mountains</button>
                <button class="filter-btn" onclick="filterCategory('cultural')">Cultural</button>
                <button class="filter-btn" onclick="filterCategory('extreme')">Extreme Sports</button>
            </div>
        </div>

        <?php
        $adventure_categories = [
            'Wildlife Safaris & Game Viewing' => [
                [
                    'name' => 'Maasai Mara Safari',
                    'description' => 'Witness the legendary Great Migration and spot the Big Five in one of Africa\'s most iconic wildlife reserves. Experience thrilling game drives at dawn and dusk.',
                    'duration' => '3-7 Days',
                    'difficulty' => 'Easy',
                    'best_time' => 'Jun-Oct',
                    'price' => 'From $450/day',
                    'tags' => ['Big Five', 'Migration', 'Photography'],
                    'color' => '#8B4513'
                ],
                [
                    'name' => 'Amboseli National Park',
                    'description' => 'Get up close with elephants against the stunning backdrop of Mount Kilimanjaro. Known for its large elephant herds and incredible photo opportunities.',
                    'duration' => '2-4 Days',
                    'difficulty' => 'Easy',
                    'best_time' => 'Year-round',
                    'price' => 'From $400/day',
                    'tags' => ['Elephants', 'Photography', 'Mt. Kilimanjaro'],
                    'color' => '#CD853F'
                ],
                [
                    'name' => 'Tsavo East & West',
                    'description' => 'Explore Kenya\'s largest national park, home to the famous red elephants, lions, and diverse wildlife across vast wilderness areas.',
                    'duration' => '2-5 Days',
                    'difficulty' => 'Easy',
                    'best_time' => 'Jun-Oct, Jan-Feb',
                    'price' => 'From $380/day',
                    'tags' => ['Red Elephants', 'Wilderness', 'Big Five'],
                    'color' => '#A0522D'
                ],
                [
                    'name' => 'Samburu Game Reserve',
                    'description' => 'Discover unique wildlife species not found elsewhere: Grevy\'s zebras, reticulated giraffes, and Somali ostriches in this semi-arid northern region.',
                    'duration' => '2-4 Days',
                    'difficulty' => 'Easy',
                    'best_time' => 'Jun-Oct',
                    'price' => 'From $420/day',
                    'tags' => ['Unique Species', 'Remote', 'Cultural'],
                    'color' => '#D2691E'
                ],
                [
                    'name' => 'Lake Nakuru Flamingos',
                    'description' => 'Marvel at millions of pink flamingos creating a stunning spectacle along the shores, plus rhinos, leopards, and over 400 bird species.',
                    'duration' => '1-2 Days',
                    'difficulty' => 'Easy',
                    'best_time' => 'Year-round',
                    'price' => 'From $320/day',
                    'tags' => ['Flamingos', 'Birdwatching', 'Rhinos'],
                    'color' => '#FF69B4'
                ],
                [
                    'name' => 'Night Game Drives',
                    'description' => 'Experience the wilderness after dark in private conservancies. Spot nocturnal animals including leopards, hyenas, and bush babies with spotlights.',
                    'duration' => '2-4 Hours',
                    'difficulty' => 'Easy',
                    'best_time' => 'Year-round',
                    'price' => 'From $80/person',
                    'tags' => ['Nocturnal', 'Exclusive', 'Predators'],
                    'color' => '#2F4F4F'
                ]
            ],
            'Mountain Adventures & Trekking' => [
                [
                    'name' => 'Mount Kenya Summit Trek',
                    'description' => 'Challenge yourself to reach Point Lenana (4,985m), Africa\'s second-highest peak. Multiple routes available through stunning alpine scenery and glaciers.',
                    'duration' => '4-6 Days',
                    'difficulty' => 'Hard',
                    'best_time' => 'Jan-Mar, Jul-Oct',
                    'price' => 'From $800',
                    'tags' => ['Summit', 'High Altitude', 'Glaciers'],
                    'color' => '#4682B4'
                ],
                [
                    'name' => 'Longonot Volcano Hike',
                    'description' => 'Day hike up this dormant volcano in the Great Rift Valley. Trek around the crater rim for spectacular 360-degree views of the surrounding landscape.',
                    'duration' => '4-6 Hours',
                    'difficulty' => 'Moderate',
                    'best_time' => 'Year-round',
                    'price' => 'From $60/person',
                    'tags' => ['Day Trip', 'Crater', 'Rift Valley'],
                    'color' => '#8B4513'
                ],
                [
                    'name' => 'Aberdare Ranges Trek',
                    'description' => 'Trek through pristine moorlands, bamboo forests, and waterfalls in this lesser-known mountain range. Spot elephants and rare bongo antelopes.',
                    'duration' => '2-4 Days',
                    'difficulty' => 'Moderate-Hard',
                    'best_time' => 'Jan-Mar, Jun-Oct',
                    'price' => 'From $350',
                    'tags' => ['Waterfalls', 'Forests', 'Wildlife'],
                    'color' => '#228B22'
                ],
                [
                    'name' => 'Ngong Hills Hike',
                    'description' => 'Popular day hike near Nairobi offering panoramic views of the Rift Valley. Follow the ridge across seven peaks with stunning sunrise and sunset views.',
                    'duration' => '3-5 Hours',
                    'difficulty' => 'Moderate',
                    'best_time' => 'Year-round',
                    'price' => 'From $40/person',
                    'tags' => ['Nairobi', 'Day Trip', 'Sunrise'],
                    'color' => '#5F9EA0'
                ],
                [
                    'name' => 'Menengai Crater Walk',
                    'description' => 'Explore the world\'s second-largest volcanic caldera near Nakuru. Walk along the rim and descend to the crater floor with steaming fumaroles.',
                    'duration' => '2-4 Hours',
                    'difficulty' => 'Moderate',
                    'best_time' => 'Year-round',
                    'price' => 'From $50/person',
                    'tags' => ['Volcanic', 'Geothermal', 'Views'],
                    'color' => '#B8860B'
                ]
            ],
            'Beach & Water Adventures' => [
                [
                    'name' => 'Diani Beach Kitesurfing',
                    'description' => 'Perfect conditions for kitesurfing with consistent winds and warm waters. Lessons available for beginners and advanced riders.',
                    'duration' => '1-7 Days',
                    'difficulty' => 'Moderate',
                    'best_time' => 'Dec-Mar, Jun-Sep',
                    'price' => 'From $80/session',
                    'tags' => ['Kitesurfing', 'Beach', 'Water Sports'],
                    'color' => '#1E90FF'
                ],
                [
                    'name' => 'Watamu Scuba Diving',
                    'description' => 'Dive pristine coral reefs in a marine protected area. Encounter turtles, dolphins, whale sharks, and vibrant tropical fish in crystal-clear waters.',
                    'duration' => 'Half-day',
                    'difficulty' => 'Easy-Moderate',
                    'best_time' => 'Oct-Mar',
                    'price' => 'From $120/dive',
                    'tags' => ['Diving', 'Marine Life', 'Turtles'],
                    'color' => '#00CED1'
                ],
                [
                    'name' => 'Malindi Deep Sea Fishing',
                    'description' => 'World-class sport fishing for marlin, sailfish, and tuna. Full-day charters with experienced crews targeting trophy fish in the Indian Ocean.',
                    'duration' => 'Full Day',
                    'difficulty' => 'Moderate',
                    'best_time' => 'Year-round',
                    'price' => 'From $600/boat',
                    'tags' => ['Fishing', 'Marlin', 'Ocean'],
                    'color' => '#4169E1'
                ],
                [
                    'name' => 'Lamu Dhow Sailing',
                    'description' => 'Traditional sailing adventures on historic dhows. Sunset cruises, island hopping, and multi-day expeditions exploring the Lamu Archipelago.',
                    'duration' => '2 Hours - 3 Days',
                    'difficulty' => 'Easy',
                    'best_time' => 'Oct-Mar',
                    'price' => 'From $50/person',
                    'tags' => ['Cultural', 'Sailing', 'Sunset'],
                    'color' => '#20B2AA'
                ],
                [
                    'name' => 'Kisite-Mpunguti Snorkeling',
                    'description' => 'Snorkel in a protected marine park teeming with colorful fish and coral gardens. High chance of spotting dolphins during boat transfers.',
                    'duration' => 'Full Day',
                    'difficulty' => 'Easy',
                    'best_time' => 'Oct-Mar',
                    'price' => 'From $90/person',
                    'tags' => ['Snorkeling', 'Dolphins', 'Marine Park'],
                    'color' => '#48D1CC'
                ],
                [
                    'name' => 'Funzi Island Kayaking',
                    'description' => 'Paddle through mangrove forests and explore pristine beaches. Multi-day eco-adventures available with camping on secluded islands.',
                    'duration' => '1-3 Days',
                    'difficulty' => 'Easy-Moderate',
                    'best_time' => 'Year-round',
                    'price' => 'From $70/person',
                    'tags' => ['Kayaking', 'Mangroves', 'Eco-tourism'],
                    'color' => '#40E0D0'
                ]
            ],
            'Extreme & Adventure Sports' => [
                [
                    'name' => 'Hell\'s Gate Rock Climbing',
                    'description' => 'Technical rock climbing on volcanic cliffs with spectacular Rift Valley views. Routes for all skill levels from beginner to advanced.',
                    'duration' => 'Half-Full Day',
                    'difficulty' => 'Moderate-Hard',
                    'best_time' => 'Year-round',
                    'price' => 'From $100/person',
                    'tags' => ['Climbing', 'Rappelling', 'Extreme'],
                    'color' => '#DC143C'
                ],
                [
                    'name' => 'White Water Rafting - Tana River',
                    'description' => 'Navigate Class III-IV rapids on Kenya\'s longest river. Adrenaline-pumping multi-day expeditions through remote wilderness areas.',
                    'duration' => '1-3 Days',
                    'difficulty' => 'Hard',
                    'best_time' => 'Apr-Jul',
                    'price' => 'From $150/person',
                    'tags' => ['Rafting', 'Rapids', 'Camping'],
                    'color' => '#4682B4'
                ],
                [
                    'name' => 'Skydiving Diani Beach',
                    'description' => 'Tandem skydiving from 10,000-15,000 feet with stunning coastal views. Experience freefall over turquoise waters and white sand beaches.',
                    'duration' => '3-4 Hours',
                    'difficulty' => 'Extreme',
                    'best_time' => 'Year-round',
                    'price' => 'From $280/jump',
                    'tags' => ['Skydiving', 'Beach', 'Adrenaline'],
                    'color' => '#FF4500'
                ],
                [
                    'name' => 'Mountain Biking - Karura Forest',
                    'description' => 'Technical trails through urban forest in Nairobi. Multiple difficulty levels with waterfalls, caves, and wildlife encounters.',
                    'duration' => '2-4 Hours',
                    'difficulty' => 'Easy-Moderate',
                    'best_time' => 'Year-round',
                    'price' => 'From $30/person',
                    'tags' => ['Biking', 'Nairobi', 'Forest'],
                    'color' => '#228B22'
                ],
                [
                    'name' => 'Paragliding Great Rift Valley',
                    'description' => 'Soar above the dramatic escarpments of the Rift Valley. Tandem flights with certified instructors offering bird\'s-eye views of lakes and volcanoes.',
                    'duration' => '15-30 Minutes',
                    'difficulty' => 'Moderate',
                    'best_time' => 'Dec-Mar',
                    'price' => 'From $120/flight',
                    'tags' => ['Paragliding', 'Aerial', 'Rift Valley'],
                    'color' => '#FF6347'
                ],
                [
                    'name' => 'Zip-lining Kereita Forest',
                    'description' => 'Africa\'s longest zip-line course through indigenous forest canopy. Seven lines up to 400m long with rope courses and giant swings.',
                    'duration' => '2-3 Hours',
                    'difficulty' => 'Easy-Moderate',
                    'best_time' => 'Year-round',
                    'price' => 'From $50/person',
                    'tags' => ['Zip-line', 'Canopy', 'Family'],
                    'color' => '#32CD32'
                ]
            ],
            'Cultural & Unique Experiences' => [
                [
                    'name' => 'Maasai Village Homestay',
                    'description' => 'Live with a Maasai family, learn traditional customs, participate in daily activities, and gain authentic insights into warrior culture.',
                    'duration' => '2-5 Days',
                    'difficulty' => 'Easy',
                    'best_time' => 'Year-round',
                    'price' => 'From $100/day',
                    'tags' => ['Cultural Immersion', 'Homestay', 'Traditional'],
                    'color' => '#CD5C5C'
                ],
                [
                    'name' => 'Samburu Cultural Experience',
                    'description' => 'Visit remote Samburu villages, witness traditional ceremonies, learn beadwork, and experience the nomadic pastoralist lifestyle.',
                    'duration' => 'Half-Full Day',
                    'difficulty' => 'Easy',
                    'best_time' => 'Year-round',
                    'price' => 'From $60/person',
                    'tags' => ['Samburu', 'Nomadic', 'Crafts'],
                    'color' => '#BC8F8F'
                ],
                [
                    'name' => 'Lamu Old Town Walking Tour',
                    'description' => 'Explore UNESCO World Heritage Site with Swahili architecture, narrow streets, ancient mosques, and traditional craftsmen workshops.',
                    'duration' => '2-4 Hours',
                    'difficulty' => 'Easy',
                    'best_time' => 'Year-round',
                    'price' => 'From $40/person',
                    'tags' => ['UNESCO', 'Architecture', 'History'],
                    'color' => '#DEB887'
                ],
                [
                    'name' => 'Nairobi City Food Tour',
                    'description' => 'Taste authentic Kenyan cuisine from street food to fine dining. Visit local markets, sample nyama choma, and learn about food culture.',
                    'duration' => '4-5 Hours',
                    'difficulty' => 'Easy',
                    'best_time' => 'Year-round',
                    'price' => 'From $70/person',
                    'tags' => ['Food', 'Street Food', 'Urban'],
                    'color' => '#D2691E'
                ],
                [
                    'name' => 'Tea & Coffee Plantation Tours',
                    'description' => 'Visit working plantations in Kericho and Kiambu. Learn harvesting, processing, participate in tea picking, and enjoy tastings.',
                    'duration' => 'Half-Full Day',
                    'difficulty' => 'Easy',
                    'best_time' => 'Year-round',
                    'price' => 'From $50/person',
                    'tags' => ['Agriculture', 'Tasting', 'Scenic'],
                    'color' => '#8B6914'
                ],
                [
                    'name' => 'Bomas of Kenya Performance',
                    'description' => 'Experience traditional dances, music, and acrobatics from Kenya\'s 42+ tribes. Visit reconstructed traditional homesteads and learn cultural heritage.',
                    'duration' => '2-3 Hours',
                    'difficulty' => 'Easy',
                    'best_time' => 'Year-round',
                    'price' => 'From $25/person',
                    'tags' => ['Dance', 'Music', 'Heritage'],
                    'color' => '#A0522D'
                ]
            ],
            'Wildlife Conservation & Education' => [
                [
                    'name' => 'Sheldrick Elephant Orphanage',
                    'description' => 'Meet baby elephants and learn about conservation efforts. Watch feeding time and adopt an orphaned elephant to support rehabilitation.',
                    'duration' => '1 Hour',
                    'difficulty' => 'Easy',
                    'best_time' => 'Daily 11am',
                    'price' => 'From $7/person',
                    'tags' => ['Elephants', 'Conservation', 'Family'],
                    'color' => '#8B4513'
                ],
                [
                    'name' => 'Giraffe Centre Experience',
                    'description' => 'Feed and interact with endangered Rothschild giraffes from a raised platform. Learn about conservation breeding programs.',
                    'duration' => '1-2 Hours',
                    'difficulty' => 'Easy',
                    'best_time' => 'Year-round',
                    'price' => 'From $12/person',
                    'tags' => ['Giraffes', 'Education', 'Nairobi'],
                    'color' => '#DAA520'
                ],
                [
                    'name' => 'Ol Pejeta Chimpanzee Sanctuary',
                    'description' => 'Visit East Africa\'s only chimpanzee sanctuary and see the last two northern white rhinos. Support critical conservation work.',
                    'duration' => 'Full Day',
                    'difficulty' => 'Easy',
                    'best_time' => 'Year-round',
                    'price' => 'From $280/person',
                    'tags' => ['Chimps', 'Rhinos', 'Conservation'],
                    'color' => '#556B2F'
                ],
                [
                    'name' => 'Lewa Wildlife Conservancy',
                    'description' => 'Premier rhino sanctuary with guided walks, horse riding safaris, and community development programs. Model for conservation success.',
                    'duration' => '1-3 Days',
                    'difficulty' => 'Easy-Moderate',
                    'best_time' => 'Year-round',
                    'price' => 'From $400/day',
                    'tags' => ['Rhinos', 'Walking Safari', 'Community'],
                    'color' => '#6B8E23'
                ],
                [
                    'name' => 'Nairobi National Park',
                    'description' => 'Unique wildlife park with Nairobi skyline backdrop. See lions, rhinos, giraffes just minutes from the city center.',
                    'duration' => 'Half-Full Day',
                    'difficulty' => 'Easy',
                    'best_time' => 'Year-round',
                    'price' => 'From $120/person',
                    'tags' => ['Urban Safari', 'Big Five', 'Day Trip'],
                    'color' => '#8FBC8F'
                ]
            ],
            'Aerial & Scenic Adventures' => [
                [
                    'name' => 'Hot Air Balloon Safari - Maasai Mara',
                    'description' => 'Float over the savannah at sunrise watching wildlife from above. Champagne breakfast in the bush after landing.',
                    'duration' => '3-4 Hours',
                    'difficulty' => 'Easy',
                    'best_time' => 'Jun-Oct',
                    'price' => 'From $450/person',
                    'tags' => ['Balloon', 'Sunrise', 'Luxury'],
                    'color' => '#FF6B6B'
                ],
                [
                    'name' => 'Helicopter Safari Tours',
                    'description' => 'Exclusive aerial safaris covering multiple parks in one day. Perfect for photography and covering vast distances quickly.',
                    'duration' => '2-8 Hours',
                    'difficulty' => 'Easy',
                    'best_time' => 'Year-round',
                    'price' => 'From $2000/flight',
                    'tags' => ['Helicopter', 'Exclusive', 'Photography'],
                    'color' => '#4169E1'
                ],
                [
                    'name' => 'Cessna Scenic Flights',
                    'description' => 'Fly over the Great Rift Valley, Mount Kenya, and coastal regions. Custom routes available for aerial photography.',
                    'duration' => '1-3 Hours',
                    'difficulty' => 'Easy',
                    'best_time' => 'Year-round',
                    'price' => 'From $400/hour',
                    'tags' => ['Scenic Flight', 'Photography', 'Custom'],
                    'color' => '#87CEEB'
                ]
            ],
            'Cycling & Bike Adventures' => [
                [
                    'name' => 'Hell\'s Gate Cycling Safari',
                    'description' => 'Unique cycling safari among wildlife. The only national park where cycling is permitted. See zebras, giraffes, and dramatic gorges.',
                    'duration' => 'Half-Full Day',
                    'difficulty' => 'Moderate',
                    'best_time' => 'Year-round',
                    'price' => 'From $60/person',
                    'tags' => ['Cycling', 'Wildlife', 'Gorge'],
                    'color' => '#FF8C00'
                ],
                [
                    'name' => 'Kericho Tea Plantations Ride',
                    'description' => 'Scenic cycling through rolling hills covered in tea plantations. Stop at viewpoints and visit tea factories.',
                    'duration' => 'Half-Full Day',
                    'difficulty' => 'Moderate',
                    'best_time' => 'Year-round',
                    'price' => 'From $50/person',
                    'tags' => ['Scenic', 'Tea Country', 'Hills'],
                    'color' => '#90EE90'
                ],
                [
                    'name' => 'Nairobi Urban Bike Tour',
                    'description' => 'Explore Nairobi\'s vibrant neighborhoods, markets, and parks by bike. Guided tours with local insights.',
                    'duration' => '3-5 Hours',  
                    'difficulty' => 'Easy-Moderate',
                    'best_time' => 'Year-round',
                    'price' => 'From $40/person',
                    'tags' => ['Urban', 'Culture', 'Markets'],
                    'color' => '#20B2AA'
                ]
            ]
        ];
        foreach ($adventure_categories as $category => $adventures) {
            echo '<div class="category-section" data-category="' . strtolower(str_replace(' & ', '-', str_replace(' ', '-', $category))) . '">';
            echo '<div class="category-header">';
            echo '<h2>' . htmlspecialchars($category) . '</h2>';
            echo '<p>Explore our curated adventures in ' . htmlspecialchars($category) . '.</p>';
            echo '</div>';
            echo '<div class="adventures-grid">';
            foreach ($adventures as $adventure) {
                echo '<div class="adventure-card">';
                echo '<div class="adventure-image" style="background-color: ' . htmlspecialchars($adventure['color']) . ';">';
                echo '<div class="adventure-badge">' . htmlspecialchars($category) . '</div>';
                echo '</div>';
                echo '<div class="adventure-content">';
                echo '<h3>' . htmlspecialchars($adventure['name']) . '</h3>';
                echo '<p>' . htmlspecialchars($adventure['description']) . '</p>';
                echo '<div class="adventure-details">';
                echo '<div class="detail-item"><span class="detail-icon">⏳</span> ' . htmlspecialchars($adventure['duration']) . '</div>';
                echo '<div class="detail-item"><span class="detail-icon">⚙️</span> ' . htmlspecialchars($adventure['difficulty']) . '</div>';
                echo '<div class="detail-item"><span class="detail-icon">📅</span> ' . htmlspecialchars($adventure['best_time']) . '</div>';
                echo '</div>';
                echo '<div class="adventure-tags">';
                foreach ($adventure['tags'] as $tag) {
                    echo '<div class="tag">' . htmlspecialchars($tag) . '</div>';
                }
                echo '</div>';
                echo '<div class="price-section">';
                echo '<div class="price">' . htmlspecialchars($adventure['price']) . '</div>';
                echo '<button class="book-btn">Book Now</button>';
                echo '</div>';
                echo '</div>';
                echo '</div>';
            }
            echo '</div>';
            echo '</div>';
        }
        ?>
    </div>
    <script>
        function filterCategory(category) {
            const sections = document.querySelectorAll('.category-section');
            sections.forEach(section => {
                if (category === 'all' || section.getAttribute('data-category') === category) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });

            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
        }
    </script>
</body>
</html>
    