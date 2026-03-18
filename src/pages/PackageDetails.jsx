import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

function PackageDetails() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchPackage = async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error(error);
      else setPkg(data);
      setLoading(false);
    };
    fetchPackage();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pkg) return;

    const { data, error } = await supabase.from("bookings").insert({
      name,
      phone,
      package_id: pkg.id,
    });

    if (error) alert("Error submitting booking: " + error.message);
    else {
      setSubmitted(true);
      setName("");
      setPhone("");
    }
  };

  if (loading) return <p>Loading package...</p>;
  if (!pkg) return <p>Package not found.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{pkg.title}</h1>
      <img
        src={pkg.image_url}
        alt={pkg.title}
        style={{ width: "100%", maxWidth: 600, borderRadius: 8 }}
      />
      <p>
        <strong>Location:</strong> {pkg.location}
      </p>
      <p>
        <strong>Price:</strong> KES {pkg.price}
      </p>
      <p>
        <strong>Duration:</strong> {pkg.duration}
      </p>
      <p>
        <strong>Description:</strong> {pkg.description}
      </p>

      <h2>Book This Package</h2>
      {submitted && <p style={{ color: "green" }}>Booking submitted! We shall reach out to you.</p>}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", maxWidth: 400 }}
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Book Now
        </button>
      </form>
    </div>
  );
}

const styles = {
  input: { marginBottom: 10, padding: 10, borderRadius: 5, border: "1px solid #ccc" },
  button: {
    padding: 10,
    backgroundColor: "#1E4D56",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};

export default PackageDetails;