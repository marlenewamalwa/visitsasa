<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Kenya Destinations — Explore by County</title>
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
.back-btn {
 
  color: #0F445F;
  padding: 10px 18px;
  border: none;
 font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;
  margin-bottom: 12px;
}

.back-btn:hover {
  background: #11989B;      /* Accent */
}

.wrap{max-width:1100px;margin:36px auto;padding:24px}


h1{margin:0;font-size:1.6rem}

p.lead{margin:4px 0 0;color:#9aa4b2}

/* controls */
.controls{display:flex;gap:12px;margin:18px 0;flex-wrap:wrap}

select,
input[type="search"]{
  background:#fff;
  border: 1px solid rgba(40, 25, 73, 0.02);
  padding:10px 12px;
  border-radius:10px;
  color:inherit;
  min-width:200px;
}

/* chips */
.chips{display:flex;gap:8px;flex-wrap:wrap}

.chip{
  padding:6px 10px;
  border-radius:999px;
  background:rgba(255,255,255,0.04);
  border:2px solid hsla(219, 75%, 37%, 0.02);
  cursor:pointer;
  font-size:0.85rem;
}

.chip.active{
  background:#11989B;
  color:#fff;
 }

/* grid + cards */
.grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
  gap:16px;
  margin-top:18px;
}

.card{
  background:#fff;
  padding:12px;
  border-radius:12px;
  border:1px solid #0F445F;
  display:flex;
  flex-direction:column;
  gap:10px;
}

.thumb{
  height:150px;
  border-radius:8px;
  background-size:cover;
  background-position:center;
}

.meta{display:flex;align-items:center;justify-content:space-between}

.meta .title{font-weight:600}

.meta .county{font-size:0.85rem;color:#9aa4b2}

.tags{display:flex;gap:6px;flex-wrap:wrap}

.tag{
  font-size:0.78rem;
  padding:4px 8px;
  border-radius:999px;
  background:rgba(255,255,255,0.02);
  border:1px solid rgba(255,255,255,0.02);
}

/* buttons */
.btn{
  padding:8px 12px;
  border-radius:8px;
  background:#11989B;
  border:none;
  color:#fff;
  cursor:pointer;
}

/* modal */
.modal-backdrop{
  position:fixed;
  inset:0;
  background:rgba(2,6,23,0.6);
  display:none;
  align-items:center;
  justify-content:center;
  padding:24px;
}

.modal{
  max-width:900px;
  width:100%;
  background:#0F445F;
  color: #fff;
  border-radius:12px;
  padding:18px;
  border:1px solid rgba(255,255,255,0.04);
  box-shadow:0 10px 30px rgba(2,6,23,0.8);
}

.modal .top{display:flex;gap:12px}

.modal .top .left{flex:1}

.modal .top .right{width:320px}

.modal .big-img{
  height:220px;
  border-radius:10px;
  background-size:cover;
  background-position:center;
}

.close-x{
  background:transparent;
  border:0;
  color:#9aa4b2;
  font-size:1.1rem;
  cursor:pointer;
}

.info-list{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px;
  margin-top:12px;
}

.info-list p{margin:0}

footer{margin-top:26px;color:#9aa4b2;font-size:0.9rem}

/* responsive */
@media (max-width:720px){
  .modal .top{flex-direction:column}
  .modal .top .right{width:100%}
  .info-list{grid-template-columns:1fr}
}

  </style>
</head>
<body>
  <?php include 'header.php'; ?>
  <div class="wrap">
    <header>
      <div >
        <button class="back-btn" onclick="goBack()">← Back</button>
        <h1>Explore Kenya — Destinations by County</h1>
        <p class="lead">Filter by county, search for a place, and open a destination to see full attraction details.</p>
      </div>
      
    </header>

    <div class="controls">
      <select id="countySelect">
        <option value="all">All counties</option>
      </select>
      <input type="search" id="search" placeholder="Search destinations or attractions..." />
      <div style="margin-left:auto" class="chips" id="countyChips"></div>
    </div>

    <div id="grid" class="grid"></div>

    <footer>
      Tip: click on a card's "View" button to open a detailed popup with attractions, best time to visit, how to get there and contact links.
    </footer>
  </div>

  <!-- Modal -->
  <div id="modalBackdrop" class="modal-backdrop">
    <div class="modal" role="dialog" aria-modal="true">
      <div style="display:flex;justify-content:space-between;align-items:center"><h2 id="modalTitle">Title</h2><button class="close-x" id="closeModal">✕</button></div>
      <div class="top">
        <div class="left">
          <div id="modalImage" class="big-img"></div>
          <p id="modalDescription" style="margin-top:12px;color:var(--muted)"></p>

          <div class="info-list">
            <div>
              <h4 style="margin:6px 0 4px">Key Attractions</h4>
              <ul id="modalAttractions"></ul>
            </div>
            <div>
              <h4 style="margin:6px 0 4px">Practical Info</h4>
              <p><strong>Best time:</strong> <span id="modalBest"></span></p>
              <p><strong>How to get there:</strong> <span id="modalGet"></span></p>
              <p><strong>Contact / More:</strong> <a id="modalContact" target="_blank" rel="noopener">Visit</a></p>
            </div>
          </div>
        </div>
        <div class="right">
          <div style="background:var(--card);padding:12px;border-radius:10px">
            <h4 style="margin:0 0 8px">Quick facts</h4>
            <p id="modalCounty" style="margin:0 0 6px;color:var(--muted)"></p>
            <p id="modalType" style="margin:0 0 6px;color:var(--muted)"></p>
            <div style="margin-top:10px">
              <button class="btn" id="modalAction">Open itinerary</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    function goBack() {
        window.history.back();
    }
    
    // --- Data: destinations array. Add more items here for other counties ---
    const counties = [
      "Nairobi","Mombasa","Kisumu","Nakuru","Narok","Kajiado","Kericho","Baringo","Kiambu","Kakamega",
      "Embu","Meru","Machakos","Tharaka-Nithi","Nyeri","Murang'a","Laikipia","Isiolo","Mandera","Wajir",
      "Garissa","Taita-Taveta","Kwale","Kilifi","Lamu","Tana River","Kitui","Makueni","Busia","Siaya",
      "Homa Bay","Migori","Uasin Gishu","Trans Nzoia","West Pokot","Turkana","Samburu","Bungoma","Vihiga","Busia South",
      "Nyandarua","Kirinyaga","Narok East","Elgeyo-Marakwet","Nandi","Sotik","Kerugoya","Kilgoris","Others"
    ];

    const destinations = [
  // 1 — Nairobi
  {
    id:1,
    title:'Giraffe Manor',
    county:'Nairobi',
    img:'images/giraffemanor.jpeg',
    summary:'World-famous boutique hotel where giraffes poke their heads in during breakfast.',
    attractions:['Giraffes','Luxury stay','Nature sanctuary'],
    best:'All year',
    getThere:'20–30 min from Nairobi CBD',
    contact:'https://www.thesafaricollection.com/',
    type:'Boutique Hotel'
  },

  // 2 — Mombasa
  {
    id:2,
    title:'Sarova Whitesands Beach Resort',
    county:'Mombasa',
    img:'images/sarovawhitesands.webp',
    summary:'Beachfront resort with pools, spa, and easy beach access.',
    attractions:['Beachfront','Pools','Spa'],
    best:'July–March',
    getThere:'Fly to Mombasa airport',
    contact:'https://www.sarovahotels.com/',
    type:'Beach Resort'
  },

  // 3 — Kisumu
  {
    id:3,
    title:'Acacia Premier Hotel',
    county:'Kisumu',
    img:'images/acacia.webp',
    summary:'Upscale hotel overlooking Lake Victoria with dining and rooftop.',
    attractions:['Lake views','Pool','Fine dining'],
    best:'All year',
    getThere:'Fly to Kisumu Airport',
    contact:'https://www.acaciapremier.com/',
    type:'Hotel'
  },

  // 4 — Nakuru
  {
    id:4,
    title:'Sarova Woodlands Hotel',
    county:'Nakuru',
    img:'images/sarovawoodlands.webp',
    summary:'Modern hotel ideal for both safari and business travelers.',
    attractions:['Spacious rooms','Restaurant','Near Lake Nakuru'],
    best:'All year',
    getThere:'2.5 hrs from Nairobi',
    contact:'https://www.sarovahotels.com/',
    type:'Hotel'
  },

  // 5 — Narok
  {
    id:5,
    title:'Mara Serena Safari Lodge',
    county:'Narok',
    img:'images/maraserena.webp',
    summary:'Safari lodge overlooking Maasai Mara plains.',
    attractions:['Game drives','Migration season','Bush dinners'],
    best:'July–October',
    getThere:'Fly to Serena airstrip',
    contact:'https://www.serenahotels.com/',
    type:'Safari Lodge'
  },

  // 6 — Kajiado
  {
    id:6,
    title:'Olkaria Explorers Lodge',
    county:'Kajiado',
    img:'images/Olkaria.webp',
    summary:'Upscale lodge near geothermal hot springs in Naivasha/Kajiado zone.',
    attractions:['Hot springs','Nature trails','Spa'],
    best:'All year',
    getThere:'Drive from Nairobi',
    contact:'https://www.explorerslodge.com/',
    type:'Lodge'
  },

  // 7 — Kericho
  {
    id:7,
    title:'Tea Hotel Kericho',
    county:'Kericho',
    img:'images/teahotel.webp',
    summary:'Colonial hotel surrounded by scenic tea plantations.',
    attractions:['Tea tours','Quiet retreat','Green views'],
    best:'All year',
    getThere:'Drive from Kericho town',
    contact:'#',
    type:'Hotel'
  },

  // 8 — Baringo
  {
    id:8,
    title:'Soi Safari Lodge',
    county:'Baringo',
    img:'images/soisafari.webp',
    summary:'Lodge overlooking Lake Baringo with boat trip access.',
    attractions:['Boat rides','Birdwatching','Lake views'],
    best:'All year',
    getThere:'Drive to Baringo',
    contact:'#',
    type:'Safari Lodge'
  },

  // 9 — Kiambu
  {
    id:9,
    title:'Tribe Hotel',
    county:'Kiambu',
    img:'images/tribe.webp',
    summary:'Luxury boutique hotel near Village Market, bordering Kiambu/Nairobi.',
    attractions:['Luxury suites','Spa','Fine dining'],
    best:'All year',
    getThere:'Near Village Market',
    contact:'https://www.tribe-hotel.com/',
    type:'Boutique Hotel'
  },

  // 10 — Kakamega
  {
    id:10,
    title:'Rondo Retreat Centre',
    county:'Kakamega',
    img:'images/rondoretreat.webp',
    summary:'Nature retreat located inside Kakamega Forest.',
    attractions:['Forest walks','Birdwatching','Quiet stay'],
    best:'All year',
    getThere:'Drive to Kakamega Forest',
    contact:'https://www.rondoretreat.com/',
    type:'Retreat'
  },

  // 11 — Embu
  {
    id:11,
    title:'Oasis Garden Resort',
    county:'Embu',
    img:'images/oasis.webp',
    summary:'Popular hotel near Embu with gardens and conference space.',
    attractions:['Gardens','Restaurant','Conference'],
    best:'All year',
    getThere:'Drive to Embu town',
    contact:'#',
    type:'Hotel'
  },

  // 12 — Meru
  {
    id:12,
    title:'Meru Slopes Hotel',
    county:'Meru',
    img:'images/meruslopes.webp',
    summary:'Modern hotel in Meru town with great accessibility.',
    attractions:['Restaurant','Bar','Comfort rooms'],
    best:'All year',
    getThere:'Drive to Meru town',
    contact:'#',
    type:'Hotel'
  },

  // 13 — Machakos
  {
    id:13,
    title:'Gelian Hotel Machakos',
    county:'Machakos',
    img:'images/gelian.webp',
    summary:'4-star hotel overlooking Machakos hills.',
    attractions:['Rooftop lounge','Pool','Conference rooms'],
    best:'All year',
    getThere:'Drive to Machakos',
    contact:'https://www.gelianhotel.com/',
    type:'Hotel'
  },

  // 14 — Tharaka-Nithi
  {
    id:14,
    title:'Igwamiti Resort',
    county:'Tharaka-Nithi',
    img:'images/igwamiti.jpg',
    summary:'Calm country hotel near Chogoria.',
    attractions:['Nature views','Quiet stay','Restaurant'],
    best:'All year',
    getThere:'Drive to Chogoria',
    contact:'#',
    type:'Resort'
  },

  // 15 — Nyeri
  {
    id:15,
    title:'Aberdare Country Club',
    county:'Nyeri',
    img:'images/aberdare-club.jpg',
    summary:'Charming country lodge with wildlife roaming freely.',
    attractions:['Wildlife','Nature walks','Golf'],
    best:'All year',
    getThere:'Drive from Nyeri/Nanyuki',
    contact:'https://www.aberdarecountryclub.com/',
    type:'Lodge'
  },

  // 16 — Murang\'a
  {
    id:16,
    title:'Golden Palm Hotel',
    county:'Murang\'a',
    img:'images/golden-palm.jpg',
    summary:'Comfortable hotel in Murang’a town.',
    attractions:['Restaurant','Conference','Comfort rooms'],
    best:'All year',
    getThere:'Drive to Murang’a town',
    contact:'#',
    type:'Hotel'
  },

  // 17 — Laikipia
  {
    id:17,
    title:'Fairmont Mount Kenya Safari Club',
    county:'Laikipia',
    img:'images/fairmont-mk.jpg',
    summary:'Luxury lodge with Mt. Kenya views and world-class amenities.',
    attractions:['Mt. Kenya views','Golf course','Luxury stay'],
    best:'All year',
    getThere:'Drive from Nanyuki',
    contact:'https://www.fairmont.com/',
    type:'Safari Club'
  },

  // 18 — Isiolo
  {
    id:18,
    title:'Sarova Shaba Game Lodge',
    county:'Isiolo',
    img:'images/shaba.jpg',
    summary:'Lodge set in Shaba National Reserve.',
    attractions:['Wildlife','Nature trails','Riverside rooms'],
    best:'July–October',
    getThere:'Drive from Isiolo',
    contact:'https://www.sarovahotels.com/',
    type:'Safari Lodge'
  },

  // 19 — Mandera
  {
    id:19,
    title:'Mandera Skylight Hotel',
    county:'Mandera',
    img:'images/mandera.jpg',
    summary:'Simple and secure hotel ideal for business travel.',
    attractions:['Basic rooms','Restaurant','WiFi'],
    best:'All year',
    getThere:'Fly to Mandera',
    contact:'#',
    type:'Hotel'
  },

  // 20 — Wajir
  {
    id:20,
    title:'Wajir Guest House',
    county:'Wajir',
    img:'images/wajir.jpg',
    summary:'Reliable guest house for regional travelers.',
    attractions:['Comfort rooms','Restaurant','Quiet stay'],
    best:'All year',
    getThere:'Fly to Wajir',
    contact:'#',
    type:'Guest House'
  },

  // 21 — Garissa
  {
    id:21,
    title:'Almond Resort Garissa',
    county:'Garissa',
    img:'images/almond-garissa.jpg',
    summary:'Best-rated accommodation in Garissa with modern amenities.',
    attractions:['Pool','Restaurant','Garden'],
    best:'All year',
    getThere:'Drive or fly to Garissa',
    contact:'#',
    type:'Resort'
  },

  // 22 — Taita-Taveta
  {
    id:22,
    title:'Salt Lick Safari Lodge',
    county:'Taita-Taveta',
    img:'images/salt-lick.jpg',
    summary:'Iconic lodge on stilts inside Taita Hills Sanctuary.',
    attractions:['Wildlife','Night viewing deck','Unique architecture'],
    best:'June–October',
    getThere:'Drive from Voi',
    contact:'#',
    type:'Safari Lodge'
  },

  // 23 — Kwale
  {
    id:23,
    title:'Leopard Beach Resort',
    county:'Kwale',
    img:'images/leopard-beach.jpg',
    summary:'Top luxury beachfront resort in Diani.',
    attractions:['Beach','Spa','Pools'],
    best:'July–March',
    getThere:'Fly to Ukunda',
    contact:'#',
    type:'Beach Resort'
  },

  // 24 — Kilifi
  {
    id:24,
    title:'Medina Palms',
    county:'Kilifi',
    img:'images/medina-palms.jpg',
    summary:'Elegant Swahili-style beachfront resort.',
    attractions:['Beach','Pools','Spa'],
    best:'All year',
    getThere:'Fly to Malindi',
    contact:'#',
    type:'Resort'
  },

  // 25 — Lamu
  {
    id:25,
    title:'Peponi Hotel',
    county:'Lamu',
    img:'images/peponi.jpg',
    summary:'Seafront boutique hotel in Shela Village.',
    attractions:['Sea views','Boat rides','Dhow culture'],
    best:'All year',
    getThere:'Fly to Lamu + 10 min boat',
    contact:'#',
    type:'Boutique Hotel'
  },

  // 26 — Tana River
  {
    id:26,
    title:'Tana Delta Lodge',
    county:'Tana River',
    img:'images/tana-lodge.jpg',
    summary:'Remote eco-lodge near the delta region.',
    attractions:['River views','Birdlife','Nature'],
    best:'July–October',
    getThere:'Drive to Tana Delta',
    contact:'#',
    type:'Eco-Lodge'
  },

  // 27 — Kitui
  {
    id:27,
    title:'Kitui Premier Hotel',
    county:'Kitui',
    img:'images/kitui-premier.jpg',
    summary:'Modern hotel serving Kitui travelers.',
    attractions:['Restaurant','Bar','Conference'],
    best:'All year',
    getThere:'Drive to Kitui town',
    contact:'#',
    type:'Hotel'
  },

  // 28 — Makueni
  {
    id:28,
    title:'Tulia Hotel Wote',
    county:'Makueni',
    img:'images/tulia-wote.jpg',
    summary:'Reliable hotel with modern rooms in Wote.',
    attractions:['Restaurant','Comfort','WiFi'],
    best:'All year',
    getThere:'Drive to Wote town',
    contact:'#',
    type:'Hotel'
  },

  // 29 — Busia
  {
    id:29,
    title:'Border Palace Hotel',
    county:'Busia',
    img:'images/busia.jpg',
    summary:'Convenient hotel near the Kenya-Uganda border.',
    attractions:['Restaurant','Conference','Good location'],
    best:'All year',
    getThere:'Drive to Busia town',
    contact:'#',
    type:'Hotel'
  },

  // 30 — Siaya
  {
    id:30,
    title:'Pride Inn Rusinga',
    county:'Siaya',
    img:'images/rusinga.jpg',
    summary:'Resort-style stay near Lake Victoria islands.',
    attractions:['Lake activities','Nature','Relaxation'],
    best:'All year',
    getThere:'Drive or boat depending on location',
    contact:'#',
    type:'Resort'
  },

  // 31 — Homa Bay
  {
    id:31,
    title:'Rusinga Island Lodge',
    county:'Homa Bay',
    img:'images/rusinga-lodge.jpg',
    summary:'Lakefront lodge with island activities.',
    attractions:['Boat rides','Birding','Island tours'],
    best:'All year',
    getThere:'Fly to Kisumu + road',
    contact:'#',
    type:'Lodge'
  },

  // 32 — Migori
  {
    id:32,
    title:'Gracey Inn',
    county:'Migori',
    img:'images/migori.jpg',
    summary:'Business-friendly hotel in Migori town.',
    attractions:['Restaurant','Parking','Comfort'],
    best:'All year',
    getThere:'Drive to Migori',
    contact:'#',
    type:'Hotel'
  },

  // 33 — Uasin Gishu
  {
    id:33,
    title:'Boma Inn Eldoret',
    county:'Uasin Gishu',
    img:'images/boma-eldoret.jpg',
    summary:'Upscale business hotel in Eldoret.',
    attractions:['Restaurant','Gym','Conference'],
    best:'All year',
    getThere:'Fly to Eldoret Airport',
    contact:'#',
    type:'Hotel'
  },

  // 34 — Trans Nzoia
  {
    id:34,
    title:'Aturukan Hotel',
    county:'Trans Nzoia',
    img:'images/aturukan.jpg',
    summary:'Modern hotel in Kitale with amenities.',
    attractions:['Pool','Gym','Restaurant'],
    best:'All year',
    getThere:'Drive to Kitale',
    contact:'#',
    type:'Hotel'
  },

  // 35 — West Pokot
  {
    id:35,
    title:'Chandamali Resort',
    county:'West Pokot',
    img:'images/pokot.jpg',
    summary:'Quiet countryside resort in Kapenguria.',
    attractions:['Nature','Restaurant','Quiet Stay'],
    best:'All year',
    getThere:'Drive to Kapenguria',
    contact:'#',
    type:'Resort'
  },

  // 36 — Turkana
  {
    id:36,
    title:'Cradle Tented Camp',
    county:'Turkana',
    img:'images/cradle.jpg',
    summary:'Premier lodge in Lodwar with modern tented suites.',
    attractions:['Pool','Restaurant','Luxury tents'],
    best:'All year',
    getThere:'Fly to Lodwar',
    contact:'https://www.cradletentedcamp.com/',
    type:'Tented Camp'
  },

  // 37 — Samburu
  {
    id:37,
    title:'Samburu Intrepids',
    county:'Samburu',
    img:'images/samburu-intrepids.jpg',
    summary:'Riverfront camp inside Samburu Reserve.',
    attractions:['Game drives','Luxury tents','River views'],
    best:'June–October',
    getThere:'Fly to Samburu airstrip',
    contact:'#',
    type:'Safari Camp'
  },

  // 38 — Bungoma
  {
    id:38,
    title:'Elegant Hotel Bungoma',
    county:'Bungoma',
    img:'images/bungoma.jpg',
    summary:'Business hotel in Bungoma town.',
    attractions:['Restaurant','WiFi','Conference'],
    best:'All year',
    getThere:'Drive to Bungoma',
    contact:'#',
    type:'Hotel'
  },

  // 39 — Vihiga
  {
    id:39,
    title:'Broadpark Hotel',
    county:'Vihiga',
    img:'images/vihiga.jpg',
    summary:'Simple but comfortable hotel for Vihiga visitors.',
    attractions:['Restaurant','Parking','Comfort'],
    best:'All year',
    getThere:'Drive to Vihiga',
    contact:'#',
    type:'Hotel'
  },

  // 40 — Busia South
  {
    id:40,
    title:'Sunrise Hotel Busia South',
    county:'Busia South',
    img:'images/busia-south.jpg',
    summary:'Clean, friendly stay for border travelers.',
    attractions:['Restaurant','WiFi','Spacious rooms'],
    best:'All year',
    getThere:'Drive to Busia South',
    contact:'#',
    type:'Hotel'
  },

  // 41 — Nyandarua
  {
    id:41,
    title:'Panorama Park Hotel',
    county:'Nyandarua',
    img:'images/panorama.jpg',
    summary:'Comfortable hotel near Nyahururu.',
    attractions:['Views','Restaurant','Quiet retreat'],
    best:'All year',
    getThere:'Drive to Nyahururu',
    contact:'#',
    type:'Hotel'
  },

  // 42 — Kirinyaga
  {
    id:42,
    title:'Starwood Hotel Kerugoya',
    county:'Kirinyaga',
    img:'images/starwood-kerugoya.jpg',
    summary:'Hospitality hub in Kerugoya.',
    attractions:['Restaurant','Conference','Clean rooms'],
    best:'All year',
    getThere:'Drive to Kerugoya',
    contact:'#',
    type:'Hotel'
  },

  // 43 — Narok East
  {
    id:43,
    title:'Mara Siana Camp',
    county:'Narok East',
    img:'images/mara-siana.jpg',
    summary:'Tented safari camp on the eastern side of Mara.',
    attractions:['Big cats','Game drives','Luxury tents'],
    best:'July–October',
    getThere:'Fly to Siana',
    contact:'#',
    type:'Safari Camp'
  },

  // 44 — Elgeyo-Marakwet
  {
    id:44,
    title:'Taidy’s Hotel Iten',
    county:'Elgeyo-Marakwet',
    img:'images/iten.jpg',
    summary:'Popular with athletes training in Iten.',
    attractions:['Great views','Restaurant','Training hub'],
    best:'All year',
    getThere:'Drive to Iten',
    contact:'#',
    type:'Hotel'
  },

  // 45 — Nandi
  {
    id:45,
    title:'Nandi Cottages',
    county:'Nandi',
    img:'images/nandi.jpg',
    summary:'Calm countryside cottages surrounded by tea farms.',
    attractions:['Nature','Tea fields','Quiet stay'],
    best:'All year',
    getThere:'Drive to Nandi Hills',
    contact:'#',
    type:'Cottages'
  },

  // 46 — Sotik
  {
    id:46,
    title:'Sotik View Hotel',
    county:'Sotik',
    img:'images/sotik.jpg',
    summary:'Simple hotel serving the Sotik region.',
    attractions:['Restaurant','Parking','Comfort rooms'],
    best:'All year',
    getThere:'Drive to Sotik',
    contact:'#',
    type:'Hotel'
  },

  // 47 — Kerugoya (duplicate county in your array)
  {
    id:47,
    title:'Legacy Hotel Kerugoya',
    county:'Kerugoya',
    img:'images/legacy.jpg',
    summary:'Well-rated hotel in Kerugoya town.',
    attractions:['Restaurant','Lounge','Parking'],
    best:'All year',
    getThere:'Drive to Kerugoya',
    contact:'#',
    type:'Hotel'
  },

  // 48 — Kilgoris
  {
    id:48,
    title:'Osupuko Lodges Kilgoris',
    county:'Kilgoris',
    img:'images/kilgoris.jpg',
    summary:'Lodge offering nature views and safari access.',
    attractions:['Cultural tours','Nature','Comfort rooms'],
    best:'All year',
    getThere:'Drive to Kilgoris',
    contact:'#',
    type:'Lodge'
  },

  // 49 — Others
  {
    id:49,
    title:'Kenya Country Guest House',
    county:'Others',
    img:'images/other.jpg',
    summary:'General option representing counties not listed.',
    attractions:['Comfort','Restaurant','WiFi'],
    best:'All year',
    getThere:'Varies',
    contact:'#',
    type:'Guest House'
  }
];


    // Populate county select + chips
    const countySelect = document.getElementById('countySelect');
    const countyChips = document.getElementById('countyChips');
    const uniqueCounties = [...new Set(counties)].sort();
    uniqueCounties.forEach(c => {
      const opt = document.createElement('option'); opt.value = c; opt.textContent = c; countySelect.appendChild(opt);
      const chip = document.createElement('button'); chip.className = 'chip'; chip.textContent = c; chip.dataset.county=c; countyChips.appendChild(chip);
    });

    // grid render
    const grid = document.getElementById('grid');
    const search = document.getElementById('search');

    function renderCards(list){
      grid.innerHTML='';
      if(list.length===0){grid.innerHTML='<div style="grid-column:1/-1;padding:40px;border-radius:12px;background:rgba(255,255,255,0.02);text-align:center;color:var(--muted)">No destinations match your filter.</div>';return}
      list.forEach(d=>{
        const card = document.createElement('div'); card.className='card';
        card.innerHTML = `
          <div class="thumb" style="background-image:url('${d.img}')"></div>
          <div class="meta"><div><div class="title">${d.title}</div><div class="county">${d.county} • ${d.type}</div></div><div><button class="btn" data-id="${d.id}">View</button></div></div>
          <div style="color:var(--muted);font-size:0.75rem">${d.summary}</div>
          <div class="tags">${d.attractions.slice(0,3).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        `;
        grid.appendChild(card);
      })
    }

    function filterData(){
      const county = countySelect.value;
      const q = (search.value || '').toLowerCase();
      let list = destinations.slice();
      if(county && county !== 'all') list = list.filter(d => d.county.toLowerCase() === county.toLowerCase());
      if(q) list = list.filter(d => (d.title + ' ' + d.summary + ' ' + d.attractions.join(' ')).toLowerCase().includes(q));
      renderCards(list);
    }

    // initial render
    renderCards(destinations);

    // event listeners
    countySelect.addEventListener('change', () => {
      // update chip states
      Array.from(countyChips.children).forEach(c=> c.classList.toggle('active', c.dataset.county === countySelect.value));
      filterData();
    });

    search.addEventListener('input', () => filterData());

    countyChips.addEventListener('click', (e)=>{
      if(e.target.matches('.chip')){
        const c = e.target.dataset.county;
        // toggle selection: if already active -> set to all
        if(e.target.classList.contains('active')){ countySelect.value='all'; Array.from(countyChips.children).forEach(ch=>ch.classList.remove('active')) }
        else { countySelect.value = c; Array.from(countyChips.children).forEach(ch=>ch.classList.toggle('active', ch===e.target)) }
        filterData();
      }
    });

    // delegate view button in grid
    grid.addEventListener('click', (e)=>{
      const btn = e.target.closest('button[data-id]'); if(!btn) return;
      const id = Number(btn.dataset.id);
      openModal(id);
    });

    // modal logic
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalAttractions = document.getElementById('modalAttractions');
    const modalBest = document.getElementById('modalBest');
    const modalGet = document.getElementById('modalGet');
    const modalContact = document.getElementById('modalContact');
    const modalCounty = document.getElementById('modalCounty');
    const modalType = document.getElementById('modalType');
    const closeModal = document.getElementById('closeModal');

    function openModal(id){
      const d = destinations.find(x=>x.id===id); if(!d) return;
      modalTitle.textContent = d.title;
      modalImage.style.backgroundImage = `url('${d.img}')`;
      modalDescription.textContent = d.summary;
      modalAttractions.innerHTML = d.attractions.map(a=>`<li>${a}</li>`).join('');
      modalBest.textContent = d.best || 'All year';
      modalGet.textContent = d.getThere || 'See contact link';
      modalContact.href = d.contact || '#'; modalContact.textContent = d.contact ? 'More info' : '—';
      modalCounty.textContent = 'County: ' + d.county;
      modalType.textContent = 'Type: ' + (d.type || 'Attraction');
      modalBackdrop.style.display = 'flex';
      document.body.style.overflow='hidden';
    }
    function hideModal(){ modalBackdrop.style.display='none'; document.body.style.overflow='auto'; }
    closeModal.addEventListener('click', hideModal);
    modalBackdrop.addEventListener('click', (e)=>{ if(e.target===modalBackdrop) hideModal(); });

    // keyboard close
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') hideModal(); });

    // Accessibility: focus trap basic (keeps it simple)
    modalBackdrop.addEventListener('keydown', (e)=>{
      if(e.key === 'Tab'){
        const focusables = Array.from(modalBackdrop.querySelectorAll('button,a,input,select')).filter(el => !el.disabled);
        if(focusables.length===0) return;
        const idx = focusables.indexOf(document.activeElement);
        if(e.shiftKey && idx===0){ e.preventDefault(); focusables[focusables.length-1].focus() }
        else if(!e.shiftKey && idx===focusables.length-1){ e.preventDefault(); focusables[0].focus() }
      }
    });

    // small helper: allow adding more destinations via console for demo
    window.addDestination = function(dest){ dest.id = Date.now(); destinations.push(dest); renderCards(destinations); }

  </script>
</body>
</html>
