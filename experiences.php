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

.wrap{max-width:1100px;margin:36px auto;padding:24px}

header{display:flex;gap:16px;align-items:center;justify-content:space-between}

h1{margin:0;font-size:1.6rem}

p.lead{margin:4px 0 0;color:#9aa4b2}

/* controls */
.controls{display:flex;gap:12px;margin:18px 0;flex-wrap:wrap}

select,
input[type="search"]{
  background:#0b1220;
  border:1px solid rgba(255,255,255,0.04);
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
  border:1px solid rgba(255,255,255,0.02);
  cursor:pointer;
  font-size:0.85rem;
}

.chip.active{
  background:linear-gradient(90deg,#ef5b76,#ff8aa3);
  color:#071022;
}

/* grid + cards */
.grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
  gap:16px;
  margin-top:18px;
}

.card{
  background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));
  padding:12px;
  border-radius:12px;
  border:1px solid rgba(255,255,255,0.03);
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
  background:linear-gradient(90deg,#ef5b76,#ff8aa3);
  border:none;
  color:#071022;
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
  background:#071428;
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
  <div class="wrap">
    <header>
      <div>
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
    // --- Data: destinations array. Add more items here for other counties ---
    const counties = [
      "Nairobi","Mombasa","Kisumu","Nakuru","Narok","Kajiado","Kericho","Baringo","Kiambu","Kakamega",
      "Embu","Meru","Machakos","Tharaka-Nithi","Nyeri","Murang'a","Laikipia","Isiolo","Mandera","Wajir",
      "Garissa","Taita-Taveta","Kwale","Kilifi","Lamu","Tana River","Kitui","Makueni","Busia","Siaya",
      "Homa Bay","Migori","Uasin Gishu","Trans Nzoia","West Pokot","Turkana","Samburu","Bungoma","Vihiga","Busia South",
      "Nyandarua","Kirinyaga","Narok East","Elgeyo-Marakwet","Nandi","Sotik","Kerugoya","Kilgoris","Others"
    ];

    const destinations = [
      {
        id:1, title: 'Nairobi National Park', county: 'Nairobi', img: 'https://images.unsplash.com/photo-1531915093573-0dfbc3b6c6b1?auto=format&fit=crop&w=1200&q=60',
        summary: 'A fenced wildlife park bordering Nairobi city — quick safari with lions, rhinos and giraffes against a skyline backdrop.',
        attractions: ['Big cats (lions)', 'Rhino sanctuary', 'Giraffes & zebras', 'Safari walks'],
        best: 'June - October (dry season)', getThere: 'Short drive from central Nairobi; or use domestic flights to Wilson Airport + transfer', contact: 'https://www.kws.go.ke', type: 'National park'
      },
      {
        id:2, title: 'Diani Beach', county: 'Kwale', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60',
        summary: 'White-sand beaches, coral reefs and water sports. A top seaside escape near Mombasa.',
        attractions: ['Coral reefs & snorkeling','Kite surfing','Colobus Conservation visits'],
        best: 'November - March & July - October', getThere: 'Fly to Ukunda or Mombasa then short transfer', contact: 'https://visitdiani.com', type: 'Beach & marine'
      },
      {
        id:3, title: 'Maasai Mara National Reserve', county: 'Narok', img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=60',
        summary: 'World-famous reserve for the Great Migration, abundant big-game sightings and classic safari camps.',
        attractions: ['Great Migration (Jul-Oct)','Big Five game drives','Hot air balloon safaris'],
        best: 'July - October', getThere: 'Drive from Nairobi (~5-6 hours) or short charter flights to Mara airstrips', contact: 'https://www.maasaimarareserve.org', type: 'Wildlife reserve'
      },
      {
        id:4, title: 'Lake Nakuru National Park', county: 'Nakuru', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=60',
        summary: 'Famous for flamingos (when water and algae levels allow), rhinos and scenic views of the Rift Valley escarpment.',
        attractions: ['Flamingo viewing (seasonal)','Rhino tracking','Birdwatching'],
        best: 'January - March & July - October', getThere: 'Drive from Nairobi (~2.5-3 hours) or fly to Nakuru airport', contact: 'https://www.kws.go.ke', type: 'National park'
      },
      {
        id:5, title: 'Kisumu & Lake Victoria', county: 'Kisumu', img: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1400&q=60',
        summary: 'Largest lake in Africa — fishing communities, birdlife, and sunsets over water.',
        attractions: ['Dunga Hill fishing village','Cultural museums','Birdwatching on islands'],
        best: 'June - September', getThere: 'Fly to Kisumu or drive from Nakuru/Nairobi', contact: 'https://visitkisumu.com', type: 'Lake & culture'
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
          <div style="color:var(--muted);font-size:0.95rem">${d.summary}</div>
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
