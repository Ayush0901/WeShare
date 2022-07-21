import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="">
      <p className="text-lg text-slate-500 pt-10px"> Made with ❤️ in Uttarakhand </p>
      <p  className="text-sm text-slate-500">ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
