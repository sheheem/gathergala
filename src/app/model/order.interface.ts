export interface iOrder {
    userId: string,
    orderId: string,
    orderDate: Date,
    organizerId: string,
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