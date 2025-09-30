import React from 'react';
import Header from './Dashboard/Header';
import HeroSection from './Dashboard/HeroSection';
import GrievanceForm from './Dashboard/GrievanceForm';
import StatisticsSection from './Dashboard/StatisticsSection';
import Footer from './Dashboard/Footer';


const Index: React.FC = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden items-stretch">
      <Header />
      
      <main className="w-full px-6 py-12 lg:px-12 xl:px-20 2xl:px-32 bg-blue-900">
        <div className="w-full mx-auto">
          <div className="gap-14 flex lg:gap-12 max-lg:flex-col max-lg:items-stretch">
            <HeroSection />
            <GrievanceForm />
          </div>
        </div>
      </main>
      
      <StatisticsSection />
      <Footer />
    </div>
  );
};

export default Index;
