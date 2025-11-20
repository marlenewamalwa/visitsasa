<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Food & Drink in Kenya - Culinary Guide</title>
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
            background-color: #fafafa;
        }

        header {
            background: linear-gradient(135deg, #D2691E 0%, #8B4513 100%);
            color: white;
            padding: 4rem 2rem;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        header::before {
            content: '🍛';
            position: absolute;
            font-size: 15rem;
            opacity: 0.1;
            top: -3rem;
            right: -2rem;
        }

        header h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            position: relative;
        }

        header p {
            font-size: 1.3rem;
            opacity: 0.95;
            max-width: 800px;
            margin: 0 auto;
            position: relative;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
        }

        .intro-section {
            background: white;
            padding: 3rem;
            border-radius: 15px;
            margin-bottom: 3rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .intro-section h2 {
            color: #8B4513;
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        .intro-section p {
            color: #67747c;
            font-size: 1.1rem;
            line-height: 1.8;
        }

        .category-section {
            margin-bottom: 4rem;
        }

        .category-header {
            text-align: center;
            margin-bottom: 2.5rem;
        }

        .category-header h2 {
            font-size: 2.5rem;
            color: #142b44;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
        }

        .category-header p {
            color: #67747c;
            font-size: 1.1rem;
        }

        .food-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2rem;
        }

        .food-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            transition: all 0.3s;
            cursor: pointer;
            border: 2px solid transparent;
        }

        .food-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            border-color: #D2691E;
        }

        .food-image {
            height: 200px;
            background-size: cover;
            background-position: center;
            position: relative;
        }

        .food-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255,255,255,0.95);
            padding: 0.5rem 1rem;
            border-radius: 25px;
            font-weight: 600;
            font-size: 0.85rem;
            color: #8B4513;
            backdrop-filter: blur(10px);
        }

        .food-content {
            padding: 1.5rem;
        }

        .food-content h3 {
            font-size: 1.5rem;
            color: #142b44;
            margin-bottom: 0.8rem;
        }

        .food-content p {
            color: #67747c;
            margin-bottom: 1rem;
            line-height: 1.7;
        }

        .food-details {
            display: flex;
            gap: 0.8rem;
            flex-wrap: wrap;
        }

        .detail-tag {
            background: #FFF3E0;
            color: #D2691E;
            padding: 0.4rem 0.9rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
        }

        .price-indicator {
            background: #E8F5E9;
            color: #2E7D32;
            padding: 0.4rem 0.9rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
        }

        .highlight-box {
            background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);
            padding: 2rem;
            border-radius: 15px;
            margin: 3rem 0;
            border-left: 5px solid #D2691E;
        }

        .highlight-box h3 {
            color: #8B4513;
            font-size: 1.8rem;
            margin-bottom: 1rem;
        }

        .highlight-box ul {
            list-style: none;
            padding: 0;
        }

        .highlight-box li {
            padding: 0.5rem 0;
            color: #5D4037;
            font-size: 1.05rem;
        }

        .highlight-box li::before {
            content: '✓';
            color: #D2691E;
            font-weight: bold;
            margin-right: 1rem;
        }

        .drinks-section {
            background: white;
            padding: 3rem;
            border-radius: 15px;
            margin-top: 3rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .drinks-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }

        .drink-card {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 1.5rem;
            border-radius: 10px;
            border-left: 4px solid #D2691E;
            transition: all 0.3s;
        }

        .drink-card:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .drink-card h4 {
            color: #142b44;
            font-size: 1.3rem;
            margin-bottom: 0.8rem;
        }

        .drink-card p {
            color: #67747c;
            line-height: 1.6;
        }

        @media (max-width: 768px) {
            header h1 {
                font-size: 2.5rem;
            }

            .food-grid {
                grid-template-columns: 1fr;
            }

            .intro-section {
                padding: 2rem;
            }
        }
    </style>
</head>
<body>
<div class="container">
               <?php
        $food_categories = [
            'Staple Foods & Mains' => [
                [
                    'name' => 'Ugali',
                    'description' => 'Kenya\'s national dish and most popular staple. Made from white or yellow cornmeal cooked in boiling water until thick and dough-like. Served with stews, vegetables, or grilled meat.',
                    'type' => 'Staple',
                    'price' => '$',
                    'color' => '#F5DEB3'
                ],
                [
                    'name' => 'Nyama Choma',
                    'description' => 'Kenya\'s unofficial national dish meaning "grilled meat" in Swahili. Usually goat, but also beef or chicken, slow-cooked over hot coals until tender. Served with kachumbari and ugali.',
                    'type' => 'Main Dish',
                    'price' => '$$',
                    'color' => '#8B4513'
                ],
                [
                    'name' => 'Pilau',
                    'description' => 'Fragrant rice dish cooked with aromatic spices including cardamom, cinnamon, cumin, and cloves. Often prepared with meat, tomatoes, and onions. A celebratory dish influenced by Indian cuisine.',
                    'type' => 'Main Dish',
                    'price' => '$$',
                    'color' => '#DAA520'
                ],
                [
                    'name' => 'Githeri',
                    'description' => 'Nutritious mixture of boiled maize (corn) and beans, sometimes with added vegetables. A hearty, protein-rich dish popular across Kenya. Often served with sukuma wiki and meat.',
                    'type' => 'Main Dish',
                    'price' => '$',
                    'color' => '#CD853F'
                ],
                [
                    'name' => 'Irio (Mukimo)',
                    'description' => 'Traditional Kikuyu dish of mashed green peas, potatoes, corn, and sometimes spinach or kale. Starchy, filling comfort food often served with grilled meat and stews.',
                    'type' => 'Side Dish',
                    'price' => '$',
                    'color' => '#90EE90'
                ],
                [
                    'name' => 'Matoke',
                    'description' => 'Rich stew made with green bananas, tomatoes, onions, garlic, and spices. Originally from Uganda but popular in Kenya. Creates a thick, savory gravy perfect with rice or ugali.',
                    'type' => 'Main Dish',
                    'price' => '$$',
                    'color' => '#FFD700'
                ]
            ],
            'Coastal & Swahili Specialties' => [
                [
                    'name' => 'Kuku Paka',
                    'description' => 'Coastal chicken curry cooked in creamy coconut milk with Indian and Arabian spices. Chicken is often grilled first for a smoky flavor. A signature dish of Kenya\'s coast.',
                    'type' => 'Curry',
                    'price' => '$$',
                    'color' => '#FF6347'
                ],
                [
                    'name' => 'Wali wa Nazi',
                    'description' => 'Coconut rice - white rice cooked with freshly grated coconut meat. Fragrant and slightly sweet, it\'s a coastal staple perfect with fish curries or chicken dishes.',
                    'type' => 'Rice Dish',
                    'price' => '$',
                    'color' => '#F0FFF0'
                ],
                [
                    'name' => 'Biriani',
                    'description' => 'Aromatic spiced rice dish layered with marinated meat (chicken, goat, or beef), potatoes, and boiled eggs. Infused with saffron, cardamom, and other spices. A festive coastal favorite.',
                    'type' => 'Main Dish',
                    'price' => '$$$',
                    'color' => '#FFD700'
                ],
                [
                    'name' => 'Samaki wa Kupaka',
                    'description' => 'Grilled fish covered in rich coconut curry sauce with tamarind, garlic, and spices. A popular coastal dish showcasing fresh Indian Ocean seafood.',
                    'type' => 'Seafood',
                    'price' => '$$$',
                    'color' => '#4682B4'
                ],
                [
                    'name' => 'Mkate wa Ufuta',
                    'description' => 'Coastal bread made with coconut milk, giving it a soft, slightly sweet texture. Perfect for breakfast or as a side with curries and stews.',
                    'type' => 'Bread',
                    'price' => '$',
                    'color' => '#DEB887'
                ],
                [
                    'name' => 'Mahamri',
                    'description' => 'Sweet, spiced deep-fried bread flavored with coconut milk and cardamom. A coastal breakfast favorite often served with pigeon peas in coconut milk.',
                    'type' => 'Breakfast',
                    'price' => '$',
                    'color' => '#F4A460'
                ]
            ],
            'Street Food & Snacks' => [
                [
                    'name' => 'Mandazi',
                    'description' => 'Kenya\'s beloved "African doughnut" - triangular deep-fried bread slightly sweetened with coconut and cardamom. Best eaten fresh and warm with chai tea.',
                    'type' => 'Snack',
                    'price' => '$',
                    'color' => '#FFE4B5'
                ],
                [
                    'name' => 'Mutura',
                    'description' => 'Kenyan blood sausage made from goat, cow, or lamb intestines stuffed with meat, blood, onions, and spices. Grilled over charcoal for a smoky flavor. Popular street food.',
                    'type' => 'Street Food',
                    'price' => '$',
                    'color' => '#8B0000'
                ],
                [
                    'name' => 'Chips Mayai',
                    'description' => 'Popular snack combining French fries folded into an egg omelet. Often served with kachumbari salad and tomato sauce. Simple but satisfying comfort food.',
                    'type' => 'Street Food',
                    'price' => '$',
                    'color' => '#FFD700'
                ],
                [
                    'name' => 'Bhajia (Pakora)',
                    'description' => 'Crispy deep-fried fritters made with potatoes, onions, or spinach coated in spiced chickpea batter. Served hot with mango chutney (madras) or tamarind sauce.',
                    'type' => 'Snack',
                    'price' => '$',
                    'color' => '#F0E68C'
                ],
                [
                    'name' => 'Roasted Maize',
                    'description' => 'Fresh corn roasted over charcoal until lightly charred. Often brushed with butter and sprinkled with lime and chili. Found on nearly every street corner.',
                    'type' => 'Street Food',
                    'price' => '$',
                    'color' => '#FFD700'
                ],
                [
                    'name' => 'Mishkaki',
                    'description' => 'Seasoned meat skewers (beef, goat, or chicken) marinated in spices and grilled over charcoal. Tender, smoky, and bursting with flavor. Popular evening snack.',
                    'type' => 'Street Food',
                    'price' => '$$',
                    'color' => '#A0522D'
                ],
                [
                    'name' => 'Mkate Mayai',
                    'description' => 'Coastal street food meaning "bread eggs" - a mandazi-like dough stuffed with minced meat and egg, then grilled. A hearty, portable snack.',
                    'type' => 'Street Food',
                    'price' => '$',
                    'color' => '#DEB887'
                ],
                [
                    'name' => 'Samosa',
                    'description' => 'Triangular pastry filled with spiced meat or vegetables, deep-fried until crispy. Indian-influenced snack found everywhere from street stalls to restaurants.',
                    'type' => 'Snack',
                    'price' => '$',
                    'color' => '#D2691E'
                ]
            ],
            'Vegetables & Side Dishes' => [
                [
                    'name' => 'Sukuma Wiki',
                    'description' => 'Collard greens or kale sautéed with tomatoes, onions, and spices. The name means "stretch the week" - an affordable, nutritious staple served with almost every meal.',
                    'type' => 'Vegetable',
                    'price' => '$',
                    'color' => '#228B22'
                ],
                [
                    'name' => 'Kachumbari',
                    'description' => 'Fresh tomato and onion salsa with coriander, chili, and lime juice. Tangy and spicy, it\'s the perfect accompaniment to grilled meats and heavy dishes.',
                    'type' => 'Salad',
                    'price' => '$',
                    'color' => '#FF6347'
                ],
                [
                    'name' => 'Maharagwe',
                    'description' => 'Red kidney beans simmered in rich coconut milk with tomatoes, onions, and aromatic spices. Creamy and satisfying, served with rice, ugali, or chapati.',
                    'type' => 'Bean Dish',
                    'price' => '$',
                    'color' => '#8B0000'
                ],
                [
                    'name' => 'Chapati',
                    'description' => 'Unleavened flatbread made from wheat flour, water, and oil. Soft, layered, and versatile - the perfect accompaniment to stews, curries, and grilled meats.',
                    'type' => 'Bread',
                    'price' => '$',
                    'color' => '#F5DEB3'
                ]
            ],
            'Desserts & Sweets' => [
                [
                    'name' => 'Mabuyu',
                    'description' => 'Baobab seeds coated in colorful sugar candy, available in flavors like chili, strawberry, and tamarind. A unique coastal sweet sold by street vendors.',
                    'type' => 'Candy',
                    'price' => '$',
                    'color' => '#FF1493'
                ],
                [
                    'name' => 'Biskuti ya Nazi',
                    'description' => 'Coconut macaroon biscuits - sweet, chewy cookies made with grated coconut. Perfect with tea or as a light dessert.',
                    'type' => 'Cookie',
                    'price' => '$',
                    'color' => '#F5F5DC'
                ],
                [
                    'name' => 'Viazi Karai',
                    'description' => 'Sweet dessert made with sweet potatoes, grated coconut, coconut milk, cinnamon, and sugar. Baked until golden and served warm.',
                    'type' => 'Dessert',
                    'price' => '$',
                    'color' => '#FF8C00'
                ],
                [
                    'name' => 'Kashata',
                    'description' => 'Coconut candy squares made from grated coconut and sugar. Sometimes flavored with peanuts or cardamom. A traditional coastal sweet.',
                    'type' => 'Candy',
                    'price' => '$',
                    'color' => '#FFFACD'
                ]
            ]
        ];

        foreach ($food_categories as $category => $foods) {
            echo '<section class="category-section">';
            echo '<div class="category-header">';
            
            // Add emoji based on category
            $emoji = '🍽️';
            if (strpos($category, 'Coastal') !== false) $emoji = '🥥';
            elseif (strpos($category, 'Street') !== false) $emoji = '🌭';
            elseif (strpos($category, 'Vegetable') !== false) $emoji = '🥬';
            elseif (strpos($category, 'Dessert') !== false) $emoji = '🍰';
            
            echo '<h2>' . $emoji . ' ' . htmlspecialchars($category) . '</h2>';
            echo '</div>';
            
            echo '<div class="food-grid">';
            foreach ($foods as $food) {
                echo '<div class="food-card">';
                echo '<div class="food-image" style="background: linear-gradient(135deg, ' . $food['color'] . ' 0%, ' . $food['color'] . 'dd 100%);">';
                echo '<span class="food-badge">' . htmlspecialchars($food['type']) . '</span>';
                echo '</div>';
                echo '<div class="food-content">';
                echo '<h3>' . htmlspecialchars($food['name']) . '</h3>';
                echo '<p>' . htmlspecialchars($food['description']) . '</p>';
                echo '<div class="food-details">';
                echo '<span class="price-indicator">' . htmlspecialchars($food['price']) . '</span>';
                echo '</div>';
                echo '</div>';
                echo '</div>';
            }
            echo '</div>';
            echo '</section>';
        }
        ?>

        <div class="highlight-box">
            <h3>🌟 Must-Try Food Experiences in Kenya</h3>
            <ul>
                <li><strong>Nyama Choma Joint:</strong> Visit a local barbecue spot and experience Kenya's meat culture with roasted goat</li>
                <li><strong>Coastal Seafood:</strong> Enjoy fresh catch of the day in Mombasa or Malindi with coconut-based curries</li>
                <li><strong>Street Food Tour:</strong> Sample mandazi, bhajia, and mishkaki from Nairobi's vibrant street vendors</li>
                <li><strong>Traditional Feast:</strong> Experience a home-cooked meal with ugali, sukuma wiki, and stew</li>
                <li><strong>Swahili Cuisine:</strong> Explore the unique flavors of pilau, biriani, and kuku paka on the coast</li>
            </ul>
        </div>

        <div class="drinks-section">
            <div class="category-header">
                <h2>🍺 Kenyan Drinks & Beverages</h2>
                <p>Quench your thirst with Kenya's diverse drink culture</p>
            </div>

            <div class="drinks-grid">
                <?php
                $drinks = [
                    [
                        'name' => 'Chai (Kenyan Tea)',
                        'description' => 'The national drink! Sweet, milky tea boiled with tea leaves, milk, and lots of sugar. Often spiced with ginger or cardamom. Enjoyed throughout the day with mandazi or bread.',
                    ],
                    [
                        'name' => 'Kenyan Coffee',
                        'description' => 'World-renowned coffee grown in the highlands. Rich, bold flavor with fruity and wine-like notes. Often exported, but best enjoyed fresh in Kenya.',
                    ],
                    [
                        'name' => 'Tusker Beer',
                        'description' => 'Kenya\'s iconic beer brand since 1922. A crisp 4.2% ABV pale lager perfect for hot days. Slogan: "Bia yangu, Nchi yangu" (My beer, My country). Available in Lager, Malt, Lite, and Cider varieties.',
                    ],
                    [
                        'name' => 'Dawa',
                        'description' => 'Popular cocktail meaning "medicine" in Swahili. Made with vodka, honey, lime, and crushed ice. Served with a wooden stirring stick called a muddler.',
                    ],
                    [
                        'name' => 'Madafu (Coconut Water)',
                        'description' => 'Fresh coconut water straight from young green coconuts. Naturally sweet and hydrating, found along the coast and in Nairobi markets.',
                    ],
                    [
                        'name' => 'Fresh Fruit Juices',
                        'description' => 'Kenya\'s tropical fruits make incredible juices: passion fruit, mango, pineapple, watermelon, and tamarind. Freshly squeezed and incredibly refreshing.',
                    ],
                    [
                        'name' => 'White Cap & Senator',
                        'description' => 'Other popular Kenyan beers. White Cap is crisp and light; Senator is an affordable quality lager made with locally sourced ingredients.',
                    ],
                    [
                        'name' => 'Muratina',
                        'description' => 'Traditional honey wine made by Kikuyu people from honey, sugar cane, and muratina fruit. Strong alcoholic beverage for special occasions.',
                    ],
                    [
                        'name' => 'Tangawizi (Ginger Beer)',
                        'description' => 'Spicy ginger ale with strong ginger flavor. Popular non-alcoholic drink made from fresh ginger, sugar, and lemon. Refreshing and zingy.',
                    ],
                    [
                        'name' => 'Stoney Tangawizi',
                        'description' => 'Commercial ginger-flavored soda with a strong, spicy kick. One of Kenya\'s most popular soft drinks, perfect with grilled meat.',
                    ]
                ];

                foreach ($drinks as $drink) {
                    echo '<div class="drink-card">';
                    echo '<h4>' . htmlspecialchars($drink['name']) . '</h4>';
                    echo '<p>' . htmlspecialchars($drink['description']) . '</p>';
                    echo '</div>';
                }
                ?>
            </div>
        </div>

        <div class="highlight-box" style="margin-top: 3rem;">
            <h3>💡 Food & Drink Tips for Visitors</h3>
            <ul>
                <li><strong>Eat with your hands:</strong> Ugali is traditionally eaten by hand - roll it into a ball and use it to scoop stews</li>
                <li><strong>Try street food:</strong> Some of Kenya's best food comes from street vendors - look for busy stalls</li>
                <li><strong>Drink bottled water:</strong> Stick to bottled or filtered water to avoid stomach issues</li>
                <li><strong>Price guide:</strong> $ = Under 500 KES, $$ = 500-1000 KES, $$$ = Over 1000 KES</li>
                <li><strong>Nyama Choma etiquette:</strong> It's typically ordered by weight (quarter, half, or full kilo)</li>
                <li><strong>Coastal vs Inland:</strong> Coastal cuisine is spicier with more coconut; inland is heartier and meat-focused</li>
                <li><strong>Chai culture:</strong> Refusing chai can be seen as rude - embrace the sweet tea tradition!</li>
                <li><strong>Tusker varieties:</strong> Tusker Lager is the classic, Tusker Malt is richer, Tusker Lite is low-carb</li>
            </ul>
        </div>
    </div>
</body>
</html>