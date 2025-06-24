import React from 'react';

const Loader = () => {
  return (
    <div className="w-full max-w-[600px] mx-auto flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full bg-gray-950 rounded-xl overflow-hidden drop-shadow-2xl">
        {/* Top bar */}
        <div className="bg-[#202020] flex items-center p-4 sm:p-5 text-white relative rounded-t-xl">
          <div className="flex absolute left-3 space-x-2">
            <span className="h-3 w-3 sm:h-3.5 sm:w-3.5 bg-[#3B82F6] rounded-full transition-all hover:scale-125 hover:bg-[#ff3b36]" />
            <span className="h-3 w-3 sm:h-3.5 sm:w-3.5 bg-[#06B6D4] rounded-full transition-all hover:scale-125 hover:bg-[#ffaa33]" />
            <span className="h-3 w-3 sm:h-3.5 sm:w-3.5 bg-[#818CF8] rounded-full transition-all hover:scale-125 hover:bg-[#00b44e]" />
          </div>
          <div className="flex-1 text-center font-semibold text-base sm:text-lg animate-pulse">
            <div className="text-lg sm:text-xl">Loading...</div>
          </div>
          <div className="absolute w-full bottom-0 left-0 bg-[#333333] h-1 rounded-t-xl">
            <div className="w-[30%] bg-[#3B82F6] h-full animate-progressBar" />
          </div>
        </div>

        {/* Spinner and text */}
        <div className="flex px-4 py-10 sm:p-8 justify-center items-center bg-[#121212]">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 sm:w-24 sm:h-24 border-4 border-t-[#06B6D4] border-gray-700 rounded-full animate-spin mx-auto" />
            <div className="text-[#818CF8] font-semibold text-2xl sm:text-4xl opacity-90 animate-fadeIn">
              Almost There...
            </div>
            <div className="text-[#9CA3AF] text-xs sm:text-sm opacity-80 animate-fadeIn">
              <p>We're getting everything ready for you...</p>
              <p>Sit tight for just a moment.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#60A5FA] px-2 py-3 sm:p-4 text-center text-black text-[10px] sm:text-xs font-mono">
          <p>Appreciate your patience. Almost there!</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
