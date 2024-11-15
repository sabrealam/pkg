import React, { FC } from "react";
import { Tooltip } from "@chakra-ui/react";

interface GaraazTooltipProps {
  name: string;
  value: string;
}

const GaraazTooltip: FC<GaraazTooltipProps> = ({ name, value }) => {
  const tooltipLabel = name.charAt(0).toUpperCase() + name.slice(1);
  const truncatedValue = value.substring(0, 16) + "...";

  return (
    <Tooltip
      label={tooltipLabel}
      style={{
        textDecoration: "none",
        cursor: "default",
        textTransform: "capitalize",
      }}
      _hover={{
        textTransform: "capitalize",
      }}
    >
      <span>{truncatedValue}</span>
    </Tooltip>
  );
};

export default GaraazTooltip;
