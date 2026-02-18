import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
        <div className="md:max-w-96">
          <img alt="" class="w-30 h-30" src="../favicon.png" />
          <p className="mt-6 text-gray-700">Tunzik Production</p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div className="flex flex-col">
            <h2 className="font-medium mb-5 text-gray-700">
              Tunzik Production
            </h2>

            <ul className="text-gray-700 space-y-2 flex flex-col">
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/artistes">Artistes</Link>
              </li>
              <li>
                <Link to="/label">Label</Link>
              </li>
              <li>
                <Link to="/adhesion">Adhésion</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-gray-500">Contact</h2>
            <div className="text-sm space-y-2">
              <p className="text-gray-600">06.07.65.10.50</p>
              <p className="text-gray-600">tunzikprod@gmail.com</p>
              <li className="text-gray-600 list-none"><Link to="/condition-generales">Conditions générales</Link></li>
              <li className="text-gray-600 list-none"><Link to="/politique-de-confidentialite">Politique de confidentialité</Link></li>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-sm pb-5 text-gray-500">
        Copyright {new Date().getFullYear()} ©{" "}
        <Link to="/">Tunzik Production</Link>. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
