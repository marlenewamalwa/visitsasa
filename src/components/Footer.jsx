import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div>
          <h3>Travel Kenya</h3>
          <p>Explore, book, and enjoy Kenya’s top destinations.</p>
        </div>
        <div>
          <h4>Links</h4>
          <ul style={styles.links}>
            <li><Link to="/" style={styles.link}>Home</Link></li>
            <li><Link to="/packages" style={styles.link}>Packages</Link></li>
            <li><Link to="/contact" style={styles.link}>Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: info@travelkenya.co.ke</p>
          <p>Phone: +254 700 000000</p>
        </div>
      </div>
      <p style={styles.copy}>&copy; {new Date().getFullYear()} Travel Kenya. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#1E4D56",
    color: "white",
    padding: "40px 20px",
    marginTop: 40,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: 1200,
    margin: "0 auto",
    gap: 20,
  },
  links: {
    listStyle: "none",
    padding: 0,
  },
  link: {
    color: "white",
    textDecoration: "none",
    display: "block",
    marginBottom: 5,
  },
  copy: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    opacity: 0.8,
  },
};

export default Footer;