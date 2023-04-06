import { iTicket } from "./ticket.interface"

export interface AddEvent {
    eventName: string,
    eventTitle: string,
    startDate: Date,
    endDate: Date,
    eventDescription: string,
    ticket: iTicket,
    imageUrl: string,
    location: string
}