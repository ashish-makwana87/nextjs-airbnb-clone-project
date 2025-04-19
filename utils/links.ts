type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/favorites", label: "favorites" },
  { href: "/bookings", label: "bookings" },
  { href: "/reviews", label: "reviews" },
  { href: "/rentals/create", label: "create rental" },
  { href: "/rentals", label: "my rentals" },
  { href: "/profile", label: "profile" },
  { href: "/admin", label: "admin" },
];

export default navLinks;
