/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         title:
 *           type: string
 *           example: "Summer Music Festival"
 *         description:
 *           type: string
 *           example: "A fantastic outdoor music festival"
 *         venueId:
 *           type: number
 *           example: 1
 *         organizerId:
 *           type: number
 *           example: 1
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2024-07-15T18:00:00Z"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["music", "outdoor", "festival"]
 *         price:
 *           type: number
 *           example: 50.00
 *
 *     GetEventsResponse:
 *       type: object
 *       properties:
 *         events:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Event'
 *         eventsCount:
 *           type: number
 *           example: 25
 *
 *     GetEventResponse:
 *       type: object
 *       properties:
 *         event:
 *           $ref: '#/components/schemas/Event'
 *           nullable: true
 *
 *     CreateEventRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - venueId
 *         - organizerId
 *         - date
 *         - price
 *       properties:
 *         title:
 *           type: string
 *           example: "Summer Music Festival"
 *         description:
 *           type: string
 *           example: "A fantastic outdoor music festival"
 *         venueId:
 *           type: number
 *           example: 1
 *         organizerId:
 *           type: number
 *           example: 1
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2024-07-15T18:00:00Z"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["music", "outdoor", "festival"]
 *         price:
 *           type: number
 *           example: 50.00
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         role:
 *           type: string
 *           enum: [organizer, attendee]
 *           example: "organizer"
 *
 *     GetUsersResponse:
 *       type: object
 *       properties:
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         usersCount:
 *           type: number
 *           example: 15
 *
 *     VenueLocation:
 *       type: object
 *       properties:
 *         city:
 *           type: string
 *           example: "New York"
 *         country:
 *           type: string
 *           example: "USA"
 *
 *     Venue:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: "Grand Convention Center"
 *         location:
 *           $ref: '#/components/schemas/VenueLocation'
 *         capacity:
 *           type: number
 *           example: 5000
 *
 *     GetVenuesResponse:
 *       type: object
 *       properties:
 *         venues:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Venue'
 *         venuesCount:
 *           type: number
 *           example: 10
 */
