import { UseFormRegisterReturn, FieldError } from "react-hook-form";

export type FormValues = Record<string, string>;

export interface ErrorObj {
  errorCode: string;
  errorMsg: string;
  status: string;
  timestamp: string;
}

export interface LocationState {
  from: {
    pathname: string;
  };
}

export type TData = {
  [key: string]: string | number | object | null | undefined | React.ReactNode;
};

export interface InputObj {
  isInvalid: boolean;
  name: string;
  register: UseFormRegisterReturn;
  type: string;
  label: string;
  options?: Record<"value" | "name", string>[];
  error?: FieldError;
  size?: string;
  placeholder?: string;
  helperMessage?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  onChange?: (
    values:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

export type SubNav = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export type LoggedInUser = {
  firstName: string;
  lastName: string;
  locale: string;
  mobileNumber: string;
  role?: string;
  roles: { component: string; role: string }[];
  userType: string;
  userSubType: string;
  _id: string;
};

export type Position = "static" | "relative" | "absolute" | "sticky" | "fixed";
export type TextAlign =
  | "left"
  | "right"
  | "center"
  | "justify"
  | "initial"
  | "inherit";
export type TextTransform =
  | "none"
  | "capitalize"
  | "uppercase"
  | "lowercase"
  | "initial"
  | "inherit";

  export const COLUMN_TYPES = Object.freeze({
    DATE: "Date",
    MOBILE: "Mobile",
    VALUE: "DeliveryPlanValue",
    AMOUNT: "Amount",
    INVOICE: "Invoice",
    NAME: "Name",
    FEEDBACK: "feedback",
    MOBILE_WITH_SIZE: "mobile_with_size",
    FIRST_NAME_LAST_NAME_COMBINE: "combination",
    FULLNAME: "fullName",
    ACTIONS: "actions",
  });