import Categories from "./components/categories";
import Link from "next/link";
import ProductList from "@/components/ui/product-list";
import PromoBanner from "./components/promo-banner";
import SectionTitle from "@/components/ui/section-title";
import { prismaClient } from "@/lib/prisma";
import { useSession } from "next-auth/react";

export default async function Home() {
  /*  const { data } = useSession(); */

  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <>
      <div className="mx-auto max-w-[1920px]">
        <PromoBanner
          /*   src="/deals-banner.png" */
          src="/banner-home-01.jpeg"
          className="h-auto max-h-60 w-full sm:max-h-[600px]"
          alt="Banner principal"
        />
      </div>
      <div className="mx-auto flex flex-col gap-8 py-8 lg:container lg:gap-10">
        <div className="px-5 lg:mt-2">
          <Categories />
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Ofertas</SectionTitle>
          <ProductList products={deals} />
        </div>

        <div className="flex flex-col lg:flex-row">
          <Link href="/category/mouses" className="flex flex-1">
            <PromoBanner
              src="/image_coding_rock.jpeg"
              alt="Até 55% de desconto em mouses!"
              className="max-h-48 flex-1 px-5 sm:max-h-[400px]"
            />
          </Link>

          <Link href="/category/headphones" className="flex flex-1">
            <PromoBanner
              src="/image_coding_rock.jpeg"
              alt="Até 55% de desconto em fones!"
              className="hidden max-h-[400px] w-0 flex-1 lg:block"
            />
          </Link>
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Teclados</SectionTitle>
          <ProductList products={keyboards} />
        </div>

        <div>
          <Link href="/category/headphones">
            <PromoBanner
              src="/image_coding_rock.jpeg"
              alt="Até 55% de desconto em mouses!"
              className="max-h-48 px-5 lg:hidden"
            />
          </Link>

          <Link href="/catalog">
            <PromoBanner
              src="/image_coding_rock.jpeg"
              alt="Até 55% de desconto em mouses!"
              className="hidden max-h-[400px] w-0  px-5 sm:w-full lg:block"
            />
          </Link>
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Mouses</SectionTitle>
          <ProductList products={mouses} />
        </div>
      </div>
    </>
  );
}
