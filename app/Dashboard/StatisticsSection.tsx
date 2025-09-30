import React from 'react';

interface StatisticItem {
  icon: string;
  value: string;
  label: string;
  borderColor: string;
}

const StatisticsSection: React.FC = () => {
  const statistics: StatisticItem[] = [
    {
      icon: 'https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/4705c92ca698eed9dee24e749a887802e1ffb59b?placeholderIfAbsent=true',
      value: '12,26,178+',
      label: 'Resolved Grievance',
      borderColor: 'border-green-600'
    },
    {
      icon: 'https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/72672a585abb4374def5ccbb5834c2db5ed31305?placeholderIfAbsent=true',
      value: '6,78,908+',
      label: 'Received Grievance',
      borderColor: 'border-[rgba(255,138,0,1)]'
    },
    {
      icon: 'https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/a1736c6fbd5906f20ef155ee4e1e758763e3b18f?placeholderIfAbsent=true',
      value: '8,78,102+',
      label: 'Positive Grievance',
      borderColor: 'border-blue-600'
    }
  ];

  return (
    <section className="self-center flex flex-col items-center mt-[60px] max-md:max-w-full max-md:mt-10">
      <div className="flex flex-col items-center text-[40px] text-[#212121] font-bold leading-[1.2]">
        <h2 className="bg-clip-text">
          <span style={{color: 'rgba(33,33,33,1)'}}>Grievance</span> Statistics
        </h2>
      </div>
      <div className="flex items-center gap-[40px_100px] text-right flex-wrap mt-8 max-md:max-w-full">
        {statistics.map((stat, index) => (
          <div key={index} className="self-stretch flex min-w-60 items-center gap-5 my-auto">
            <img
              src={stat.icon}
              alt={stat.label}
              className="aspect-[1] object-contain w-14 self-stretch shrink-0 my-auto rounded-full"
            />
            <div className={`${stat.borderColor} self-stretch flex items-center gap-2.5 my-auto pl-4 border-l-2`}>
              <div className="self-stretch my-auto">
                <div className="text-[#231F2B] text-[32px] font-bold leading-none">
                  {stat.value}
                </div>
                <div className="text-[#6C6A71] text-sm font-normal leading-loose">
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;