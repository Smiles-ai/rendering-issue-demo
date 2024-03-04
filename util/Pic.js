import Image from 'next/image';

export function Pic({
  src, alt, objectFit, quality, className, noTransition = false,
}) {
  return (
    <div className="h-full overflow-hidden">
      <Image
        {...(quality && { quality })}
        src={src}
        placeholder="blur"
        blurDataURL="/global/placeholder.png"
        alt={alt}
        fill
        // layout="fill"
        // sizes="100vw"
        style={{ objectFit: objectFit || 'contain' }} // contain cover fill scale-down revert none unset initial inherit
        className={`${noTransition ? '' : 'transition duration-500 ease-in-out '} ${className}`}
      />
    </div>
  );
}
