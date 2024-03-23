import Image, { ImageProps } from "next/image";

import { cn } from "@/lib/utils";

const PromoBanner = ({ alt, className, ...props }: ImageProps) => {
  return (
    <Image
      height={600}
      width={1620}
      className={cn("h-auto w-full rounded-sm object-cover", className)}
      sizes="100vw"
      alt={alt}
      {...props}
    />
  );
};

export default PromoBanner;
