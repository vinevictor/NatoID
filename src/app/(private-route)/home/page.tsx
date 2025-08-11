"use client";

import { useRouter } from "next/navigation";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { modules } from "@/lib/modules";

export default function Home() {
  const router = useRouter();

  const handleModuleClick = (route: string) => {
    router.push(route);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Módulos do Sistema
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onClick={handleModuleClick}
          />
        ))}
      </div>
    </div>
  );
}
