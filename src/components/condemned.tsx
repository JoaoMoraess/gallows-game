type CondemnedProps = {
  errorsCount: number;
};

export const Condemned: React.FC<CondemnedProps> = ({ errorsCount }) => {
  return (
    <div className="relative">
      <div
        className={`transition-opacity ${
          errorsCount < 1 ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="z-20 h-9 w-9 bg-yellow-400 -top-1 rounded-full absolute"></div>
        <div className="z-30 h-10 w-10 shadow bg-red-200 rounded-full absolute">
          <div className="flex justify-around pt-2">
            <div className="w-3 h-3 bg-white rounded-full flex justify-center items-center">
              {errorsCount >= 6 ? (
                <div className="font-mono text-red-600">X</div>
              ) : (
                <div className="bg-blue-900 w-1 h-1 rounded-full"></div>
              )}
            </div>
            <div className="w-3 h-3 bg-white rounded-full flex justify-center items-center">
              {errorsCount >= 6 ? (
                <div className="font-mono text-red-600">X</div>
              ) : (
                <div className="bg-blue-900 w-1 h-1 rounded-full"></div>
              )}
            </div>
          </div>
          <div className="pt-1 w-ful flex items-center justify-center">
            <div className="w-1/2 rounded-full border-t-2 border-red-400"></div>
            {errorsCount >= 6 && (
              <div className="absolute h-2 w-1 right-4 rounded-b-full bottom-2 bg-red-400"></div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`transition-opacity ${
          errorsCount < 2 ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="h-10 w-10"></div>
        <div className="w-10 h-16 bg-blue-400 rounded-lg flex justify-center">
          <div className="w-3 h-1 bg-red-200 rounded-b-full"></div>
        </div>
      </div>
      <div className="w-14 h-14 right-2/4 transform translate-x-2/4 flex justify-between absolute top-11">
        <div
          className={`flex flex-col transform rotate-3 transition-opacity ${
            errorsCount < 3 ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="h-full w-2 bg-blue-400 rounded-tl-lg"></div>
          <div className="w-2 h-1 bg-red-200 rounded-b-xl"></div>
        </div>
        <div
          className={`flex flex-col transform -rotate-3 transition-opacity ${
            errorsCount < 4 ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="h-full w-2 bg-blue-400 rounded-tr-lg"></div>
          <div className="w-2 h-1 bg-red-200 rounded-b-xl"></div>
        </div>
      </div>
      <div className="-mt-1 flex justify-center">
        <div>
          <div
            className={`transition-opacity w-9 h-3 bg-green-500  ${
              errorsCount < 5 ? 'opacity-0' : 'opacity-100'
            }`}
          ></div>

          <div className="w-9 h-10 flex justify-between">
            <div
              className={`transition-opacity ${
                errorsCount < 5 ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="w-3 h-8 bg-green-500 transform rotate-3 relative -top-2 rounded-full"></div>
              <div className="w-3 h-8 bg-green-500 transform -rotate-3 relative -top-4 rounded-full"></div>
              <div className="bg-yellow-900 w-4 h-2 relative -top-5 -left-1 rounded-tl-full rounded-b-sm transform -rotate-6"></div>
            </div>
            <div
              className={`transition-opacity relative -right-1 ${
                errorsCount < 6 ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="w-3 h-8 bg-green-500 transform -rotate-3 relative -top-2 rounded-full"></div>
              <div className="w-3 h-8 bg-green-500 transform rotate-3 relative -top-4 rounded-full"></div>
              <div className="bg-yellow-900 w-4 h-2 relative -top-5 -right-0 rounded-tr-full rounded-b-sm transform rotate-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
