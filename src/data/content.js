import maraPhoto from "../assets/maasaimara.jpg";
import dianiPhoto from "../assets/dianibeach.jpg";
import amboseliPhoto from "../assets/amboseli.jpg";
import lamuPhoto from "../assets/lamu.jpg";
import mtkenyaPhoto from "../assets/mtkenya.jpg";
import lakenakuruPhoto from "../assets/lakenakuru.jpg";




export const DESTINATIONS = [
  {
    name: "Maasai Mara",
    region: "Rift Valley",
    tag: "Safari",
    emoji: "🦁",
    desc: "Witness the Great Migration and endless golden plains teeming with the Big Five.",
    best: "Jul – Oct",
    bg: "#1D4F5A",
    img: maraPhoto,
  },
  {
    name: "Diani Beach",
    region: "Coast",
    tag: "Beach",
    emoji: "🌊",
    desc: "Powder-white sands framed by swaying palms and warm turquoise Indian Ocean waters.",
    best: "Dec – Mar",
    bg: "#2A6B79",
    img: dianiPhoto,
  },
  {
    name: "Amboseli",
    region: "Kajiado",
    tag: "Safari",
    emoji: "🐘",
    desc: "Iconic views of Kilimanjaro towering over vast herds of free-roaming elephants.",
    best: "Jun – Oct",
    bg: "#163D47",
    img: amboseliPhoto,
  },
  {
    name: "Lamu Island",
    region: "Coast",
    tag: "Culture",
    emoji: "⛵",
    desc: "A UNESCO World Heritage town of coral stone, dhow boats, and Swahili heritage.",
    best: "Nov – Mar",
    bg: "#1D4F5A",
    img: lamuPhoto,
  },
  {
    name: "Mount Kenya",
    region: "Central",
    tag: "Adventure",
    emoji: "🏔️",
    desc: "Africa's second-highest peak offers trekking, glaciers, and breathtaking highland flora.",
    best: "Jan – Feb",
    bg: "#2A6B79",
    img: mtkenyaPhoto,
  },
  {
    name: "Lake Nakuru",
    region: "Rift Valley",
    tag: "Wildlife",
    emoji: "🦩",
    desc: "A soda lake famous for its spectacular flamingo gatherings and rare white rhinos.",
    best: "Year-round",
    bg: "#163D47",
    img: lakenakuruPhoto,
  },
];

export const WILDLIFE = [
  { name: "Lion", fact: "Maasai Mara has one of Africa's highest lion densities" },
  { name: "Elephant", fact: "Amboseli's herds are among the most studied in the world", emoji: "🐘" },
  { name: "Leopard", fact: "Shy and nocturnal — Samburu offers rare sightings", emoji: "🐆" },
  { name: "Flamingo", fact: "Millions flock to Lakes Nakuru and Bogoria annually", emoji: "🦩" },
  { name: "Giraffe", fact: "The endangered Rothschild's giraffe is found in Nairobi", emoji: "🦒" },
  { name: "Cheetah", fact: "Fastest land animal; Mara has some of Africa's last wild cheetahs", emoji: "⚡" },
];

export const FOODS = [
  { name: "Nyama Choma", desc: "Slow-roasted goat or beef, the ultimate Kenyan social meal", emoji: "🍖" },
  { name: "Ugali", desc: "Dense maize porridge — the staple at every Kenyan table", emoji: "🫓" },
  { name: "Mandazi", desc: "Lightly spiced fried dough, perfect with chai or coconut milk", emoji: "🍩" },
  { name: "Pilau Rice", desc: "Fragrant spiced rice with Swahili coastal roots and deep flavor", emoji: "🍚" },
  { name: "Sukuma Wiki", desc: "Sautéed collard greens cooked with onion and tomato", emoji: "🥬" },
  { name: "Kenyan Chai", desc: "Bold milky spiced tea — the nation's beloved daily ritual", emoji: "☕" },
];

export const TIPS = [
  { icon: "🛂", title: "Visa", body: "Most nationalities get visa-on-arrival or use the eTA portal at evisa.go.ke. Apply 3+ days ahead." },
  { icon: "💉", title: "Health", body: "Yellow fever vaccine required from some countries. Malaria prophylaxis recommended for most regions." },
  { icon: "💱", title: "Money", body: "Kenyan Shilling (KES). M-Pesa is king — set it up if you can. ATMs widely available in cities." },
  { icon: "🌦️", title: "Best Time", body: "Dry seasons Jun–Oct and Jan–Feb are ideal. The Great Migration peaks Jul–Sep in the Mara." },
  { icon: "🚐", title: "Getting Around", body: "Matatus for local flavor, Uber in Nairobi, and domestic flights via Safarilink or AirKenya." },
  { icon: "🗣️", title: "Language", body: "Swahili and English are official. A few words — 'Jambo!', 'Asante' — go a very long way." },
];

export const NAV_LINKS = ["Destinations", "Wildlife", "Food & Culture", "Travel Tips"];