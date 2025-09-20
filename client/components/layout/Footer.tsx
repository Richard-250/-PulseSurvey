import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="mx-auto max-w-[1200px] px-4 py-8 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <div className="font-semibold mb-2">PulseSurvey</div>
          <p className="text-muted-foreground">Answer real-life questions. Earn coins. Cash out via MTN P2P.</p>
        </div>
        <div className="space-y-2">
          <div className="font-semibold">Company</div>
          <ul className="grid gap-1">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/about-surveys" className="hover:underline">About Surveys</Link></li>
            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div className="space-y-2">
          <div className="font-semibold">Legal</div>
          <ul className="grid gap-1">
            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            {/* <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li> */}
            <li><Link to="/cookies" className="hover:underline">Cookie & session Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-xs text-muted-foreground text-center pb-6">© {new Date().getFullYear()} PulseSurvey. All rights reserved.</div>
    </footer>
  );
}
