import React from "react";
import { Link } from "react-router-dom";

function PackageCard({ pkg }) {
  return (
    <Link to={`/packages/${pkg.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={styles.card}>
        <img
          src={pkg.image_url} // make sure it’s image_url
          alt={pkg.title}
          style={styles.image}
        />
        <h3>{pkg.title}</h3>
        <p>{pkg.location}</p>
        <p>KES {pkg.price}</p>
        <p>{pkg.duration}</p>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  image: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    borderRadius: 5
  }
};

export default PackageCard;