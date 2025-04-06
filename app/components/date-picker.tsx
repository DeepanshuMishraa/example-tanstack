"use client"

import * as React from "react"
import { format } from "date-fns"
import { ArrowDown, CalendarIcon, ChevronsDownIcon, CornerDownLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            !date && "text-muted-foreground"
          )}
        >

          {date ? format(date, "PPP") : <span className="flex items-center justify-center">Today <ChevronsDownIcon className="ml-1"/></span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
