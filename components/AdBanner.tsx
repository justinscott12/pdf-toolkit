"use client"

import { useEffect } from "react"

interface AdBannerProps {
  adSlot?: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  style?: React.CSSProperties
  className?: string
}

export function AdBanner({ 
  adSlot, 
  adFormat = "auto",
  style,
  className 
}: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      if (window.adsbygoogle && window.adsbygoogle.loaded) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  // Only render if AdSense publisher ID is configured
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  
  if (!publisherId) {
    return (
      <div 
        className={`bg-muted/50 border border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center ${className || ""}`}
        style={{ minHeight: "100px", ...style }}
      >
        <p className="text-xs text-muted-foreground">Ad Space</p>
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

