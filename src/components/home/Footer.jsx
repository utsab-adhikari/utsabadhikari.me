// components/Footer.jsx
const Footer = () => {
  return (
    <footer className="mt-12 p-6 border-t border-[#30363d] text-center text-[#7d8590] text-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-3 sm:mb-0">
          <p>
            &copy; {new Date().getFullYear()} Utsab Adhikari. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-5">
          <a href="#" className="hover:text-[#2f81f7] transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-[#2f81f7] transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;