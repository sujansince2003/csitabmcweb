Here's a documentation guide for the working of Notices components, explaining its purpose, props, and functionality.

---

## `CollegeNotices` Component

### Description

The `CollegeNotices` component is a server component in a Next.js application that fetches and displays a list of college notices. It retrieves data from an API endpoint (`/api/notices`) and passes the notices data to the `NoticesList` component, which renders the notices in the UI.

### Purpose

The main purpose of `CollegeNotices` is to:

1. Fetch the latest notices from a backend API.
2. Handle errors that may occur during data fetching.
3. Pass the notices data to the `NoticesList` component for rendering.

### File Path

- **Location**: `app/notices/page.tsx`

### Dependencies

- **`NoticesList` Component**: Responsible for rendering the list of notices. It is imported from `./_components` and is expected to accept a `notices` prop.
- **Environment Variable**: Uses `NEXT_PUBLIC_API_URL` to determine the base URL for the API.

### Functions

#### `getNotices`

An asynchronous function that fetches the notices data from the backend API.

- **Endpoint**: `${process.env.NEXT_PUBLIC_API_URL}/api/notices`
- **Options**:
  - `cache: "no-store"`: Ensures that the data is always fetched fresh from the API and is not cached.
- **Error Handling**: Throws an error if the fetch request fails, which prevents the app from continuing with an undefined data state.

- **Usage**:
  ```typescript
  const notices = await getNotices();
  ```

### Component Structure

```typescript
export default async function CollegeNotices() {
  const notices = await getNotices();
  return <NoticesList notices={notices} />;
}
```

### Props

The component does not receive any props directly. However, it fetches `notices` data and passes it as a prop to the `NoticesList` component.

#### `NoticesList` Prop Structure

The `NoticesList` component expects a prop of `notices` that is structured as an array of notice objects. Each object may include fields like `id`, `title`, `description`, `photo`, `publishedDate`, `publishedBy`, and any other relevant metadata related to each notice.

### Environment Variables

- **`NEXT_PUBLIC_API_URL`**: The base URL for the API that provides notices data. This must be set in the `.env` file.

### Usage Example

```tsx
// app/notices/page.tsx
import CollegeNotices from "./path-to/CollegeNotices";

// This will render the CollegeNotices component
<CollegeNotices />;
```

### Error Handling

If an error occurs during the fetch request in `getNotices`, an error will be thrown with the message `"Failed to fetch notices"`. This ensures any issues are logged clearly during development.

### Notes

- Ensure the `NEXT_PUBLIC_API_URL` environment variable is set correctly in your environment, as it is critical for fetching data.
- The component is set to **no-cache** the data, so it may affect load performance slightly, especially if the API is slow or has a large dataset.

### Future Improvements

- **Pagination**: Add pagination or infinite scroll for handling a larger number of notices.
- **Error Handling UI**: Include a fallback UI to display an error message if the data fetch fails.

---

documentation for the `NoticesList` component, detailing its purpose, props, and structure.

---

## `NoticesList` Component

### Description

The `NoticesList` component is a client-side React component designed for displaying a grid of college notices. It renders a card for each notice, displaying a preview image, title, description, publication date, and publisher information. Each notice card includes a button that navigates to the full notice page.

### Purpose

The `NoticesList` component is used to:

1. Display a list of notices in a visually structured format.
2. Allow users to view a quick summary of each notice.
3. Provide navigation to a detailed view of each notice via the "View Notice" button.

### File Path

- **Location**: `app/notices/NoticesList.tsx`

### Dependencies

- **UI Components**: Imports various UI components (`Card`, `Button`, `Avatar`) for consistent styling.
- **Image Component**: Uses Next.js `Image` for optimized image rendering.
- **`useRouter`**: The Next.js `useRouter` hook is used for client-side navigation.

### Props

#### `notices` (Array of Notice objects)

The component expects a `notices` prop, which is an array of `Notice` objects. Each object in the array represents an individual notice and contains the following fields:

| Field             | Type     | Description                          |
| ----------------- | -------- | ------------------------------------ |
| `id`              | `string` | Unique identifier for the notice.    |
| `photo`           | `string` | URL of the notice’s preview image.   |
| `title`           | `string` | Title of the notice.                 |
| `description`     | `string` | Brief description of the notice.     |
| `publishedBy`     | `string` | Name of the notice publisher.        |
| `publishedDate`   | `string` | Date the notice was published.       |
| `publisherAvatar` | `string` | URL of the publisher's avatar image. |

### Component Structure

```typescript
export default function NoticesList({ notices }: NoticesListProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">College Notices</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notices.map((notice) => (
          <Card key={notice.id} className="flex flex-col">
            <CardHeader className="p-0">
              <Image
                src={notice.photo}
                alt={notice.title}
                width={300}
                height={200}
                className="w-full h-48 object-contain rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <CardTitle className="text-xl mb-2">{notice.title}</CardTitle>
              <p className="text-muted-foreground mb-4">{notice.description}</p>
              <Button onClick={() => router.push(`/notices/${notice.id}`)}>
                View Notice
              </Button>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 bg-muted">
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={notice.publisherAvatar}
                    alt={notice.publishedBy}
                  />
                  <AvatarFallback>
                    {notice.publishedBy
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{notice.publishedBy}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(notice.publishedDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

### Functions

#### `useRouter`

- Utilizes `useRouter` from `next/navigation` to enable navigation to the full notice page for a selected notice.
- **Button Action**: The "View Notice" button triggers `router.push()` to navigate to `/notices/[id]`, where `[id]` is the unique identifier of the notice.

### Date Formatting

- The publication date is formatted using `toLocaleDateString` to display in a user-friendly format (e.g., "October 22, 2024").

### Key Features

- **Grid Layout**: The notices are arranged in a responsive grid layout (single column on mobile, expanding to multiple columns on larger screens).
- **Image Optimization**: Uses Next.js `Image` component to render each notice’s photo efficiently.
- **Avatar Fallback**: Shows the initials of the publisher’s name if an avatar image isn’t available.

### Usage Example

```tsx
import NoticesList from "./NoticesList";

export default function CollegeNoticesPage() {
  const notices = [
    {
      id: "1",
      photo: "/path/to/photo.jpg",
      title: "Notice Title",
      description: "This is a brief description of the notice.",
      publishedBy: "Jane Doe",
      publishedDate: "2024-10-22T00:00:00.000Z",
      publisherAvatar: "/path/to/avatar.jpg",
    },
    // Additional notice objects
  ];

  return <NoticesList notices={notices} />;
}
```

### Styling

The component relies on utility classes for styling. Each card is styled with padding, background colors, and spacing to create a polished look.

### Notes

- Make sure `photo` and `publisherAvatar` URLs are correctly set in the notices data, as these will display each notice’s preview and publisher image.
- **Future Improvements**: Consider adding pagination or a "Load More" button for handling larger datasets more efficiently.

---

Documentation for the `NoticeDetail` component:

---

## `NoticeDetail` Component

### Description

The `NoticeDetail` component is a client-side component responsible for displaying the detailed view of a single notice. It includes the full content, images, publisher information, and contact details related to the notice. It also allows users to download the notice's main image and navigate back to the notices list.

### Purpose

The `NoticeDetail` component is used to:

1. Fetch and display a detailed view of a single notice based on its ID.
2. Provide all relevant information about the notice in a structured format.
3. Enable downloading the main image associated with the notice.
4. Facilitate easy navigation back to the notices list.

### File Path

- **Location**: `app/notices/NoticeDetail.tsx`

### Dependencies

- **UI Components**: Uses `Card`, `Avatar`, `Button`, and `Badge` components for styling and layout.
- **Next.js `Image`**: Optimizes the display of the notice's main image.
- **Next.js `useRouter`**: Facilitates client-side navigation.
- **Lucide Icons**: Provides icons to enhance the display of contact and category information.

### Props

#### `params` (Object)

The component expects a `params` prop with the following structure:

| Field | Type   | Description                                                     |
| ----- | ------ | --------------------------------------------------------------- |
| `id`  | string | The unique identifier of the notice, used to fetch notice data. |

### Component Structure

```typescript
export default function NoticeDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    async function fetchNotice() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/notices/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notice");
        }
        const data = await response.json();
        setNotice(data);
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
    }
    fetchNotice();
  }, [params.id]);

  const handleDownload = async () => {
    if (notice) {
      try {
        const response = await fetch(notice.photo);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `notice-${notice.id}-photo.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }
  };

  if (!notice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Rest of the component structure */}
    </div>
  );
}
```

### Functions

#### `useEffect` - Data Fetching

- Fetches notice details using the notice ID from `params`.
- Uses the `id` to make a request to the `/api/notices/:id` endpoint.
- Updates the `notice` state upon successful fetch.

#### `handleDownload` - Download Notice Image

- Allows users to download the main image associated with the notice.
- Fetches the image as a blob and triggers a download action in the browser.

#### `useRouter`

- Utilizes `useRouter` from `next/navigation` for client-side navigation.
- Back button uses `router.push("/notices")` to navigate back to the main notices list.

### Key Sections

1. **Back to Notices Button**: A button to navigate back to the notices list.
2. **Image Download**: Renders the main image with a download button.
3. **Notice Information**:
   - **Title**: The notice title displayed prominently.
   - **Description**: A brief description or tagline for the notice.
   - **Category Badge**: Displays the category of the notice.
   - **Publisher Information**: Shows the publisher's avatar, name, title, and published date.
   - **Full Content**: Displays the main content of the notice in a styled container.
4. **Contact Information**:
   - Displays the department, email, phone, and location of the publisher.
   - Links for email and phone are provided for easy access.
5. **Tags**: Renders tags associated with the notice as badges.

### Data Formatting

- **Date**: Formats `publishedDate` using `toLocaleDateString` for readability.
- **Publisher Avatar**: Falls back to initials if the avatar image is unavailable.

### Example Usage

```typescript
import NoticeDetail from "./NoticeDetail";

export default function NoticePage({ params }) {
  return <NoticeDetail params={params} />;
}
```

### Styling and Layout

- **Layout**: The component uses utility classes to ensure responsive and accessible styling.
- **Image**: Renders the notice photo with responsive sizing using Next.js `Image`.
- **Fallback**: Displays "Loading..." while fetching the notice.

### Notes

- Ensure `process.env.NEXT_PUBLIC_API_URL` is configured in the environment.
- Error handling provides a console log, but additional UI could improve UX.
- **Future Improvements**: Consider adding a loading spinner or skeleton UI for better user feedback during data loading.

---

This documentation provides an overview of the component’s structure, purpose, and key sections, along with usage and styling notes. It covers essential functions and handles the component's role in displaying a full notice.

Documentation for the `UploadNotice` component:

---

## `UploadNotice` Component

The `UploadNotice` component is a form-based component built with React, Next.js, and Cloudinary integration for uploading notices, including their titles, descriptions, categories, and optionally an image. It uses React Hook Form for form management, Zod for schema validation, and Cloudinary for image upload.

### Features

- Form fields for title, description, full content, category, tags, department, and more.
- Image upload via Cloudinary.
- Input validation and error messaging with `react-hook-form` and `zod`.
- Dynamic redirects after successful form submission.

### Implementation Details

### Import Statements

The component imports:

- `useState`, `useRouter`, and `useForm` from React and Next.js for state management and navigation.
- Various components for building the form, including custom `Button`, `Input`, `Textarea`, and Cloudinary `CldUploadWidget`.
- `zod` and `zodResolver` for validation, as well as types from `FormField` to `FormMessage`.

### Environment Variable Configuration

The component fetches the `CLOUDINARY_UPLOAD_PRESET` value from the environment, which is passed as a prop to Cloudinary’s upload widget for secure, client-side image uploading.

### Schema Definition

The form validation schema is defined using Zod, specifying the required fields and validation rules:

- **Title**: required
- **Description**: required
- **Full Content**: required
- **Published Date**: required
- **Published By**: required
- **Category**: required
- **Tags**: comma-separated values
- **Department**: required
- **Contact Email**: email format validation
- **Optional Fields**: `contactPhone`, `location`, and `photo`

### Types

- `FormValues`: Type inferred from the Zod schema for strong typing in the form.

### Component State

- `isSubmitting`: Tracks form submission status.
- `photoUrl`: Stores the uploaded image URL returned from Cloudinary.

### Form Handling

The form uses the `react-hook-form` package, where:

- `onSubmit`: Handles form submission, posting form data to the `/api/notices` endpoint.
- `form.handleSubmit`: Used to validate and handle form data submission.
- **Form Default Values**: Initializes form values with empty strings to avoid `undefined` errors.

### Cloudinary Image Upload Integration

The Cloudinary `CldUploadWidget` is configured with:

- **`uploadPreset`**: Uses `uploadPresetvalue` (retrieved from environment variables) to configure image uploads.
- **Image Upload Button**: A button opens the upload widget, and on successful upload, the widget provides a URL for the uploaded image, which is stored in the `photoUrl` state.

### UI Structure

#### Form Fields

- **Title, Description, Full Content**: Uses `<FormItem>`, `<FormLabel>`, and `<FormControl>` for label and input structure.
- **Date & Category**: Date input with an icon, category as a dropdown select.
- **Tags**: Accepts comma-separated values and splits them for submission.
- **Image Upload**: A hidden input updates the photo URL when the upload widget succeeds.

#### Buttons

- **Submit Button**: Displays “Uploading…” during submission, disables while `isSubmitting` is true.
- **Cancel Button**: Redirects to the home page.

### Example Usage

To use this component, ensure:

1. `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` is set in `.env.local`.
2. Include this component in any page where you want users to create and upload notices.

```tsx
import UploadNotice from "@/components/UploadNotice";

export default function Page() {
  return <UploadNotice />;
}
```

### Security Note

Since this component uses an unsigned Cloudinary `uploadPreset`, it’s important to restrict the preset to allowed file types and sizes and consider backend verification for production environments.

### Conclusion

The `UploadNotice` component provides a user-friendly interface for uploading notices, complete with form validation, image uploads, and seamless submission handling. With React Hook Form and Zod integration, it ensures data consistency and secure form submissions.

---API DOCUMENTATION--
Here's the documentation for the API located at `app/api/notices/route.ts`, which is a Next.js API route for handling "notices" in a notice board application. This API supports creating and retrieving notices, leveraging Prisma as the ORM.

---

# Notices API

**Endpoint**: `/api/notices`  
**File Location**: `app/api/notices/route.ts`

## Overview

The Notices API provides endpoints for creating new notices (`POST`) and retrieving notices (`GET`). Notices include fields like title, description, content, category, department, contact information, tags, and an optional photo. The `GET` endpoint allows retrieval of either all notices or a specific notice by ID.

### Dependencies

- **Prisma**: ORM for database interactions.
- **NextResponse**: For structured responses in Next.js.

## Endpoints

### `POST /api/notices`

Creates a new notice in the database.

- **Request Body**: JSON object containing notice details.
- **Response**: JSON object representing the created notice, or an error message if creation fails.

#### Request Body Structure

| Field           | Type            | Required | Description                            |
| --------------- | --------------- | -------- | -------------------------------------- |
| `title`         | `string`        | Yes      | Title of the notice.                   |
| `description`   | `string`        | Yes      | Short description of the notice.       |
| `fullContent`   | `string`        | Yes      | Full content of the notice.            |
| `photo`         | `string`        | No       | URL of the notice's image.             |
| `publishedDate` | `string` (date) | Yes      | Publication date of the notice.        |
| `publishedBy`   | `string`        | Yes      | Author or publisher's name.            |
| `department`    | `string`        | Yes      | Department associated with the notice. |
| `contactEmail`  | `string`        | Yes      | Contact email for inquiries.           |
| `contactPhone`  | `string`        | No       | Contact phone number.                  |
| `location`      | `string`        | No       | Location related to the notice.        |
| `category`      | `string`        | Yes      | Notice category (e.g., events).        |
| `tags`          | `string[]`      | No       | Tags associated with the notice.       |

#### Example Request

```json
POST /api/notices
{
    "title": "New Event",
    "description": "Short description here",
    "fullContent": "Detailed content of the notice",
    "photo": "https://example.com/photo.jpg",
    "publishedDate": "2023-10-27",
    "publishedBy": "Admin",
    "department": "HR",
    "contactEmail": "admin@example.com",
    "contactPhone": "123-456-7890",
    "location": "Auditorium",
    "category": "events",
    "tags": ["registration", "deadline"]
}
```

#### Response

- **Success (200)**: Returns the newly created notice object.
- **Error (500)**: Returns an error message if creation fails.

```json
{
  "id": "1",
  "title": "New Event",
  "description": "Short description here",
  "fullContent": "Detailed content of the notice",
  "photo": "https://example.com/photo.jpg",
  "publishedDate": "2023-10-27T00:00:00.000Z",
  "publishedBy": "Admin",
  "department": "HR",
  "contactEmail": "admin@example.com",
  "contactPhone": "123-456-7890",
  "location": "Auditorium",
  "category": "events",
  "tags": ["registration", "deadline"]
}
```

### `GET /api/notices`

Retrieves one or all notices based on the query parameters.

- **Query Parameters**:
  - `id` (optional): If provided, retrieves the notice with the specified ID. If not provided, retrieves all notices.

#### Example Request

**Retrieve all notices:**

```plaintext
GET /api/notices
```

**Retrieve a specific notice by ID:**

```plaintext
GET /api/notices?id=1
```

#### Response

- **Success (200)**:
  - If `id` is provided: Returns the notice with the specified ID.
  - If no `id` is provided: Returns an array of all notices, ordered by `publishedDate` in descending order.
- **Error (404)**: If a notice with the specified ID is not found.
- **Error (500)**: If there is an issue fetching the notices.

#### Example Responses

**All Notices**

```json
[
    {
        "id": "1",
        "title": "New Event",
        "description": "Short description here",
        "fullContent": "Detailed content of the notice",
        "photo": "https://example.com/photo.jpg",
        "publishedDate": "2023-10-27T00:00:00.000Z",
        "publishedBy": "Admin",
        "department": "HR",
        "contactEmail": "admin@example.com",
        "contactPhone": "123-456-7890",
        "location": "Auditorium",
        "category": "events",
        "tags": ["registration", "deadline"]
    },
    ...
]
```

**Single Notice**

```json
{
  "id": "1",
  "title": "New Event",
  "description": "Short description here",
  "fullContent": "Detailed content of the notice",
  "photo": "https://example.com/photo.jpg",
  "publishedDate": "2023-10-27T00:00:00.000Z",
  "publishedBy": "Admin",
  "department": "HR",
  "contactEmail": "admin@example.com",
  "contactPhone": "123-456-7890",
  "location": "Auditorium",
  "category": "events",
  "tags": ["registration", "deadline"]
}
```

### Error Handling

Errors are logged to the console and return a JSON object with an error message and a `500` status code in case of server issues.

---

### Security and Environment Configuration

Ensure the Prisma client is configured to use secure environment variables for the database connection in production environments. The API responses and error handling are secured against unauthorized access by using server-side code only, and Prisma ensures data consistency.

Here's the documentation for the API located at `pages/api/notices/[id]/route.ts`, which is a Next.js API route for retrieving a specific notice by its ID.

---

# Notice API - Retrieve by ID

**Endpoint**: `/api/notices/[id]`  
**File Location**: `pages/api/notices/[id]/route.ts`

## Overview

This API endpoint allows clients to retrieve a specific notice from the database using its unique identifier (ID). It utilizes Prisma as the ORM for database interactions.

### Dependencies

- **Prisma**: ORM for database interactions.
- **NextResponse**: For structured responses in Next.js.

## Endpoint

### `GET /api/notices/[id]`

Retrieves a specific notice based on the provided ID in the URL path.

- **Path Parameter**:
  - `id` (required): The unique identifier of the notice to retrieve.

#### Example Request

```plaintext
GET /api/notices/1
```

#### Response

- **Success (200)**: Returns the requested notice object.
- **Error (404)**: Returns an error message if the notice with the specified ID is not found.
- **Error (500)**: Returns an error message if there is an issue fetching the notice.

#### Example Responses

**Success Response**

```json
{
  "id": "1",
  "title": "New Event",
  "description": "Short description here",
  "fullContent": "Detailed content of the notice",
  "photo": "https://example.com/photo.jpg",
  "publishedDate": "2023-10-27T00:00:00.000Z",
  "publishedBy": "Admin",
  "department": "HR",
  "contactEmail": "admin@example.com",
  "contactPhone": "123-456-7890",
  "location": "Auditorium",
  "category": "events",
  "tags": ["registration", "deadline"]
}
```

**Error Response (Notice Not Found)**

```json
{
  "error": "Notice not found"
}
```

**Error Response (Server Error)**

```json
{
  "error": "An error occurred while fetching the notice."
}
```

### Error Handling

Errors are logged to the console, and appropriate HTTP status codes are returned based on the nature of the error:

- A `404` status code for not found errors when the ID does not correspond to any existing notice.
- A `500` status code for server errors that may occur during the database query.

### Security and Environment Configuration

Ensure that your Prisma client is securely configured for accessing the database, especially in production environments. This endpoint should only be accessible via authenticated users or specific roles, depending on your application's requirements.

---

This documentation should provide a clear overview of how to interact with the specific notice retrieval API endpoint.
