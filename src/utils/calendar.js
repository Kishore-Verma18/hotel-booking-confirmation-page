function formatIcsDate(isoDate, time) {
  const [hours, minutes] = time.split(':')
  return isoDate.replace(/-/g, '') + `T${hours}${minutes}00`
}

function escapeIcsText(value) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

export function downloadCalendarEvent(booking) {
  const { hotel, booking: stay, guest } = booking
  const uid = `${stay.receiptNumber}-${stay.receiptCode}@maisonsoleil.fr`
  const now = new Date()
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

  const description = [
    `Guest: ${guest.firstName}`,
    `Room: ${stay.room}`,
    `Confirmation: ${stay.receiptNumber} ${stay.receiptCode}`,
    `Check-in: ${stay.checkIn.dayLabel} ${stay.checkIn.displayDate} at ${stay.checkIn.time}`,
    `Check-out: ${stay.checkOut.dayLabel} ${stay.checkOut.displayDate} at ${stay.checkOut.time}`,
  ].join('\n')

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Maison Soleil//Booking Confirmation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${formatIcsDate(stay.checkIn.isoDate, stay.checkIn.time)}`,
    `DTEND:${formatIcsDate(stay.checkOut.isoDate, stay.checkOut.time)}`,
    `SUMMARY:${escapeIcsText(`Stay at ${hotel.name} — ${stay.room}`)}`,
    `LOCATION:${escapeIcsText(hotel.calendarLocation)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `maison-soleil-stay-${stay.checkIn.isoDate}.ics`
  link.click()
  URL.revokeObjectURL(url)
}
