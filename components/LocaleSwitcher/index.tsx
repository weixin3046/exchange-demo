"use client";

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
    <select value={currentLocale} onChange={(e) => switchLocale(e.target.value)}>
      <option value="en">English</option>
      <option value="zh">中文</option>
    </select>
  );
}
