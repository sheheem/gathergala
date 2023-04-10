export interface iOrder {
    userId: string,
    eventId: {
        imageUrl: string,
        startDate: Date,
        endDate: Date,
        location: string
    }
    ticketId: string,
    eventName: string,
    totalPrice: number,
    ticketPrice: number,
    totalTickets: number,
    ticketType: string
}