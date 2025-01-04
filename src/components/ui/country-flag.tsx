import { cn } from "@/utils";
import { type FC } from "react";

interface CountryFlagProps {
  countryCode: string;
  variant?: 'emoji' | 'cdn' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

export const CountryFlag: FC<CountryFlagProps> = ({ 
  countryCode, 
  variant = 'cdn', 
  size = 'sm' 
}) => {
  const sizeMap = {
    sm: 'h-4',
    md: 'h-5',
    lg: 'h-6'
  };

  if (!countryCode) return null;

  const getFlagUrl = (code: string) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

  switch (variant) {
    case 'emoji':
      return (
        <span className="text-lg">
          {countryCode.toUpperCase().replace(/./g, char => 
            String.fromCodePoint(char.charCodeAt(0) + 127397)
          )}
        </span>
      );
    case 'cdn':
    default:
      return (
        <img
          src={getFlagUrl(countryCode)}
          alt={`Flag of ${countryCode}`}
          className={cn(
            sizeMap[size],
            "w-auto flex-shrink-0 shadow-sm rounded-sm"
          )}
        />
      );
  }
}; 