interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc: string;
  }
  
  export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ fallbackSrc, ...props }) => {
    return (
      <img
        {...props}
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget;
          target.onerror = null;
          target.src = fallbackSrc;
        }}
      />
    );
  };
  