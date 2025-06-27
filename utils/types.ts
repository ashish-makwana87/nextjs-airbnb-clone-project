
export type actionFunction = (prevState: any,
 formData: FormData) => Promise<{message: string}>


export type PropertyCardType = {
 image: string,
 id: string,
 name: string,
 tagline: string,
 country: string,
 city: string,
 price: number, 
}

export type Booking = {
 checkIn: Date,
 checkOut: Date
}

export type DateRangeSelect = {
 startDate: Date,
 endDate: Date,
 key: string
}

