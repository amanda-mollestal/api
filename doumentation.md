
# Resource URIs and Descriptions

The following table lists the available resource URIs and their corresponding brief descriptions, as well as any required headers or body:

| HTTP Method | URI | Description | Required Headers | Required Body |
| --- | --- | --- | --- | --- |
| GET | / | Returns a welcome message. | N/A | N/A |
| POST | /user/register | Registers a new user with the provided name, email, and password. | N/A | `name`, `email`, `password` |
| POST | /user/login | Logs in an existing user with the provided email and password. | N/A | `email`, `password` |
| GET | /habits | Returns a list of all habits for the authenticated user. | `Authorization: Bearer <access_token>` | N/A |
| POST | /habits | Creates a new habit for the authenticated user with the provided name, description, and frequency. | `Authorization: Bearer <access_token>` | `title`, `description` |
| GET | /habits/:title | Returns details for the habit with the specified title, including the name, description, frequency, completion status, and completion dates. | `Authorization: Bearer <access_token>` | N/A |
| POST | /habits/:title/complete | Marks the habit with the specified title as completed and adds the current date to the habit's list of completion dates. | `Authorization: Bearer <access_token>` | N/A |
| POST | /habits/:title/revert | Reverts the completion status of the habit with the specified title and removes the most recent completion date from the habit's list of completion dates. | `Authorization: Bearer <access_token>` | N/A |
| PATCH | /habits/:title | Updates one or more fields of the habit with the specified title. | `Authorization: Bearer <access_token>` | Any of `title`, `description`, `completedDates` |
| PUT | /habits/:title | Replaces the habit with the specified title with a new habit. | `Authorization: Bearer <access_token>` | `title`, `description` |
| DELETE | /habits/:title | Deletes the habit with the specified title. | `Authorization: Bearer <access_token>` | N/A |
| POST | /habits/webhook/register | Registers a new webhook for the authenticated user with the provided URL and event type. | `Authorization: Bearer <access_token>` | `url`, `events` |
| POST | /habits/webhook/unregister | Unregisters an existing webhook for the authenticated user with the provided URL and event type. | `Authorization: Bearer <access_token>` | `url`, `events` |
