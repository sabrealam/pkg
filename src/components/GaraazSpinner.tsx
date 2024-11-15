import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

const GaraazSpinner = () => {
  return (
    <Flex justifyContent="center" alignItems="center" minH="100vh">
      <Spinner size="xl" color="blue.500" />
    </Flex>
  );
};

export default GaraazSpinner;
