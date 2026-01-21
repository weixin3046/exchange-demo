"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

const locales = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale;

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const currentLocaleData = locales.find((l) => l.code === currentLocale);

  return (
    <Select onValueChange={switchLocale} defaultValue={currentLocale as string}>
      <SelectTrigger className="bg-background/50 border-border h-9 w-[140px] backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue placeholder="Language">
            <div className="flex items-center gap-2">
              <span>{currentLocaleData?.flag}</span>
              <span className="text-sm">{currentLocaleData?.code.toUpperCase()}</span>
            </div>
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale.code} value={locale.code}>
            <div className="flex items-center gap-2">
              <span>{locale.flag}</span>
              <span>{locale.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
