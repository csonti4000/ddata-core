# Built-in models

These models arrives with the package, but you can use or extend it.

## Error interfaces

### ValidationErrorInterface

The `ValidationError` model extends the `Error` interface.

| Field         | Type     |
|---------------|----------|
| name          | string   |
| message       | string   |
| invalids      | string[] |
| status        | number   |
| originalError | any      |

## Initial Data model

The `InitialData` model helps you to initialize your application when a user logging in. According to the idea the backend send the common used data pieces, what you store in the LocalStorage. The `InitialData` model and the `InitialDataService` helps you to do this easyly.

| Field       | Type    |
|-------------|---------|
| loaded      | boolean |
| data        | any     |
| refreshTime | number  |

## Notification model

With `Notification` model you can handle nice notifications in your application.

| Field       | Type   |
|-------------|--------|
| text        | string |
| title       | string |
| type        | string |
| createdTime | Date   |

## Paginate model

The `Paginate` model represent a Laravel's paginatior model.

| Field        | Type   |
|--------------|--------|
| current_page | number |
| per_page     | number |
| from         | number |
| to           | number |
| data         | any[]  |
| total        | number |
| last_page    | number |
