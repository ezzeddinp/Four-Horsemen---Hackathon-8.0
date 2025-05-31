"use client";

import * as React from "react";
import { View, Text, Pressable } from "react-native";
import {
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
} from "date-fns";
import { id } from "date-fns/locale";

interface CalendarProps {
  mode?: "single";
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
  disabled?: (date: Date) => boolean;
}

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  className,
  disabled,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const weekDays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDatePress = (date: Date) => {
    if (disabled?.(date)) return;
    onSelect?.(date);
  };

  return (
    <View className={`bg-white rounded-lg p-4 ${className}`}>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Pressable onPress={handlePrevMonth}>
          <Text className="text-[#a78df8] text-lg">←</Text>
        </Pressable>
        <Text className="text-lg font-bold">
          {format(currentMonth, "MMMM yyyy", { locale: id })}
        </Text>
        <Pressable onPress={handleNextMonth}>
          <Text className="text-[#a78df8] text-lg">→</Text>
        </Pressable>
      </View>

      {/* Week days */}
      <View className="flex-row justify-between mb-2">
        {weekDays.map((day) => (
          <Text key={day} className="text-center w-10 text-sm text-gray-500">
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar grid */}
      <View className="flex-row flex-wrap">
        {days.map((date: Date) => {
          const isSelected = selected && isSameDay(date, selected);
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const isDisabled = disabled?.(date);

          return (
            <Pressable
              key={date.toISOString()}
              onPress={() => handleDatePress(date)}
              className={`w-10 h-10 items-center justify-center rounded-full ${
                isSelected
                  ? "bg-[#a78df8]"
                  : isDisabled
                  ? "opacity-50"
                  : "hover:bg-gray-100"
              }`}
              disabled={isDisabled}
            >
              <Text
                className={`text-sm ${
                  isSelected
                    ? "text-white"
                    : isCurrentMonth
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                {format(date, "d")}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
