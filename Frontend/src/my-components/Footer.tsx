import { Github, Twitter, Instagram } from "lucide-react"

export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Social Links */}
                <div className="flex justify-center space-x-6 mb-8">
                    <a 
                        href="https://github.com/yourusername" 
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="GitHub"
                    >
                        <Github className="h-6 w-6" />
                    </a>
                    <a 
                        href="https://twitter.com/yourusername" 
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Twitter"
                    >
                        <Twitter className="h-6 w-6" />
                    </a>
                    <a 
                        href="https://instagram.com/yourusername" 
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Instagram"
                    >
                        <Instagram className="h-6 w-6" />
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-400">
                    <p className="text-sm">
                        © {new Date().getFullYear()} 2K Matchmaker. All rights reserved.
                    </p>
                    <p className="text-xs mt-2">
                        Not affiliated with NBA 2K or Take-Two Interactive Software.
                    </p>
                </div>
            </div>
        </footer>
    )
}