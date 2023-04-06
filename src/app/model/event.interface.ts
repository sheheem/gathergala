import { iVendorProfile } from "./profile.model";
import { iTicket } from "./ticket.interface";

export interface iEvent {
    _id: string;
    organizerId: iVendorProfile;
    eventName: string;
    eventType: string;
    startDate: Date;
    endDate: Date;
    eventDescription: string;
    tickets: iTicket[],
    imageUrl: string;
    location: string;
    longitude: number;
    latitude: number;
}