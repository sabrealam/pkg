import React from "react";
import { Box, HStack, Input, Select, Text } from "@chakra-ui/react";
import { quickDateRangeFormat } from "../utils/dateFormates";


function GaraazDateRange({
  startDate,
  endDate,
  onDateChange,
  isDisabled = false,
  maxDate,
  minDate = startDate,
}: any) {
  const quickDateRange = [
    'Today',
    'Yesterday',
    'This Week',
    "Advance Option",
    'Last Week',
    'This Month',
    'Last Month',
    'This Year',
    'Last Year'
  ];
  const handleStartDateChange = (e: any) => {
    onDateChange(e.target.value, endDate);
  };

  const handleEndDateChange = (e: any) => {
    onDateChange(startDate, e.target.value);
  };

  const handleQuickDateSelect = (range: any) => {
    const { startDate, endDate } = quickDateRangeFormat(range);
    onDateChange(startDate, endDate);
  };

  return (
    <Box mt="4">
      <Text fontWeight="bold" mb={3} borderBottom="0.5px solid lightgrey">
        Date Range
      </Text>
      <Box>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="sm">Start Date</Text>
          <Input
            isDisabled={isDisabled}
            type="date"
            width="60%"
            max={maxDate && maxDate}
            value={startDate}
            size="sm"
            onChange={handleStartDateChange}
          />
        </HStack>
        <HStack mt="1" justifyContent="space-between" alignItems="center">
          <Text fontSize="sm">End Date</Text>
          <Input
            isDisabled={isDisabled}
            type="date"
            width="60%"
            size="sm"
            min={minDate}
            max={maxDate && maxDate}
            value={endDate}
            onChange={handleEndDateChange}
          />
        </HStack>
        <HStack flexWrap="wrap" mt={3} justifyContent="space-between">
          {quickDateRange.slice(0, 3).map((range, index) => (
            <Text
              key={index}
              fontSize="small"
              display="flex"
              alignItems="center"
              mr={2}
              color="#4895ef"
              cursor={isDisabled ? "not-allowed" : "pointer"}
              textDecoration="underline"
              onClick={() => !isDisabled && handleQuickDateSelect(range)}
            >
              {range}
            </Text>
          ))}
          <Select
            size="sm"
            width="500px"
            onChange={(e) => handleQuickDateSelect(e.target.value)}
            isDisabled={isDisabled}
          >
            {quickDateRange.slice(3).map((range, index) => (
              <option value={range} key={index}>
                {range}
              </option>
            ))}
          </Select>
        </HStack>
      </Box>
    </Box>
  );
}


export default GaraazDateRange