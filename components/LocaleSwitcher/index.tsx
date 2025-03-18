"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname(); // 当前路径
  const params = useParams();
  const currentLocale = params.locale; // 获取当前语言
  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath); // 切换语言并导航
  };

  return (
    <>
      <Select onValueChange={switchLocale} defaultValue={currentLocale as string}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={"select"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="zh">中文</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
