import React from "react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";

interface Props {
  value: string;
}

const GaraazAttachmentIcon: React.FC<Props> = ({ value }) => {
  const handleOpenDocument = () => {
    window.open(value, "_blank");
  };

  return (
    <a href={value} target="_blank" rel="noopener noreferrer">
      <Tooltip label="View">
        <AttachmentIcon cursor="pointer" onClick={handleOpenDocument} />
      </Tooltip>
    </a>
  );
};

export default GaraazAttachmentIcon;
