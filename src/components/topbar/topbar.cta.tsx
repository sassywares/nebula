"use client";

import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Button, ButtonProps } from "../button";

export const TopbarCta = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "className"> & {
    className?: {
      mobile?: string;
      desktop?: string;
    };
  }
>(({ className, ...props }, ref) => {
  const t = useTranslations("phrases");

  return (
    <>
      {/* Desktop button */}
      <Button ref={ref} size="lg" className={className?.desktop} {...props}>
        {t("getStarted")}
      </Button>

      {/* Mobile button */}
      <Button ref={ref} size="icon-lg" className={className?.mobile} {...props}>
        <ArrowRightIcon />
        <span className="sr-only">{t("getStarted")}</span>
      </Button>
    </>
  );
});
TopbarCta.displayName = "TopbarCta";
