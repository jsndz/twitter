# API Endpoints

Base URL: `/api/v1`

---

## POST `/api/v1/tweet`
- **Description:** Create a new tweet (requires authentication)
- **Body:** Tweet data (including optional image)

## GET `/api/v1/tweet/:id`
- **Description:** Get a tweet by its ID
- **Params:** `id` (tweet ID)

## POST `/api/v1/comment`
- **Description:** Create a comment on a model (requires authentication)
- **Query:** `modelId`, `modelType`
- **Body:** `content`

## POST `/api/v1/likes/toggle`
- **Description:** Toggle like on a model (tweet or comment)
- **Query:** `modelId`, `modelType`
- **Body:** `userId`

## POST `/api/v1/signup`
- **Description:** Register a new user
- **Body:** `email`, `password`, `name`

## POST `/api/v1/login`
- **Description:** Log in a user
- **Body:** `email`, `password`

---

## GET `/api/health`
- **Description:** Health check endpoint
- **Response:** `{ message: "Ok" }` 