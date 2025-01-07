"use client";

import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { CalendarIcon } from "lucide-react";
import { Button } from "./button";

import "react-datepicker/dist/react-datepicker.css";

export interface DateTimePickerProps {
  onChange: (date: Date | null) => void;
  selected: Date | null;
  showTimeSelect?: boolean;
  dateFormat?: string;
}

export const DateTimePicker = forwardRef<DatePicker, DateTimePickerProps>(
  (
    {
      onChange,
      selected,
      showTimeSelect = true,
      dateFormat = "MMMM d, yyyy h:mm aa",
      ...props
    },
    ref
  ) => {
    return (
      <DatePicker
        ref={ref}
        selected={selected}
        onChange={onChange}
        showTimeSelect={showTimeSelect}
        dateFormat={dateFormat}
        customInput={<CustomInput />}
        {...props}
      />
    );
  }
);

DateTimePicker.displayName = "DateTimePicker";

const CustomInput = forwardRef<
  HTMLButtonElement,
  { value?: string; onClick?: () => void }
>(({ value, onClick }, ref) => (
  <Button
    variant="outline"
    onClick={onClick}
    ref={ref}
    className="w-full justify-start text-left font-normal"
  >
    <CalendarIcon className="mr-2 h-4 w-4" />
    {value || "Select date and time"}
  </Button>
));

CustomInput.displayName = "CustomInput";
