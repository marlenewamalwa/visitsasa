<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Food & Drink - Explore Kenya's Culinary Scene</title>
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
            background: linear-gradient(rgba(94, 27, 64, 0.6), rgba(46, 125, 50, 0.7)), url('images/lasagna.jpg');
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

    

        /* Filter Section */
        .filter-section {
            background: white;
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 40px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }

        .filter-controls {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            align-items: center;
        }

        .filter-group {
            flex: 1;
            min-width: 200px;
        }

        .filter-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            color: #333;
            font-size: 0.95em;
        }

        .filter-select {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 1em;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .filter-select:focus {
            outline: none;
            border-color: #11989B;
        }

        .filter-btn {
            background: #0F445F;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 10px;
            font-size: 1em;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            margin-top: 24px;
        }

        .filter-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(245, 87, 108, 0.4);
        }

        .results-count {
            text-align: center;
            color: white;
            font-size: 1.2em;
            margin-bottom: 20px;
            font-weight: 500;
        }

        /* Restaurant Grid */
        .restaurant-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 30px;
            padding: 20px;
        }

        .restaurant-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }

        .restaurant-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }

        .restaurant-image {
            width: 100%;
            height: 220px;
            background-size: cover;
            background-position: center;
            position: relative;
        }

        .restaurant-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255,255,255,0.95);
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 600;
            color: #0F445F;
        }

        .restaurant-content {
            padding: 25px;
        }

        .restaurant-header {
            margin-bottom: 15px;
        }

        .restaurant-name {
            font-size: 1.5em;
            font-weight: 700;
            color: #333;
            margin-bottom: 5px;
        }

        .restaurant-location {
            color: #666;
            font-size: 0.95em;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .restaurant-location::before {
            content: '📍';
        }

        .restaurant-cuisine {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-bottom: 15px;
        }

        .cuisine-tag {
            background: #f0f0f0;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.85em;
            color: #555;
        }

        .restaurant-description {
            color: #666;
            line-height: 1.6;
            margin-bottom: 15px;
            font-size: 0.95em;
        }

        .restaurant-details {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 15px;
            border-top: 1px solid #e0e0e0;
        }

        .price-range {
            font-weight: 600;
            color: #0F445F;
            font-size: 1.1em;
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.85);
            animation: fadeIn 0.3s ease;
        }

        .modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background: white;
            border-radius: 25px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: slideUp 0.4s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
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
            height: 300px;
            background-size: cover;
            background-position: center;
            border-radius: 25px 25px 0 0;
            position: relative;
        }

        .close-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            background: white;
            border: none;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            font-size: 1.8em;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            z-index: 10;
        }

        .close-btn:hover {
            background: #f0f0f0;
            transform: rotate(90deg);
        }

        .modal-body {
            padding: 35px;
        }

        .modal-title {
            font-size: 2.5em;
            color: #333;
            margin-bottom: 10px;
        }

        .modal-section {
            margin-bottom: 25px;
        }

        .modal-section h3 {
            color: #0F445F;
            font-size: 1.4em;
            margin-bottom: 12px;
            padding-bottom: 8px;
        }

        .modal-section p {
            line-height: 1.8;
            color: #555;
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
            content: '';
            position: absolute;
            left: 0;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 15px;
        }

        .info-item {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 10px;
        }

        .info-item strong {
            display: block;
            color: #333;
            margin-bottom: 5px;
        }

        .info-item span {
            color: #666;
        }

        .no-results {
            text-align: center;
            padding: 60px 20px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .no-results h2 {
            font-size: 2em;
            color: #333;
            margin-bottom: 10px;
        }

        .no-results p {
            color: #666;
            font-size: 1.1em;
        }

        @media (max-width: 768px) {
            .page-header h1 {
                font-size: 2.5em;
            }

            .filter-controls {
                flex-direction: column;
            }

            .filter-group {
                width: 100%;
            }

            .restaurant-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
<header>
    <h1>Food & Drinks</h1>
    <p>Savour Kenyan Food</p>
    <div class="wave"></div>
</header>

        <!-- Filter Section -->
        <div class="filter-section">
            <div class="filter-controls">
                <div class="filter-group">
                    <label for="locationFilter">Location</label>
                    <select id="locationFilter" class="filter-select">
                        <option value="all">All Locations</option>
                        <option value="Nairobi">Nairobi</option>
                        <option value="Mombasa">Mombasa</option>
                        <option value="Diani Beach">Diani Beach</option>
                        <option value="Malindi">Malindi</option>
                        <option value="Nakuru">Nakuru</option>
                        <option value="Kisumu">Kisumu</option>
                        <option value="Lamu">Lamu</option>
                    </select>
                </div>

                <div class="filter-group">
                    <label for="cuisineFilter">Cuisine Type</label>
                    <select id="cuisineFilter" class="filter-select">
                        <option value="all">All Cuisines</option>
                        <option value="Kenyan">Kenyan</option>
                        <option value="Indian">Indian</option>
                        <option value="Italian">Italian</option>
                        <option value="Seafood">Seafood</option>
                        <option value="Asian">Asian</option>
                        <option value="Continental">Continental</option>
                        <option value="BBQ">BBQ & Grill</option>
                    </select>
                </div>

                <div class="filter-group">
                    <label for="priceFilter">Price Range</label>
                    <select id="priceFilter" class="filter-select">
                        <option value="all">All Prices</option>
                        <option value="$">$ - Budget Friendly</option>
                        <option value="$$">$$ - Moderate</option>
                        <option value="$$$">$$$ - Fine Dining</option>
                    </select>
                </div>

                <button class="filter-btn" onclick="applyFilters()">Apply Filters</button>
            </div>
        </div>

        <div class="results-count" id="resultsCount"></div>

        <!-- Restaurant Grid -->
        <div class="restaurant-grid" id="restaurantGrid"></div>
    </div>

    <!-- Modal -->
    <div id="restaurantModal" class="modal" onclick="closeModalOutside(event)">
        <div class="modal-content" onclick="event.stopPropagation()">
            <button class="close-btn" onclick="closeModal()">&times;</button>
            <div class="modal-header" id="modalHeader"></div>
            <div class="modal-body" id="modalBody"></div>
        </div>
    </div>

    <script>
        const restaurants = [
            {
                id: 1,
                name: "Carnivore Restaurant",
                location: "Nairobi",
                cuisine: ["BBQ", "Kenyan"],
                price: "$$$",
                image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
                description: "Legendary all-you-can-eat meat experience featuring exotic game meats and traditional Kenyan barbecue.",
                specialty: "Nyama Choma (grilled meat)",
                hours: "12:00 PM - 11:00 PM Daily",
                phone: "+254 20 6009333",
                highlights: [
                    "Famous for exotic game meats",
                    "All-you-can-eat BBQ experience",
                    "Live entertainment",
                    "Large outdoor seating area"
                ]
            },
            {
                id: 2,
                name: "Tamarind Restaurant",
                location: "Mombasa",
                cuisine: ["Seafood", "Continental"],
                price: "$$$",
                image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
                description: "Award-winning seafood restaurant with stunning views of the Indian Ocean and Mombasa Old Town.",
                specialty: "Fresh Lobster & Seafood Platters",
                hours: "12:00 PM - 11:00 PM Daily",
                phone: "+254 41 2474600",
                highlights: [
                    "Ocean-front dining",
                    "Fresh daily seafood",
                    "Romantic sunset views",
                    "Award-winning wine list"
                ]
            },
            {
                id: 3,
                name: "Mama Oliech",
                location: "Nairobi",
                cuisine: ["Kenyan"],
                price: "$",
                image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
                description: "Authentic Kenyan cuisine serving the best fish and ugali in Nairobi since 1974.",
                specialty: "Fried Fish with Ugali",
                hours: "10:00 AM - 10:00 PM Daily",
                phone: "+254 722 518870",
                highlights: [
                    "Legendary family-run restaurant",
                    "Best fried fish in Nairobi",
                    "Traditional Kenyan atmosphere",
                    "Budget-friendly"
                ]
            },
            {
                id: 4,
                name: "Ali Barbour's Cave Restaurant",
                location: "Diani Beach",
                cuisine: ["Seafood", "Continental"],
                price: "$$$",
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
                description: "Unique dining experience in a natural coral cave, 10 meters underground with open-air roof.",
                specialty: "Seafood in a Cave",
                hours: "6:30 PM - 10:30 PM (Dinner only)",
                phone: "+254 40 3202033",
                highlights: [
                    "Dining in a natural cave",
                    "Romantic candlelit atmosphere",
                    "Fresh seafood specialties",
                    "Unique architectural wonder"
                ]
            },
            {
                id: 5,
                name: "Haandi Restaurant",
                location: "Nairobi",
                cuisine: ["Indian"],
                price: "$$",
                image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
                description: "Premium Indian cuisine with authentic North Indian flavors and elegant ambiance.",
                specialty: "Tandoori & Curries",
                hours: "12:00 PM - 3:00 PM, 6:30 PM - 11:00 PM",
                phone: "+254 20 4451861",
                highlights: [
                    "Authentic Indian cuisine",
                    "Clay oven specialties",
                    "Extensive vegetarian options",
                    "Elegant dining atmosphere"
                ]
            },
            {
                id: 6,
                name: "The Talisman",
                location: "Nairobi",
                cuisine: ["Continental", "Asian"],
                price: "$$$",
                image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
                description: "Chic garden restaurant offering innovative fusion cuisine in a beautiful outdoor setting.",
                specialty: "Fusion Cuisine",
                hours: "12:00 PM - 11:00 PM Daily",
                phone: "+254 20 3860333",
                highlights: [
                    "Beautiful garden setting",
                    "Creative fusion dishes",
                    "Excellent cocktail menu",
                    "Romantic ambiance"
                ]
            },
            {
                id: 7,
                name: "Forodhani Gardens",
                location: "Lamu",
                cuisine: ["Seafood", "Kenyan"],
                price: "$",
                image: "https://images.unsplash.com/photo-1580959375944-0b6c33780a0c?w=800",
                description: "Waterfront dining with fresh seafood and traditional Swahili dishes at sunset.",
                specialty: "Grilled Seafood & Swahili Dishes",
                hours: "6:00 PM - 11:00 PM Daily",
                phone: "+254 722 456789",
                highlights: [
                    "Waterfront location",
                    "Fresh daily catch",
                    "Sunset dining",
                    "Traditional Swahili cooking"
                ]
            },
            {
                id: 8,
                name: "Nyama Mama",
                location: "Nairobi",
                cuisine: ["Kenyan"],
                price: "$$",
                image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
                description: "Modern take on traditional Kenyan cuisine in a vibrant, contemporary setting.",
                specialty: "Contemporary Kenyan Cuisine",
                hours: "11:00 AM - 11:00 PM Daily",
                phone: "+254 707 222333",
                highlights: [
                    "Modern Kenyan fusion",
                    "Trendy atmosphere",
                    "Creative cocktails",
                    "Instagram-worthy presentations"
                ]
            },
            {
                id: 9,
                name: "Tamambo Karen Blixen",
                location: "Nairobi",
                cuisine: ["Continental", "Kenyan"],
                price: "$$$",
                image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800",
                description: "Elegant dining in a colonial-style house with beautiful gardens and exceptional service.",
                specialty: "Contemporary Continental",
                hours: "12:00 PM - 10:30 PM Daily",
                phone: "+254 20 8562198",
                highlights: [
                    "Historic colonial setting",
                    "Beautiful gardens",
                    "Fine dining experience",
                    "Private dining rooms"
                ]
            },
            {
                id: 10,
                name: "Forty Thieves Beach Bar",
                location: "Diani Beach",
                cuisine: ["Seafood", "BBQ"],
                price: "$$",
                image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800",
                description: "Beachfront bar and restaurant with fresh seafood and spectacular ocean views.",
                specialty: "Seafood BBQ",
                hours: "11:00 AM - 11:00 PM Daily",
                phone: "+254 726 665544",
                highlights: [
                    "Right on the beach",
                    "Fresh seafood BBQ",
                    "Tropical cocktails",
                    "Sunset views"
                ]
            },
            {
                id: 11,
                name: "Misono",
                location: "Nairobi",
                cuisine: ["Asian"],
                price: "$$",
                image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
                description: "Premier Japanese restaurant offering authentic sushi, teppanyaki, and Asian fusion.",
                specialty: "Sushi & Teppanyaki",
                hours: "12:00 PM - 2:30 PM, 6:30 PM - 10:30 PM",
                phone: "+254 20 2719222",
                highlights: [
                    "Authentic Japanese cuisine",
                    "Live teppanyaki stations",
                    "Fresh sushi bar",
                    "Elegant ambiance"
                ]
            },
            {
                id: 12,
                name: "Tilapia Restaurant",
                location: "Kisumu",
                cuisine: ["Kenyan", "Seafood"],
                price: "$",
                image: "https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=800",
                description: "Lakeside restaurant famous for fresh tilapia from Lake Victoria.",
                specialty: "Fresh Tilapia",
                hours: "10:00 AM - 10:00 PM Daily",
                phone: "+254 57 2021355",
                highlights: [
                    "Lake Victoria views",
                    "Fresh fish daily",
                    "Traditional preparation",
                    "Local favorite"
                ]
            }
        ];

        let filteredRestaurants = [...restaurants];

        function renderRestaurants(restaurantsToRender) {
            const grid = document.getElementById('restaurantGrid');
            const resultsCount = document.getElementById('resultsCount');
            
            if (restaurantsToRender.length === 0) {
                grid.innerHTML = `
                    <div class="no-results" style="grid-column: 1/-1;">
                        <h2>No restaurants found</h2>
                        <p>Try adjusting your filters to see more results</p>
                    </div>
                `;
                resultsCount.textContent = '';
                return;
            }

            resultsCount.textContent = `Showing ${restaurantsToRender.length} restaurant${restaurantsToRender.length !== 1 ? 's' : ''}`;
            
            grid.innerHTML = restaurantsToRender.map(restaurant => `
                <div class="restaurant-card" onclick="openModal(${restaurant.id})">
                    <div class="restaurant-image" style="background-image: url('${restaurant.image}')">
                        <div class="restaurant-badge">${restaurant.price}</div>
                    </div>
                    <div class="restaurant-content">
                        <div class="restaurant-header">
                            <h3 class="restaurant-name">${restaurant.name}</h3>
                            <p class="restaurant-location">${restaurant.location}</p>
                        </div>
                        <div class="restaurant-cuisine">
                            ${restaurant.cuisine.map(c => `<span class="cuisine-tag">${c}</span>`).join('')}
                        </div>
                        <p class="restaurant-description">${restaurant.description}</p>
                        <div class="restaurant-details">
                            <span class="price-range">${restaurant.price}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function applyFilters() {
            const location = document.getElementById('locationFilter').value;
            const cuisine = document.getElementById('cuisineFilter').value;
            const price = document.getElementById('priceFilter').value;

            filteredRestaurants = restaurants.filter(restaurant => {
                const matchLocation = location === 'all' || restaurant.location === location;
                const matchCuisine = cuisine === 'all' || restaurant.cuisine.includes(cuisine);
                const matchPrice = price === 'all' || restaurant.price === price;
                
                return matchLocation && matchCuisine && matchPrice;
            });

            renderRestaurants(filteredRestaurants);
        }

        function openModal(id) {
            const restaurant = restaurants.find(r => r.id === id);
            const modal = document.getElementById('restaurantModal');
            const modalHeader = document.getElementById('modalHeader');
            const modalBody = document.getElementById('modalBody');

            modalHeader.style.backgroundImage = `url('${restaurant.image}')`;

            modalBody.innerHTML = `
                <h2 class="modal-title">${restaurant.name}</h2>
                
                <div class="info-grid">
                    <div class="info-item">
                        <strong>📍 Location</strong>
                        <span>${restaurant.location}</span>
                    </div>
                    <div class="info-item">
                        <strong>💰 Price Range</strong>
                        <span>${restaurant.price}</span>
                    </div>
                    <div class="info-item">
                        <strong>📞 Phone</strong>
                        <span>${restaurant.phone}</span>
                    </div>
                </div>

                <div class="modal-section">
                    <h3>About</h3>
                    <p>${restaurant.description}</p>
                </div>

                <div class="modal-section">
                    <h3>Specialty</h3>
                    <p>${restaurant.specialty}</p>
                </div>

                <div class="modal-section">
                    <h3>Cuisine</h3>
                    <p>${restaurant.cuisine.join(', ')}</p>
                </div>

                <div class="modal-section">
                    <h3>Opening Hours</h3>
                    <p>${restaurant.hours}</p>
                </div>

                <div class="modal-section">
                    <h3>Highlights</h3>
                    <ul>
                        ${restaurant.highlights.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                </div>
            `;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            const modal = document.getElementById('restaurantModal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function closeModalOutside(event) {
            if (event.target.id === 'restaurantModal') {
                closeModal();
            }
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });

        // Initial render
        renderRestaurants(restaurants);
    </script>
</body>
</html>