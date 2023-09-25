import * as z from 'zod'

export const PolylineSchema = z.object({
  points: z.string(),
})
export type Polyline = z.infer<typeof PolylineSchema>

export const DistanceSchema = z.object({
  text: z.string(),
  value: z.number(),
})
export type Distance = z.infer<typeof DistanceSchema>

export const LocationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
})
export type Location = z.infer<typeof LocationSchema>

export const ViewportSchema = z.object({
  northeast: LocationSchema,
  southwest: LocationSchema,
})
export type Viewport = z.infer<typeof ViewportSchema>

export const StepSchema = z.object({
  distance: DistanceSchema,
  duration: DistanceSchema,
  end_location: LocationSchema,
  html_instructions: z.string(),
  polyline: PolylineSchema,
  start_location: LocationSchema,
  travel_mode: z.string(),
  maneuver: z.union([z.null(), z.string()]).optional(),
})
export type Step = z.infer<typeof StepSchema>

export const LegSchema = z.object({
  distance: DistanceSchema,
  duration: DistanceSchema,
  end_address: z.string(),
  end_location: LocationSchema,
  start_address: z.string(),
  start_location: LocationSchema,
  steps: z.array(StepSchema),
  traffic_speed_entry: z.array(z.any()),
  via_waypoint: z.array(z.any()),
})
export type Leg = z.infer<typeof LegSchema>

export const RouteElementSchema = z.object({
  bounds: ViewportSchema,
  copyrights: z.string(),
  legs: z.array(LegSchema),
  overview_polyline: PolylineSchema,
  summary: z.string(),
  warnings: z.array(z.any()),
  waypoint_order: z.array(z.any()),
})
export type RouteElement = z.infer<typeof RouteElementSchema>

export const GeocodedWaypointSchema = z.object({
  geocoder_status: z.string(),
  place_id: z.string(),
  types: z.array(z.string()),
  partial_match: z.union([z.boolean(), z.null()]).optional(),
})
export type GeocodedWaypoint = z.infer<typeof GeocodedWaypointSchema>

export const WelcomeRouteSchema = z.object({
  geocoded_waypoints: z.array(GeocodedWaypointSchema),
  routes: z.array(RouteElementSchema),
  status: z.string(),
})
export type WelcomeRoute = z.infer<typeof WelcomeRouteSchema>

export const PhotoSchema = z.object({
  height: z.number(),
  html_attributions: z.array(z.string()),
  photo_reference: z.string(),
  width: z.number(),
})
export type Photo = z.infer<typeof PhotoSchema>

export const OpeningHoursSchema = z.object({})
export type OpeningHours = z.infer<typeof OpeningHoursSchema>

export const GeometrySchema = z.object({
  location: LocationSchema,
  viewport: ViewportSchema,
})
export type Geometry = z.infer<typeof GeometrySchema>

export const PlaceSchema = z.object({
  business_status: z.string(),
  formatted_address: z.string(),
  geometry: GeometrySchema,
  icon: z.string(),
  icon_background_color: z.string(),
  icon_mask_base_uri: z.string(),
  name: z.string(),
  opening_hours: z.union([OpeningHoursSchema, z.null()]).optional(),
  photos: z.array(PhotoSchema),
  place_id: z.string(),
  rating: z.number(),
  reference: z.string(),
  types: z.array(z.string()),
  user_ratings_total: z.number(),
})
export type Place = z.infer<typeof PlaceSchema>

export const ChatResponseSchema = z.object({
  places: z.array(PlaceSchema),
  route: WelcomeRouteSchema,
})
export type ChatResponse = z.infer<typeof ChatResponseSchema>
