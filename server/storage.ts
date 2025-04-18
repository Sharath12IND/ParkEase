import { users, type User, type InsertUser, 
         vehicles, type Vehicle, type InsertVehicle,
         parkingFacilities, type ParkingFacility, type InsertParkingFacility,
         parkingSlots, type ParkingSlot, type InsertParkingSlot,
         bookings, type Booking, type InsertBooking,
         reviews, type Review, type InsertReview } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// Interface for all storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Vehicle operations
  getVehiclesByUserId(userId: number): Promise<Vehicle[]>;
  getVehicleById(id: number): Promise<Vehicle | undefined>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  
  // Parking facility operations
  getAllParkingFacilities(): Promise<ParkingFacility[]>;
  getParkingFacilityById(id: number): Promise<ParkingFacility | undefined>;
  createParkingFacility(facility: InsertParkingFacility): Promise<ParkingFacility>;
  getFacilitiesByOwnerId(ownerId: number): Promise<ParkingFacility[]>;
  updateFacilityRating(facilityId: number): Promise<ParkingFacility>;
  
  // Parking slot operations
  getSlotsByFacilityId(facilityId: number): Promise<ParkingSlot[]>;
  getSlotById(id: number): Promise<ParkingSlot | undefined>;
  updateSlotStatus(id: number, status: string): Promise<ParkingSlot>;
  createSlot(slot: InsertParkingSlot): Promise<ParkingSlot>;
  checkSlotAvailability(slotId: number, facilityId: number, startTime: Date, endTime: Date): Promise<boolean>;
  
  // Booking operations
  getBookingsByUserId(userId: number): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking & { qrCode: string }): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking>;
  getBookingsByFacilityIds(facilityIds: number[]): Promise<Booking[]>;
  
  // Review operations
  getReviewsByFacilityId(facilityId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Session store
  sessionStore: session.SessionStore;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private vehicles: Map<number, Vehicle>;
  private parkingFacilities: Map<number, ParkingFacility>;
  private parkingSlots: Map<number, ParkingSlot>;
  private bookings: Map<number, Booking>;
  private reviews: Map<number, Review>;
  
  sessionStore: session.SessionStore;
  
  // IDs for auto-increment
  private userIdCounter: number;
  private vehicleIdCounter: number;
  private facilityIdCounter: number;
  private slotIdCounter: number;
  private bookingIdCounter: number;
  private reviewIdCounter: number;

  constructor() {
    this.users = new Map();
    this.vehicles = new Map();
    this.parkingFacilities = new Map();
    this.parkingSlots = new Map();
    this.bookings = new Map();
    this.reviews = new Map();
    
    this.userIdCounter = 1;
    this.vehicleIdCounter = 1;
    this.facilityIdCounter = 1;
    this.slotIdCounter = 1;
    this.bookingIdCounter = 1;
    this.reviewIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Initialize with sample data
    this.initSampleData();
  }

  // Initialize with sample data
  private async initSampleData() {
    // Create sample users (vendor and customer)
    const vendor = await this.createUser({
      username: "mallowner",
      password: "password123",
      email: "mall@example.com",
      fullName: "Mall Owner",
      userType: "vendor"
    });
    
    const customer = await this.createUser({
      username: "customer",
      password: "password123",
      email: "customer@example.com",
      fullName: "John Customer",
      userType: "customer"
    });
    
    // Create sample parking facilities
    const facility1 = await this.createParkingFacility({
      name: "City Center Mall Parking",
      address: "123 Financial District Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10004",
      description: "Premium parking at the heart of downtown financial district",
      latitude: 40.7128,
      longitude: -74.006,
      totalSpaces: 250,
      hourlyRate: 5.99,
      dailyRate: 25.99,
      hasEVCharging: true,
      hasCovered: true,
      hasDisabled: true,
      has24HourAccess: true,
      hasSecurity: true,
      imageUrls: ["https://images.unsplash.com/photo-1621928372414-30e144d111a0", "https://images.unsplash.com/photo-1611521639504-f64cd0dd0d2d"],
      ownerId: vendor.id
    });
    
    const facility2 = await this.createParkingFacility({
      name: "Westfield Shopping Center",
      address: "456 Central Business District",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      description: "Convenient parking near premium shopping experience",
      latitude: 41.8781,
      longitude: -87.6298,
      totalSpaces: 180,
      hourlyRate: 4.5,
      dailyRate: 20.0,
      hasEVCharging: false,
      hasCovered: true,
      hasDisabled: true,
      has24HourAccess: true,
      hasSecurity: true,
      imageUrls: ["https://images.unsplash.com/photo-1617714651073-9a0a8f5d7cf2"],
      ownerId: vendor.id
    });
    
    // Create parking slots for facility 1
    for (let i = 1; i <= 20; i++) {
      const level = Math.floor((i-1) / 10) + 1;
      const slotType = i % 5 === 0 ? "ev" : (i % 7 === 0 ? "disabled" : "standard");
      const slotLetter = level === 1 ? "A" : "B";
      
      await this.createSlot({
        facilityId: facility1.id,
        slotNumber: `${slotLetter}${i % 10 === 0 ? 10 : i % 10}`,
        level,
        slotType,
        status: "available"
      });
    }
    
    // Create parking slots for facility 2
    for (let i = 1; i <= 20; i++) {
      const level = Math.floor((i-1) / 10) + 1;
      const slotType = i % 5 === 0 ? "ev" : (i % 7 === 0 ? "disabled" : "standard");
      const slotLetter = level === 1 ? "A" : "B";
      
      await this.createSlot({
        facilityId: facility2.id,
        slotNumber: `${slotLetter}${i % 10 === 0 ? 10 : i % 10}`,
        level,
        slotType,
        status: "available"
      });
    }
    
    // Create sample vehicle for customer
    await this.createVehicle({
      userId: customer.id,
      licensePlate: "EVR-423",
      make: "Tesla",
      model: "Model 3",
      vehicleType: "ev",
      isDefault: true
    });
    
    // Create sample reviews
    await this.createReview({
      userId: customer.id,
      facilityId: facility1.id,
      rating: 5,
      comment: "Great location, easy to find, and the QR code entry system worked flawlessly. Will definitely use again next time I visit the mall."
    });
    
    await this.createReview({
      userId: customer.id,
      facilityId: facility2.id,
      rating: 4,
      comment: "Very convenient and the app made it super easy to extend my parking time when shopping took longer than expected. Only drawback was slightly tight spaces."
    });
    
    // Update facility ratings
    await this.updateFacilityRating(facility1.id);
    await this.updateFacilityRating(facility2.id);
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      user => user.username === username
    );
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...userData, 
      id,
      createdAt: now
    };
    this.users.set(id, user);
    return user;
  }

  // Vehicle operations
  async getVehiclesByUserId(userId: number): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values()).filter(
      vehicle => vehicle.userId === userId
    );
  }

  async getVehicleById(id: number): Promise<Vehicle | undefined> {
    return this.vehicles.get(id);
  }

  async createVehicle(vehicleData: InsertVehicle): Promise<Vehicle> {
    const id = this.vehicleIdCounter++;
    const vehicle: Vehicle = { ...vehicleData, id };
    
    // If this is set as default, unset other defaults for this user
    if (vehicle.isDefault) {
      const userVehicles = await this.getVehiclesByUserId(vehicleData.userId);
      for (const existingVehicle of userVehicles) {
        if (existingVehicle.isDefault) {
          const updated = { ...existingVehicle, isDefault: false };
          this.vehicles.set(existingVehicle.id, updated);
        }
      }
    }
    
    this.vehicles.set(id, vehicle);
    return vehicle;
  }

  // Parking facility operations
  async getAllParkingFacilities(): Promise<ParkingFacility[]> {
    return Array.from(this.parkingFacilities.values());
  }

  async getParkingFacilityById(id: number): Promise<ParkingFacility | undefined> {
    return this.parkingFacilities.get(id);
  }

  async createParkingFacility(facilityData: InsertParkingFacility): Promise<ParkingFacility> {
    const id = this.facilityIdCounter++;
    const facility: ParkingFacility = { 
      ...facilityData, 
      id, 
      rating: 0, 
      reviewCount: 0 
    };
    this.parkingFacilities.set(id, facility);
    return facility;
  }

  async getFacilitiesByOwnerId(ownerId: number): Promise<ParkingFacility[]> {
    return Array.from(this.parkingFacilities.values()).filter(
      facility => facility.ownerId === ownerId
    );
  }

  async updateFacilityRating(facilityId: number): Promise<ParkingFacility> {
    const facilityReviews = await this.getReviewsByFacilityId(facilityId);
    const facility = await this.getParkingFacilityById(facilityId);
    
    if (!facility) {
      throw new Error("Facility not found");
    }
    
    if (facilityReviews.length === 0) {
      facility.rating = 0;
      facility.reviewCount = 0;
    } else {
      const totalRating = facilityReviews.reduce((sum, review) => sum + review.rating, 0);
      facility.rating = parseFloat((totalRating / facilityReviews.length).toFixed(1));
      facility.reviewCount = facilityReviews.length;
    }
    
    this.parkingFacilities.set(facilityId, facility);
    return facility;
  }

  // Parking slot operations
  async getSlotsByFacilityId(facilityId: number): Promise<ParkingSlot[]> {
    return Array.from(this.parkingSlots.values()).filter(
      slot => slot.facilityId === facilityId
    );
  }

  async getSlotById(id: number): Promise<ParkingSlot | undefined> {
    return this.parkingSlots.get(id);
  }

  async updateSlotStatus(id: number, status: string): Promise<ParkingSlot> {
    const slot = await this.getSlotById(id);
    
    if (!slot) {
      throw new Error("Slot not found");
    }
    
    const updatedSlot: ParkingSlot = { ...slot, status };
    this.parkingSlots.set(id, updatedSlot);
    return updatedSlot;
  }

  async createSlot(slotData: InsertParkingSlot): Promise<ParkingSlot> {
    const id = this.slotIdCounter++;
    const slot: ParkingSlot = { ...slotData, id };
    this.parkingSlots.set(id, slot);
    return slot;
  }

  async checkSlotAvailability(slotId: number, facilityId: number, startTime: Date, endTime: Date): Promise<boolean> {
    const slot = await this.getSlotById(slotId);
    
    if (!slot || slot.facilityId !== facilityId) {
      return false;
    }
    
    // If slot status is not available, it's not available
    if (slot.status !== "available") {
      return false;
    }
    
    // Check if there are any overlapping bookings
    const overlappingBookings = Array.from(this.bookings.values()).filter(booking => {
      if (booking.slotId !== slotId) return false;
      if (booking.status === "canceled") return false;
      
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);
      
      // Check for overlap
      return (
        (startTime < bookingEnd && startTime >= bookingStart) ||
        (endTime > bookingStart && endTime <= bookingEnd) ||
        (startTime <= bookingStart && endTime >= bookingEnd)
      );
    });
    
    return overlappingBookings.length === 0;
  }

  // Booking operations
  async getBookingsByUserId(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values())
      .filter(booking => booking.userId === userId)
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(bookingData: InsertBooking & { qrCode: string }): Promise<Booking> {
    const id = this.bookingIdCounter++;
    const now = new Date();
    const booking: Booking = { 
      ...bookingData, 
      id, 
      createdAt: now
    };
    this.bookings.set(id, booking);
    
    // Update slot status to reserved
    await this.updateSlotStatus(bookingData.slotId, "reserved");
    
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking> {
    const booking = await this.getBookingById(id);
    
    if (!booking) {
      throw new Error("Booking not found");
    }
    
    const updatedBooking: Booking = { ...booking, status };
    this.bookings.set(id, updatedBooking);
    
    // If canceled, make the slot available again
    if (status === "canceled") {
      await this.updateSlotStatus(booking.slotId, "available");
    }
    
    return updatedBooking;
  }

  async getBookingsByFacilityIds(facilityIds: number[]): Promise<Booking[]> {
    return Array.from(this.bookings.values())
      .filter(booking => facilityIds.includes(booking.facilityId))
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
  }

  // Review operations
  async getReviewsByFacilityId(facilityId: number): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.facilityId === facilityId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createReview(reviewData: InsertReview): Promise<Review> {
    const id = this.reviewIdCounter++;
    const now = new Date();
    const review: Review = { 
      ...reviewData, 
      id, 
      createdAt: now 
    };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();
