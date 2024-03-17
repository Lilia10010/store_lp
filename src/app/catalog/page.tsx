import { Badge } from "@/components/ui/badge";
import CategoryItem from "../(home)/components/category-item";
import { ShapesIcon } from "lucide-react";
import { prismaClient } from "@/lib/prisma";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany({});

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge variant="outline" className="w-fit px-4 py-2">
        <ShapesIcon size={16} />
        Catálogo
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
