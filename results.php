<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Search Results</title>
<style>
  body { font-family:'Segoe UI', sans-serif; background:#f9f9f9; margin:0; padding:0; color:#0F445F; }
  .wrap { max-width:1100px; margin:36px auto; padding:24px; }
  h1 { font-size:1.6rem; margin-bottom:20px; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; }
  .card { background:#fff; padding:12px; border-radius:12px; border:1px solid #0F445F; display:flex; flex-direction:column; gap:10px; }
  .thumb { height:150px; border-radius:8px; background-size:cover; background-position:center; }
  .meta { display:flex; justify-content:space-between; align-items:center; }
  .meta .title { font-weight:600; }
  .meta .county { font-size:0.85rem; color:#9aa4b2; }
  .tags { display:flex; gap:6px; flex-wrap:wrap; }
  .tag { font-size:0.78rem; padding:4px 8px; border-radius:999px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.02); }
  .btn { padding:8px 12px; border-radius:8px; background:#11989B; border:none; color:#fff; cursor:pointer; }
</style>
</head>
<body>
<div class="wrap">
  <h1>Search Results</h1>
  <div id="grid" class="grid"></div>
</div>

<script>
  const destinations = [
    {
      id:1, title: 'Nairobi National Park', county: 'Nairobi', img: 'https://images.unsplash.com/photo-1531915093573-0dfbc3b6c6b1?auto=format&fit=crop&w=1200&q=60',
      summary: 'A fenced wildlife park bordering Nairobi city — quick safari with lions, rhinos and giraffes against a skyline backdrop.',
      attractions: ['Big cats (lions)', 'Rhino sanctuary', 'Giraffes & zebras', 'Safari walks'],
      best: 'June - October', getThere: 'Short drive from central Nairobi', contact: 'https://www.kws.go.ke', type: 'National park'
    },
    {
      id:2, title: 'Diani Beach', county: 'Kwale', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60',
      summary: 'White-sand beaches, coral reefs and water sports. A top seaside escape near Mombasa.',
      attractions: ['Coral reefs & snorkeling','Kite surfing','Colobus Conservation visits'],
      best: 'Nov-Mar & Jul-Oct', getThere: 'Fly to Ukunda or Mombasa', contact: 'https://visitdiani.com', type: 'Beach & marine'
    }
    // add more destinations here
  ];

  // Get search query from URL
  const params = new URLSearchParams(window.location.search);
  const q = (params.get('q') || '').toLowerCase();

  const grid = document.getElementById('grid');

  const results = destinations.filter(d => 
    (d.title + ' ' + d.summary + ' ' + d.attractions.join(' ')).toLowerCase().includes(q)
  );

  if(results.length === 0){
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px;background:#fff;border-radius:12px;">No results found.</p>';
  } else {
    results.forEach(d => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="thumb" style="background-image:url('${d.img}')"></div>
        <div class="meta">
          <div>
            <div class="title">${d.title}</div>
            <div class="county">${d.county} • ${d.type}</div>
          </div>
          <div><button class="btn">View</button></div>
        </div>
        <div style="font-size:0.75rem;color:#555">${d.summary}</div>
        <div class="tags">${d.attractions.slice(0,3).map(a=>`<span class="tag">${a}</span>`).join('')}</div>
      `;
      grid.appendChild(card);
    });
  }
</script>
</body>
</html>
