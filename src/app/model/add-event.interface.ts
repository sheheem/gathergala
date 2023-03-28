export interface AddEvent {
    eventName: string,
    eventTitle: string,
    startDate: Date,
    endDate: Date,
    eventDescription: string,
    ticketType: string,
    ticketCount: number,
    ticketPrice: number,
    ticketDescription: string,
    imageUrl: string,
    location: string
}