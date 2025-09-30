import React from 'react';

const AccessibilityBar: React.FC = () => {
  return (
    <header className="justify-center items-center flex w-full flex-col font-medium bg-[#F4F3F9] p-0 max-md:max-w-full">
      <div className="justify-between items-center flex w-[1320px] max-w-full gap-[40px_100px] overflow-hidden flex-wrap p-0">
        <div className="items-center self-stretch flex gap-3 text-sm text-white tracking-[0.1px] leading-none w-[186px] my-auto p-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/a3294ef7889323a62d16dd9077650c71321488eb?placeholderIfAbsent=true"
            alt="Government of India emblem"
            className="aspect-[1.5] object-contain w-[33px] self-stretch shrink-0 my-auto"
          />
          <div className="self-stretch flex gap-0.5 my-auto p-0">
            <div className="text-sm leading-5 tracking-[0.1px]">
              <span style={{color: 'rgba(33,33,33,1)'}}>
                Government of India
              </span>
            </div>
          </div>
        </div>
        <div className="items-center self-stretch flex min-w-60 h-[41px] text-xs text-[#212121] whitespace-nowrap w-[464px] my-auto p-0 max-md:max-w-full">
          <div className="items-center self-stretch flex min-w-60 min-h-[42px] w-[464px] gap-6 my-auto p-0 max-md:max-w-full">
            <img
              src="https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/e23f10e2c84d47197fd0711c648f415ce9eae197?placeholderIfAbsent=true"
              alt="Accessibility options"
              className="aspect-[3] object-contain w-24 self-stretch shrink-0 my-auto rounded-[0px_0px_0px_0px]"
            />
            <div className="opacity-40 border self-stretch w-0 shrink-0 h-5 bg-[#212121] my-auto border-[rgba(33,33,33,1)] border-solid" />
            <div className="items-center self-stretch flex gap-[13px] my-auto p-0">
              <div className="items-center self-stretch flex gap-2 my-auto p-0">
                <div className="text-[#212121] self-stretch my-auto">
                  English
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AccessibilityBar;