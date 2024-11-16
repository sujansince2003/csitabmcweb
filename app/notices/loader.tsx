import Image from "next/image";

export default function CSITLoader() {
  return (
    <div className="flex flex-col items-center justify-center  p-20">
      <div className="relative w-24 h-24 mb-4">
        <Image
          src="/logo.png"
          alt="CSIT Association Logo"
          layout="fill"
          objectFit="contain"
          className="animate-pulse"
        />
      </div>
      <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-blue-500 via-red-500 to-blue-500 animate-loading"></div>
      </div>
      <p className="mt-2 text-sm text-gray-600">Loading notices...</p>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-loading {
          animation: loading 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
