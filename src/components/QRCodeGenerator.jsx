import React, { useRef, useState } from "react";
import QRCode from "qrcode";

function QRCodeGenerator() {
  const canvasRef = useRef(null);
  const [input, setInput] = useState("");
  const [showQR, setShowQR] = useState(false);

  const generateQRCode = async () => {
    if (!input.trim()) return;

    await QRCode.toCanvas(canvasRef.current, input, {
      width: 200,
      margin: 1,
    });

    setShowQR(true);
  };

  const downloadQRCode = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qr.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col text-white relative overflow-hidden">

      {/* 🌌 BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/bg.jpg"
          alt="bg"
          className="w-full h-full object-cover blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* 🔝 HEADER */}
      <header className="flex justify-between items-center px-5 md:px-10 py-4">
        <div className="flex items-center gap-2 md:gap-3">
          <img src="/logo.png" className="w-8 h-8 md:w-10 md:h-10" alt="logo" />
          <h1 className="text-lg md:text-xl font-bold tracking-wide">QRNOVA</h1>
        </div>
      </header>

      {/* 🚀 TITLE */}
      <div className="text-center px-4 mt-4 md:mt-8">
        <h1 className="text-2xl md:text-4xl font-bold animate-slideUp">
          Generate QR Codes <span className="text-[#00c6ff]">Instantly</span>
        </h1>
        <p className="text-gray-300 text-sm md:text-base mt-2 max-w-md mx-auto animate-slideUp delay-1">
          Create scannable QR codes for any text or URL
        </p>
      </div>

      {/* MAIN CONTENT - FULLY RESPONSIVE */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 md:px-6 py-6 md:py-8 gap-6 md:gap-8 lg:gap-12">
        
        {/* LEFT SECTION - HIDDEN ON MOBILE, SHOWS ON TABLET+ */}
        <div className="hidden md:flex md:w-2/5 lg:w-1/3 flex-col space-y-4 animate-slideUp delay-2">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#00c6ff]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#00c6ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Smart & Fast</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Generate high-quality QR codes for URLs, text messages, contact details, and more. Download instantly in PNG format.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-[#00c6ff] text-lg mb-1">✓</div>
              <div className="text-xs text-gray-300">URL / Web links</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-[#00c6ff] text-lg mb-1">✓</div>
              <div className="text-xs text-gray-300">Plain Text</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-[#00c6ff] text-lg mb-1">✓</div>
              <div className="text-xs text-gray-300">Phone Numbers</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-[#00c6ff] text-lg mb-1">✓</div>
              <div className="text-xs text-gray-300">Email Addresses</div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD - FULL WIDTH ON MOBILE */}
        <div className="w-full md:w-3/5 lg:w-2/5 max-w-md mx-auto animate-slideUp delay-1">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-5 md:p-7 border border-white/20 hover:border-[#00c6ff]/40 transition-all duration-300">
            
            <h2 className="text-center text-lg md:text-xl font-semibold mb-5 text-[#00c6ff]">
              ✨ QR Code Generator
            </h2>

            {/* INPUT FIELD */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter URL, text, or any data..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (showQR) setShowQR(false);
                }}
                className="w-full p-3 md:p-3.5 rounded-xl border border-white/30 bg-white/5 backdrop-blur-sm outline-none text-sm md:text-base text-white placeholder-gray-400 focus:border-[#00c6ff] focus:ring-1 focus:ring-[#00c6ff] transition-all"
                onKeyPress={(e) => e.key === 'Enter' && generateQRCode()}
              />

              {/* BUTTONS GROUP - STACKED ON MOBILE, SIDE BY SIDE ON SMALL TABLETS? keeping stacked for better mobile touch */}
              <button
                onClick={generateQRCode}
                className="w-full bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-black font-bold py-3 md:py-3.5 rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-lg text-sm md:text-base"
              >
                ⚡ Generate QR Code
              </button>

              <button
                onClick={downloadQRCode}
                disabled={!showQR}
                className={`w-full py-3 md:py-3.5 rounded-xl font-medium transition-all duration-200 text-sm md:text-base ${
                  showQR 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white cursor-pointer' 
                    : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                }`}
              >
                💾 Download QR Code
              </button>
            </div>

            {/* QR CODE DISPLAY - RESPONSIVE */}
            {showQR && (
              <div className="mt-6 flex flex-col items-center animate-qrPop">
                <div className="bg-white rounded-xl p-3 shadow-xl">
                  <canvas 
                    ref={canvasRef} 
                    className="w-full h-auto max-w-[180px] md:max-w-[200px]"
                    style={{ width: '100%', height: 'auto' }}
                  ></canvas>
                </div>
                <p className="text-xs text-gray-300 mt-3 text-center">
                  ✅ QR code generated successfully!
                </p>
              </div>
            )}

            {/* HINT FOR MOBILE */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">
                Tip: Press Enter to generate quickly
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE STRIP - VISIBLE ON MOBILE, HIDDEN ON DESKTOP (since desktop has left panel) */}
      <div className="md:hidden px-4 py-4 mt-2">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg py-2 px-1">
            <span className="text-[#00c6ff] text-sm">✓ URL & Text</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg py-2 px-1">
            <span className="text-[#00c6ff] text-sm">✓ Phone & Email</span>
          </div>
        </div>
      </div>

      {/* FOOTER - RESPONSIVE */}
      <footer className="py-5 px-4 text-xs md:text-sm flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-gray-400 border-t border-white/10 mt-6">
        <span>📧 support@qrnova.com</span>
        <span className="hidden sm:inline">•</span>
        <span>🔒 Secure & Free</span>
        <span className="hidden sm:inline">•</span>
        <span>⚡ Powered by QRNOVA</span>
      </footer>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes qrPop {
          from { 
            transform: scale(0.7); 
            opacity: 0; 
          }
          to { 
            transform: scale(1); 
            opacity: 1; 
          }
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease forwards;
        }

        .animate-qrPop {
          animation: qrPop 0.4s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
        }

        .delay-1 {
          animation-delay: 0.15s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .delay-2 {
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        /* Better touch targets on mobile */
        @media (max-width: 768px) {
          button, input {
            font-size: 16px !important; /* Prevents zoom on focus in iOS */
          }
          
          button {
            min-height: 48px;
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Card hover effect on desktop only */
        @media (min-width: 768px) {
          .bg-white\\/10:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 35px -12px rgba(0,0,0,0.4);
          }
        }
      `}</style>
    </div>
  );
}

export default QRCodeGenerator;