import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAsia} from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons'


function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="">
      <p className="text-lg text-slate-500 pt-1"> Made with ❤️ in Uttarakhand </p>
      <div className="flex items-center justify-center">
      <a href="https://twitter.com/AyushNe87369603"><FontAwesomeIcon icon={faTwitter} className="px-5 py-3 text-slate-200 opacity-50 hover:opacity-100 text-sky-600	" size="lg" /></a>
      <a href="https://www.instagram.com/negi8077/"><FontAwesomeIcon icon={faInstagram} className="px-5 py-3  text-slate-200 opacity-50 hover:opacity-100 text-fuchsia-600	" size="lg"/></a>
      <a href="https://ayush-page.herokuapp.com/"><FontAwesomeIcon icon={faEarthAsia} className="px-5 py-3  text-slate-200 opacity-50 hover:opacity-100 text-rose-300		" size="lg"/></a>
      </div>
      <p  className="text-sm text-slate-500">ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
