  import { IconHome, IconBrandGithub, IconBrandTwitter, IconInfoCircle } from '@tabler/icons-react';
import { NavigationItem } from '../types';

export const navigationItems: NavigationItem[] = [
  {
    title: "ChessWrapped",
    icon: <IconHome className="h-full w-full text-white stroke-[1.5]" />,
    href: "/",
  },
  {
    title: "About",
    icon: <IconInfoCircle className="h-full w-full text-white stroke-[1.5]" />,
    href: "/about",
  },
  {
    title: "GitHub",
    icon: <IconBrandGithub className="h-full w-full text-white stroke-[1.5]" />,
    href: "https://github.com/bot-rakshit",
  },
  {
    title: "Twitter",
    icon: <IconBrandTwitter className="h-full w-full text-white stroke-[1.5]" />,
    href: "https://twitter.com/Ra1kshit",
  },
]; 