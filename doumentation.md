
# Resource URIs and Descriptions

The following table lists the available resource URIs and their corresponding brief descriptions, as well as any required headers or body:

Base URI: 'https://habitapi.herokuapp.com/api/v1'

For requests that inlcude `/:title` in the URI, the `title` parameter is the title of the habit. Make sure to replace spaces with dashes (-). Example: "My Habit" becomes "My-Habit"

| HTTP Method | URI | Description | Required Headers | Required Body |
| --- | --- | --- | --- | --- |
| GET | / | Returns a welcome message. | N/A | N/A |
| POST | /user/register | Registers a new user with the provided name, email, and password. | N/A | `username`, `email`, `password` |
| POST | /user/login | Logs in an existing user with the provided email and password. | N/A | `username`, `password` |
| GET | /habits | Returns a list of all habits for the authenticated user. | `Authorization: Bearer <access_token>` | N/A |
| POST | /habits | Creates a new habit for the authenticated user with the provided name, description, and frequency. | `Authorization: Bearer <access_token>` | `title`, `description` |
| GET | /habits/:title | Returns details for the habit with the specified title, including the name, description, frequency, completion status, and completion dates. | `Authorization: Bearer <access_token>` | N/A |
| POST | /habits/:title/complete | Marks the habit with the specified title as completed and adds the current date to the habit's list of completion dates. | `Authorization: Bearer <access_token>` | N/A |
| POST | /habits/:title/revert | Reverts the completion status of the habit with the specified title and removes the most recent completion date from the habit's list of completion dates. | `Authorization: Bearer <access_token>` | N/A |
| PATCH | /habits/:title | Updates one or more fields of the habit with the specified title. | `Authorization: Bearer <access_token>` | Any of `title`, `description`, `completedDates` |
| PUT | /habits/:title | Replaces the habit with the specified title with a new habit. | `Authorization: Bearer <access_token>` | `title`, `description` |
| DELETE | /habits/:title | Deletes the habit with the specified title. | `Authorization: Bearer <access_token>` | N/A |
| POST | /habits/webhook/register | Registers a new webhook for the authenticated user with the provided URL and event type. | `Authorization: Bearer <access_token>` | `url`, `events: (possible values, can be combined with "," between: "completed", "updated", "reverted")` |
| POST | /habits/webhook/unregister | Unregisters an existing webhook for the authenticated user with the provided URL and event type. | `Authorization: Bearer <access_token>` | `url` |


Required fields and valid values for a POST request body to the `/user/register` endpoint:
| Field Name | Valid value |
| --- | --- |
| username | A string value that must be unique and not empty. The username must start with a letter and have a length of at least 3 characters and at most 256 characters, allowing alphanumeric characters, underscores, and hyphens. |
| password | A string value that must not be empty, must not be already used and must contain at least 10 characters, but no more than 256 characters. |
| email | A string value that must be unique and a valid email address, containing up to 254 characters. |

Required fields and valid values for a POST request body to the `/user/login` endpoint:
| Field Name | Valid Value |
| --- | --- |
| username | A string value representing the user's username. |
| password | A string value representing the user's password. |

Required and optional fields and valid values for the request body to the `/habits` endpoint:

| Field Name | Required/Optional | Valid Value |
| --- | --- | --- |
| title | Required | A string value representing the title of the habit. The title must be unique for the user, must not be empty and must contain at least 1 character. |
| description | Required | A string value representing the description of the habit. The description must not be empty and must contain at least 1 character. |
| completedDates | Optional | An array of string values representing the dates when the habit was completed. Each date must have the format "YYYY-MM-DD" and must be unique within the array. |

Required and optional fields and valid values for the request body to the `/habits/webhook/register` endpoint:
| Field Name | Valid Value |
| --- | --- |
| url | A string value representing the URL of the webhook. The URL must not be empty and must not already be used. |
| events | An array of string values representing the events that the webhook will be triggered for. Each event must be one of the following: "completed", "updated", "reverted". |


