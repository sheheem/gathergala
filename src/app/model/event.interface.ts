export interface iEvent {
    _id: string;
    organizerId: string;
    eventName: string;
    eventType: string;
    startDate: Date;
    endDate: Date;
    eventDescription: string;
    ticketType: string;
    ticketNumber: number;
    ticketPrice: number;
    ticketDescription: string;
    imageUrl: string;
    location: string;
    longitude: number;
    latitude: number;
}