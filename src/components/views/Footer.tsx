import Logo from "@/assets/Logo.png";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo and Introduction */}
        <div>
          <img src={Logo} alt="Khan's Logo" className="w-32 mb-4" />
          <p className="text-sm leading-relaxed">
            Developed by <strong>Khan Mahmudul Hasan</strong>, a dedicated software engineer based in Japan.
            Specializing in modern frontend technologies and committed to building accessible,
            useful, and user-friendly applications for learners and businesses alike.
          </p>
          <p className="mt-4 text-xs text-gray-400">
            © {new Date().getFullYear()} Khan Mahmudul Hasan. All rights reserved.
          </p>
        </div>

        {/* Professional Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.facebook.com/cse.mahmud"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-white transition-colors duration-200"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  className="w-6 h-6 mr-2"
                />
                Facebook: cse.mahmud
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/mahmudulcse/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-white transition-colors duration-200"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                  alt="LinkedIn"
                  className="w-6 h-6 mr-2"
                />
                LinkedIn: /in/mahmudulcse
              </a>
            </li>
            <li>
              <a
                href="https://github.com/csemahmud"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-white transition-colors duration-200"
              >
                <img
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                  alt="GitHub"
                  className="w-6 h-6 mr-2"
                />
                GitHub: @csemahmud
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <p className="text-sm mb-2">
            For professional inquiries or collaboration opportunities:
          </p>
          <p className="text-sm mb-2">
            📞 +81-70-4381-4193
          </p>
          <p className="text-sm">
            📧 <a href="mailto:lone.wolf.mahmud@gmail.com" className="underline hover:text-white">lone.wolf.mahmud@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
