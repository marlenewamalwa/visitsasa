<?php include 'header.php';
?>
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Us - VisitSasa</title>
  <link rel="icon" type="image/png" href="images/logo.png">
  <style>
    * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #F3FAFB;
            color: #0F445F;
        }

 
    .section {
      max-width: 1000px;
      margin: 50px auto;
      background: white;
      border-radius: 15px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      padding: 40px;
    }

    h2 {
      color: #0F445F;
      border-left: 5px solid #11989B;
      padding-left: 10px;
      margin-bottom: 15px;
    }

    p {
      line-height: 1.7;
      font-size: 1rem;
      color: #444;
    }

    .mission, .team {
      margin-top: 40px;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .member {
      text-align: center;
      background: #f0f8f8;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #e0e0e0;
      transition: transform 0.2s ease;
    }

    .member:hover {
      transform: translateY(-5px);
    }

    .member img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 10px;
      border: 3px solid #11989B;
    }

    footer {
      background: #0F445F;
      color: white;
      text-align: center;
      padding: 20px;
      margin-top: 50px;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      header h1 {
        font-size: 2rem;
      }
      .section {
        padding: 25px;
      }
    }
  </style>
</head>
<body>
  <section class="section">
    <h2>Who We Are</h2>
    <p>
      VisitSasa is your trusted travel partner, helping you explore Kenya’s most
      breathtaking destinations with ease and confidence. From beachfront villas in
      Mombasa to serene getaways in the Rift Valley, we bring together the best
      accommodations and travel experiences — all in one place.
    </p>

    <div class="mission">
      <h2>Our Mission</h2>
      <p>
        Our mission is simple: to make travel booking faster, safer, and more personal.
        We empower local hosts and property owners to share their spaces with travelers,
        and we help tourists discover unique stays that create lifelong memories.
      </p>
    </div>

    <div class="mission">
      <h2>Our Vision</h2>
      <p>
        We envision a Kenya — and eventually an Africa — where travelers can find
        trusted, verified destinations in seconds. VisitSasa aims to become the
        go-to digital hub for both local tourism and global visitors seeking authentic
        African experiences.
      </p>
    </div>

    <div class="team">
      <h2>Meet the Team</h2>
      <div class="team-grid">
        <div class="member">
          <img src="images/team1.jpg" alt="Team Member 1">
          <h3>Mary Wanjiku</h3>
          <p>Founder & CEO</p>
        </div>
        <div class="member">
          <img src="images/team2.jpg" alt="Team Member 2">
          <h3>Brian Otieno</h3>
          <p>Lead Developer</p>
        </div>
        <div class="member">
          <img src="images/team3.jpg" alt="Team Member 3">
          <h3>Jane Mwangi</h3>
          <p>Marketing & Partnerships</p>
        </div>
      </div>
    </div>
  </section>
  <?php include 'footer.php'; ?>
</body>

</html>
