import React from "react";
import { useState, useEffect, useCallback } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Select,
  Button,
  Flex,
  Box,
  Input,
  Text,
} from "@chakra-ui/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import axios from "axios";
import _ from "lodash";
import  capitalizeEveryWord  from "../utils/capitalizeEveryWord";
import  parseMobileNumber  from "../utils/parseMobileNumber";
import  formatDate  from "../utils/formatDate";
import GaraazInfinityIcon from "./GaraazInfinityIcon";
import GaraazAttachmentIcon from "./GaraazAttachmentIcon";
import GaraazTooltip from "./GaraazTooltip";
import { COLUMN_TYPES } from "../utils/types";
import  GaraazCustomerFeedbacksComments  from "./GaraazCustomerFeedbacksComments";
import GaraazSpinner from "./GaraazSpinner";
import GaraazCopyText from "./GaraazCopyText";


const tableHeadingStyles: React.CSSProperties = {
  backgroundColor: "#1e293b",
  color: "#FFFFFF",
  fontSize: "xs",
  borderLeft: "2px solid #FFFFFF",
  fontFamily: "sans-serif",
  fontWeight: 700,
  textTransform: "uppercase",
  textAlign: "center" ,
  cursor: "pointer",
  position: "sticky" ,
  top: 0,
  zIndex: 1,
};

interface Column {
  header: string;
  accessor: string;
  type?: string;
  isSortable?: boolean;
  copyable?: boolean;
}

interface TableProps {
  url: string;
  columns: Column[];
  limits: number[];
  defaultRowLimit?: number;
  handleRowClick?: (row: any) => void;
  isFetching?: boolean;
  setIsFetching?: React.Dispatch<React.SetStateAction<boolean>>;
  dataAccessor?: string;
  countAccessor?:string;
  ActionCell?: any;
  authorizationAPItoken: string;
}

const GaraazTable: React.FC<TableProps> = ({
  url,
  columns,
  limits,
  defaultRowLimit = 50,
  handleRowClick,
  setIsFetching,
  dataAccessor = "data",
  countAccessor = "count",
  ActionCell,
  authorizationAPItoken
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState<number>(defaultRowLimit);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      if (setIsFetching) setIsFetching(true);

      const response = await axios.get(`${url}`, {
        headers: {
          Authorization: `${authorizationAPItoken}`,
        },
        params: {
          offset: limit * (currentPage - 1),
          limit: limit,
        },
      });

      if (setIsFetching) setIsFetching(false);

      const responseData = response.data;

      let data = responseData[dataAccessor];
      let totalData = responseData[countAccessor];

      setData(data);
      setTotal(totalData ?? 0);
      setTotalPages(Math.ceil(totalData / limit));
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setTotalPages(Math.ceil(total / limit));
  }, [total]);

  useEffect(() => {
    setCurrentPage(1);
  }, [url]);

  useEffect(() => {
    if (currentPage > 0) {
      fetchData();
    }
  }, [url, limit, currentPage]);

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) setCurrentPage(currentPage);
    setCurrentPage(page);
  };

  const handlePreviousPageClick = (currentPage: number) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPageClick = (currentPage: number) => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleHeaderClick = (column: Column, sortOrder: any) => {
    if (
      column.type === COLUMN_TYPES.DATE ||
      column.type === COLUMN_TYPES.AMOUNT ||
      column.type === COLUMN_TYPES.VALUE
    ) {
      let sortData = data.sort((a, b) => {
        const dateA = new Date(_.get(a, column.accessor)).getTime();
        const dateB = new Date(_.get(b, column.accessor)).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
      setData(sortData);
    } else {
      let sortData = data.sort((a, b) => {
        let valueA = capitalizeEveryWord(_.get(a, column.accessor));
        const valueB = capitalizeEveryWord(_.get(b, column.accessor));

        return sortOrder === "asc"
          ? valueA < valueB
            ? -1
            : 1
          : valueA > valueB
          ? -1
          : 1;
      });
      setData(sortData);
    }

    setSortColumn(column.accessor);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (loading) {
    return <GaraazSpinner />;
  }

  if (error) {
    return <Box>There was an error with loading the data.</Box>;
  }

  return (
    <Box w="full" height={"80vh"} overflowY={"scroll"}>
      <Table variant="striped">
        <Thead>
          <Tr>
            {columns?.map((column) => (
              <Th
                key={column.accessor}
                style={{
                  ...tableHeadingStyles,
                  cursor: column.isSortable ? "pointer" : "auto",
                }}
                onClick={() => handleHeaderClick(column, sortOrder)}
              >
                {column.header}
                {sortColumn === column.accessor && (
                  <Box as="span" ml={1}>
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </Box>
                )}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {data?.map((row, index) => {
            return (
              <Tr
                key={index}
                fontSize={"md"}
                cursor={"pointer"}
                onClick={() => {
                  if (handleRowClick) handleRowClick(row);
                }}
              >
                {columns?.map((column) => {
                  let value = _.get(row, column.accessor);

                  if (column.type === COLUMN_TYPES.MOBILE) {
                    value = parseMobileNumber(value);
                  } else if (column.type === COLUMN_TYPES.MOBILE_WITH_SIZE) {
                    if (
                      value &&
                      (value.length > 10 || value.toString().length > 10)
                    ) {
                      value = value.toString().substr(2);
                    }
                  } else if (column.type === COLUMN_TYPES.DATE) {
                    value = (
                      <span style={{ whiteSpace: "nowrap" }}>
                        {formatDate(value)}
                      </span>
                    );
                  } else if (
                    column.type === COLUMN_TYPES.VALUE &&
                    value > 1000
                  ) {
                    value = <GaraazInfinityIcon />;
                  } else if (column.type === COLUMN_TYPES.AMOUNT) {
                    if (value) {
                      value = `₹ ${value}`;
                    }
                  } else if (column.type === COLUMN_TYPES.INVOICE && value) {
                    value = <GaraazAttachmentIcon value={value} />;
                  } else if (
                    column.type === COLUMN_TYPES.NAME &&
                    value &&
                    value.length > 19
                  ) {
                    let name = value;
                    name = capitalizeEveryWord(name);
                    value = <GaraazTooltip name={name} value={value} />;
                  } else if (column.type === COLUMN_TYPES.FULLNAME) {
                    value = capitalizeEveryWord(value);
                  } else if (column.type === COLUMN_TYPES.FEEDBACK) {
                    value = row.feedback;
                    if (value == undefined) {
                      value = "";
                    }
                    value = <GaraazCustomerFeedbacksComments value={value} />;
                  } else if (
                    column.type === COLUMN_TYPES.FIRST_NAME_LAST_NAME_COMBINE
                  ) {
                    value =
                      _.get(row, `${column.accessor}.firstName`) +
                      " " +
                      _.get(row, `${column.accessor}.lastName`);
                    if (value && value.length > 19)
                      value = <GaraazTooltip name={value} value={value} />;
                  } else if (column.type === COLUMN_TYPES.ACTIONS) {
                    value = <ActionCell customerData={row}></ActionCell>;
                  }

                  return (
                    <Td
                      key={column.accessor}
                      textTransform="capitalize"
                      textAlign={"center"}
                      onClick={(e:any) => {
                        if (column.type === COLUMN_TYPES.ACTIONS)
                          e.stopPropagation();
                      }}
                      position={"relative"}
                    >
                      {value}
                      {column.copyable && (
                        <Text as={"span"} position={"absolute"} ml={2} top={5}>
                          {" "}
                          <GaraazCopyText
                            text={value}
                            popOverMessage={"Copied!"}
                          />
                        </Text>
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>

        <TableCaption>
          <Flex align="center" justify="space-between">
            <Box fontSize={16} flex={"none"}>
              Showing Results{" "}
              {currentPage > 1 ? limit * (currentPage - 1) + 1 : currentPage} to{" "}
              {limit * currentPage <= total ? limit * currentPage : total}{" "}
              result of {total} Results
            </Box>
            <Flex align={"center"} justify="space-between">
              <Box fontSize={16} mr={2}>
                Rows per page:
              </Box>
              <Box>
                <Select value={limit} onChange={handleRowsPerPageChange} mr={8}>
                  {limits.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Box>
            </Flex>
            <Flex align="center">
              <Box width={40} fontSize={16}>
                Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
              </Box>
              <Button
                onClick={() => handlePreviousPageClick(currentPage)}
                disabled={currentPage === 1}
                mr={2}
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                onClick={() => handleNextPageClick(currentPage)}
                disabled={currentPage === totalPages}
                ml={2}
                mr={6}
              >
                <ChevronRightIcon />
              </Button>
              <Box fontSize={16}> Go to page:</Box>
              <Input
                type="number"
                min={1}
                max={totalPages}
                value={currentPage || ""}
                onChange={(e:any) => handlePageChange(Number(e.target.value))}
                w="16"
                mx={2}
              />
            </Flex>
          </Flex>
        </TableCaption>
      </Table>
    </Box>
  );
};
export default GaraazTable;