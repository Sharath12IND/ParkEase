import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  phoneNumber: text("phone_number"),
  userType: text("user_type").notNull().default("customer"), // customer, vendor, admin
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  phoneNumber: true,
  userType: true,
});

// Vehicle model
export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  licensePlate: text("license_plate").notNull(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  vehicleType: text("vehicle_type").notNull(), // sedan, suv, ev, truck, etc.
  isDefault: boolean("is_default").notNull().default(false),
});

export const insertVehicleSchema = createInsertSchema(vehicles).pick({
  userId: true,
  licensePlate: true,
  make: true,
  model: true,
  vehicleType: true,
  isDefault: true,
});

// Parking Facility model
export const parkingFacilities = pgTable("parking_facilities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  description: text("description"),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  totalSpaces: integer("total_spaces").notNull(),
  hourlyRate: doublePrecision("hourly_rate").notNull(),
  dailyRate: doublePrecision("daily_rate"),
  hasEVCharging: boolean("has_ev_charging").notNull().default(false),
  hasCovered: boolean("has_covered").notNull().default(false),
  hasDisabled: boolean("has_disabled").notNull().default(false),
  has24HourAccess: boolean("has_24_hour_access").notNull().default(false),
  hasSecurity: boolean("has_security").notNull().default(false),
  imageUrls: text("image_urls").array(),
  rating: doublePrecision("rating").default(0),
  reviewCount: integer("review_count").default(0),
  ownerId: integer("owner_id").notNull(), // Reference to a user with vendor type
});

export const insertParkingFacilitySchema = createInsertSchema(parkingFacilities).omit({
  id: true,
  rating: true,
  reviewCount: true,
});

// Parking Slot model
export const parkingSlots = pgTable("parking_slots", {
  id: serial("id").primaryKey(),
  facilityId: integer("facility_id").notNull(),
  slotNumber: text("slot_number").notNull(),
  level: integer("level").default(1),
  slotType: text("slot_type").notNull().default("standard"), // standard, disabled, ev, reserved
  status: text("status").notNull().default("available"), // available, occupied, maintenance, reserved
});

export const insertParkingSlotSchema = createInsertSchema(parkingSlots).omit({
  id: true,
});

// Booking model
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  facilityId: integer("facility_id").notNull(),
  slotId: integer("slot_id").notNull(),
  vehicleId: integer("vehicle_id").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  totalAmount: doublePrecision("total_amount").notNull(),
  status: text("status").notNull().default("pending"), // pending, confirmed, canceled, completed
  paymentStatus: text("payment_status").notNull().default("pending"), // pending, paid, refunded
  createdAt: timestamp("created_at").defaultNow(),
  qrCode: text("qr_code"),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  qrCode: true,
});

// Review model
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  facilityId: integer("facility_id").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Vehicle = typeof vehicles.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;

export type ParkingFacility = typeof parkingFacilities.$inferSelect;
export type InsertParkingFacility = z.infer<typeof insertParkingFacilitySchema>;

export type ParkingSlot = typeof parkingSlots.$inferSelect;
export type InsertParkingSlot = z.infer<typeof insertParkingSlotSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
