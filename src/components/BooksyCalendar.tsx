import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Sparkles, AlertCircle } from 'lucide-react';

interface BooksyCalendarProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onChange: (date: Date, time: string) => void;
}

export default function BooksyCalendar({ selectedDate, selectedTime, onChange }: BooksyCalendarProps) {
  // We initialize the calendar to June 2026 or July 2026.
  // The user request timestamp is June 28, 2026.
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // 0-indexed: 5 is June, 6 is July

  // Standard month list
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Helper to get number of days in a month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper to get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 5 && currentYear === 2026) return; // Don't go past June 2026 for past slots
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Generate calendar cells
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  const daysArray = [];
  // Empty spaces for previous month's offset
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(new Date(currentYear, currentMonth, i));
  }

  // Check if date is in the past (before June 28, 2026)
  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    const today = new Date(2026, 5, 28); // Hardcode relative to user current time
    // Reset hours for comparison
    const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const compareToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // Also disable Sundays as our team rests
    if (date.getDay() === 0) return true;

    return compareDate < compareToday;
  };

  // Predefined time slots with emotional taglines
  const timeSlots = [
    {
      id: "9-am",
      time: "09:00 AM",
      label: "Gentle Morning Start",
      desc: "Minimal street noise, perfect for starting the day with calm focus.",
      status: "available", // available, limited, filled
    },
    {
      id: "1-pm",
      time: "01:00 PM",
      label: "Soft Mid-Day Reset",
      desc: "Warm ambient daylight, ideal if you prefer quiet mid-day energy.",
      status: "available",
    },
    {
      id: "4-pm",
      time: "04:30 PM",
      label: "Late Afternoon Calm",
      desc: "Sunset transition, perfect for winding down your space before evening.",
      status: "limited", // limited indicator
    }
  ];

  // Check custom slot occupancy based on day of week to make it look active like Booksy
  const getSlotStatus = (date: Date | null, slotId: string) => {
    if (!date) return "available";
    const day = date.getDay();
    // Wednesday mid-day filled, Friday afternoons limited
    if (day === 3 && slotId === "1-pm") return "filled";
    if (day === 5 && slotId === "4-pm") return "filled";
    if (day === 2 && slotId === "9-am") return "limited";
    return "available";
  };

  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date)) return;
    // Keep previous time if valid, or select first available
    const initialTime = selectedTime || "09:00 AM";
    onChange(date, initialTime);
  };

  const handleTimeSelect = (timeStr: string) => {
    if (selectedDate) {
      onChange(selectedDate, timeStr);
    }
  };

  const formatDateLabel = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="w-full flex flex-col gap-6" id="booksy-calendar-widget">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Calendar Grid (Left or Top) */}
        <div className="md:col-span-7 bg-white p-5 rounded-2xl border border-navy-100/60 shadow-xs">
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-serif text-base text-navy-800 font-semibold flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-rose-500" />
              {monthNames[currentMonth]} {currentYear}
            </h5>
            <div className="flex gap-1.5">
              <button
                id="cal-btn-prev"
                type="button"
                onClick={handlePrevMonth}
                disabled={currentMonth === 5 && currentYear === 2026}
                className="w-8 h-8 rounded-lg bg-cream-50 hover:bg-cream-100/70 text-navy-800 flex items-center justify-center transition-colors disabled:opacity-30 disabled:hover:bg-cream-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="cal-btn-next"
                type="button"
                onClick={handleNextMonth}
                className="w-8 h-8 rounded-lg bg-cream-50 hover:bg-cream-100/70 text-navy-800 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {daysOfWeek.map((day) => (
              <span key={day} className="text-[10px] font-bold text-navy-400 uppercase tracking-wider py-1">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {daysArray.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const isDisabled = isDateDisabled(date);
              const isSelected = selectedDate 
                ? date.getDate() === selectedDate.getDate() && 
                  date.getMonth() === selectedDate.getMonth() && 
                  date.getFullYear() === selectedDate.getFullYear()
                : false;

              return (
                <button
                  key={`day-${index}`}
                  id={`cal-day-${date.getMonth() + 1}-${date.getDate()}`}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleDateSelect(date)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs relative transition-all duration-300 ${
                    isSelected
                      ? "bg-rose-500 text-warm-white font-bold shadow-sm scale-105"
                      : isDisabled
                        ? "text-navy-300/50 bg-transparent cursor-not-allowed"
                        : "bg-cream-50/40 hover:bg-rose-50/70 text-navy-800 hover:text-rose-700"
                  }`}
                >
                  <span>{date.getDate()}</span>
                  
                  {/* Subtle active indicator for weekends/rest days */}
                  {date.getDay() === 0 && (
                    <span className="absolute bottom-1 text-[7px] text-navy-300 scale-75">Rest</span>
                  )}
                  
                  {/* Small availability dot under day if active */}
                  {!isDisabled && !isSelected && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-cream-100 flex items-center gap-4 text-[10px] text-navy-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Selected
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-300" /> Available Days
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-navy-300/30" /> Rest / Full
            </span>
          </div>

        </div>

        {/* Time Slot Picker (Right or Bottom) */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div className="bg-white/80 p-5 rounded-2xl border border-navy-100/60 shadow-xs h-full flex flex-col">
            <h5 className="font-serif text-base text-navy-800 font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-lavender-600" />
              Available Soft Hours
            </h5>

            {selectedDate ? (
              <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[220px] pr-1">
                <span className="block text-[11px] font-mono text-navy-500 mb-1">
                  Availability for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}:
                </span>
                
                {timeSlots.map((slot) => {
                  const status = getSlotStatus(selectedDate, slot.id);
                  const isFilled = status === "filled";
                  const isLimited = status === "limited";
                  const isSlotSelected = selectedTime === slot.time;

                  return (
                    <button
                      key={slot.id}
                      id={`time-slot-btn-${slot.id}`}
                      type="button"
                      disabled={isFilled}
                      onClick={() => handleTimeSelect(slot.time)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all duration-300 ${
                        isSlotSelected
                          ? "bg-navy-800 border-navy-800 text-warm-white shadow-sm"
                          : isFilled
                            ? "bg-navy-100/20 border-navy-100/20 text-navy-300/60 cursor-not-allowed"
                            : "bg-white hover:bg-lavender-50 border-navy-100/50 text-navy-800 hover:border-lavender-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold tracking-wide">{slot.time}</span>
                        {isFilled ? (
                          <span className="text-[9px] bg-navy-100 text-navy-400 px-1.5 py-0.5 rounded font-semibold uppercase">Filled</span>
                        ) : isLimited ? (
                          <span className="text-[9px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded font-semibold uppercase">1 Left</span>
                        ) : (
                          <span className="text-[9px] bg-lavender-100/80 text-lavender-700 px-1.5 py-0.5 rounded font-semibold uppercase">Available</span>
                        )}
                      </div>
                      <span className={`block font-medium ${isSlotSelected ? 'text-rose-200' : 'text-navy-700'}`}>
                        {slot.label}
                      </span>
                      <p className={`text-[10px] mt-0.5 leading-relaxed ${isSlotSelected ? 'text-warm-white/80' : 'text-navy-500/80'}`}>
                        {slot.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-navy-400 p-4 border border-dashed border-navy-200/30 rounded-xl bg-white/40">
                <AlertCircle className="w-8 h-8 text-rose-300 mb-2 stroke-[1.5]" />
                <p className="text-xs">
                  Please pick a date on the calendar first to view available time slots.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Selected Schedule Reassurance Summary */}
      {selectedDate && selectedTime && (
        <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <span className="block text-xs font-semibold text-navy-800">
              Your Chosen Calm Space Reservation
            </span>
            <p className="text-xs text-navy-600 mt-1 leading-relaxed">
              We have soft-reserved <strong className="text-navy-800">{formatDateLabel(selectedDate)}</strong> around <strong className="text-navy-800">{selectedTime}</strong> for your visit. Your session is held with absolute care and zero moral pressure.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
