"use client";

import React, { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LANGUAGES = ["English", "हिन्दी (Hindi)", "मराठी (Marathi)", "ગુજરાતી (Gujarati)", "বাংলা (Bangla)"];

const Header: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const router=useRouter();

  return (
    <header className="bg-white shadow-[0px_2px_14px_rgba(0,0,0,0.06)] flex w-full items-center gap-[40px_100px] justify-between flex-wrap px-[60px] py-3 max-md:max-w-full max-md:px-5">
      {/* Left: Logos */}
      <div className="self-stretch flex items-center gap-6 my-auto max-md:max-w-full">
        <img
          src="https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/6ce42d91298fcf1b5ffb0c699a0d964caa1e32e2?placeholderIfAbsent=true"
          alt="Government logo"
          className="aspect-[3.01] object-contain w-[193px] self-stretch shrink-0 my-auto"
        />
        <div className="border bg-[#DDD] self-stretch w-0 shrink-0 h-14 my-auto border-[rgba(221,221,221,1)] border-solid" />
        <img
          src="https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/8406b8d1989703b2e3d9da94a8d262f7315f0be3?placeholderIfAbsent=true"
          alt="Portal logo"
          className="aspect-[3.28] object-contain w-[210px] self-stretch shrink-0 my-auto"
        />
      </div>

      {/* Right: Nav */}
      <nav className="self-stretch flex min-w-60 items-center gap-6 text-sm font-medium tracking-[0.1px] leading-none flex-wrap my-auto max-md:max-w-full">
        {/* Language chooser (matches screenshot) */}
        <div className="flex items-center gap-3">
          <span className="text-[#212121] text-sm">Choose your language</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto px-2 py-1.5 gap-2 text-sm font-medium text-[#1e4fa3] hover:bg-transparent hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1e4fa3]"
                aria-label="Choose your language"
              >
                <Globe className="h-5 w-5" />
                <span>{selectedLanguage}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[200px]">
              <DropdownMenuLabel>Select language</DropdownMenuLabel>
              {LANGUAGES.map((lang) => (
                <DropdownMenuItem key={lang} onClick={() => setSelectedLanguage(lang)}>
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Auth buttons */}
        <Button
          variant="outline"
          className="border-[#1E3C72] text-[#1E3C72] hover:text-white hover:bg-[#1E3C72] min-h-12 px-10 py-3.5 rounded-lg max-md:px-5"
        >
          Log in
        </Button>

        <Button onClick={()=>router.push('/auth/register')} className="bg-[#1E3C72] hover:bg-[#2a4d8a] text-white min-h-12 px-10 py-3.5 rounded-lg max-md:px-5">
          Sign up
        </Button>
      </nav>
    </header>
  );
};

export default Header;
