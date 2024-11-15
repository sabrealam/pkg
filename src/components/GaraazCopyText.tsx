import React, { useState } from "react";
import { Text, Icon, Tooltip } from "@chakra-ui/react";
import { FaRegCopy } from "react-icons/fa";
import { CheckCircleOutline } from "@mui/icons-material";

interface Props {
  text: string;
  popOverMessage: string;
}

const GarrazCopyText: React.FC<Props> = ({ text, popOverMessage }) => {
  const [isToolTipDisabled, setIsToolTipDisabled] = useState(false);
  const handleCopyClick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    setIsToolTipDisabled(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setIsToolTipDisabled(false);
    }, 1200);
  };

  return (
    <Tooltip
      padding={"10px"}
      border={"0.4px solid grey"}
      borderRadius={"5px"}
      bg={"white"}
      isOpen={isToolTipDisabled}
      label={
        <Text color={"green"}
        fontSize={"s"}>
          <Icon boxSize={"4"}>
            <CheckCircleOutline />
          </Icon>
          {popOverMessage}
        </Text>
      }
    >
      <Text
        onClick={(e: any) => {
          handleCopyClick(e);
        }}
        color={"black"}
        cursor={"pointer"}
        ml="1"
        fontSize={"xs"}
      >
        <FaRegCopy />
      </Text>
    </Tooltip>
  );
};

export default GarrazCopyText;
