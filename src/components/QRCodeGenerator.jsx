import React, { useRef, useState } from "react";
import QRCode from "qrcode";

function QRCodeGenerator() {
  const canvasRef = useRef(null);
  const [input, setInput] = useState("");
  const [showQR, setShowQR] = useState(false);

  const generateQRCode = async () => {
    if (!input.trim()) return;

    await QRCode.toCanvas(canvasRef.current, input, {
      width: 220,
    });

    setShowQR(true);
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.download = "qr.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden text-white">

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/bg.jpg"
          alt="bg"
          className="w-full h-full object-cover blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 🔝 HEADER */}
      <header className="flex justify-between items-center px-10 py-4 animate-slideUp">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="w-10 h-10" />
          <h1 className="text-xl font-bold">QRNOVA</h1>
        </div>
      </header>

      {/* 🚀 TITLE */}
      <div className="text-center mt-4">
        <h1 className="text-4xl font-bold animate-slideUp delay-1">
          Generate QR Codes Instantly
        </h1>
      </div>

      {/* MAIN */}
      <div className="flex flex-1 justify-center items-center px-6">

        {/* LEFT */}
        <div className="hidden md:flex flex-col w-1/2 pr-10">

          <h2 className="text-3xl font-semibold mb-4 animate-slideUp delay-1">
            Smart QR Generation
          </h2>

          <p className="mb-6 animate-slideUp delay-2">
            Create QR codes for anything — URLs, text, phone numbers,
            emails, and more.
          </p>

          <ul className="space-y-3 text-sm">
            <li className="animate-slideUp delay-1">✔ Any Text / URL</li>
            <li className="animate-slideUp delay-2">✔ Phone Numbers</li>
            <li className="animate-slideUp delay-2">✔ Email QR Codes</li>
            <li className="animate-slideUp delay-3">✔ Instant Download</li>
          </ul>
        </div>

        {/* DIVIDER */}
        <div className="hidden md:block w-px h-80 bg-white/30"></div>

        {/* RIGHT CARD */}
        <div className="flex justify-center items-center w-full md:w-1/2 pl-10">

          <div className="card p-8 rounded-xl w-full max-w-lg shadow-xl bg-white/10 backdrop-blur-lg">

            <h2 className="text-center text-xl mb-4 text-[#00c6ff] animate-slideUp">
              Generate QR Code
            </h2>

            <input
              type="text"
              placeholder="Enter anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-3 mb-3 rounded-lg border border-gray-300 bg-transparent outline-none"
            />

            <button
              onClick={generateQRCode}
              className="w-full bg-[#00c6ff] text-black py-3 rounded-lg mb-2"
            >
              Generate QR
            </button>

            <button
              onClick={downloadQRCode}
              className="w-full bg-gray-700 text-white py-2 rounded-lg"
            >
              Download
            </button>

            {/* QR */}
            <div className={`mt-4 flex justify-center ${showQR ? "animate-qrPop" : "opacity-0"}`}>
              <div className="bg-white p-2 rounded">
                <canvas ref={canvasRef}></canvas>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="py-4 text-sm flex justify-center gap-3 animate-slideUp delay-3">
        <span>📧 support@qrnova.com</span>
        <span>|</span>
        <span>Powered by QRNOVA</span>
      </footer>

    </div>
  );
}

export default QRCodeGenerator;
