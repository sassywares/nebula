import { getLocaleTranslations } from "@/i18n/utils";
import { StarIcon } from "lucide-react";
import * as React from "react";
import { Badge } from "../badge";
import { Button, ButtonProps } from "../button";

export const TopbarStar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  async (props, ref) => {
    const t = await getLocaleTranslations({ namespace: "phrases" });

    return (
      <Button size="lg" variant="ghost" ref={ref} {...props}>
        <StarIcon /> {t("starOnGitHub")}{" "}
        <Badge size="sm" variant="secondary">
          69k
        </Badge>
      </Button>
    );
  },
);
TopbarStar.displayName = "TopbarStar";
