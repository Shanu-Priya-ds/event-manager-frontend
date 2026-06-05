# Event Manager Frontend

A modern, full-featured event management web application built with React and TypeScript. Users can discover events, register for them, manage their registrations, and create/edit their own events with image uploads.

## 🚀 Live Demo & Links

- **Frontend**: [https://ds-event-manager-react.netlify.app/](https://ds-event-manager-react.netlify.app/)
- **Backend Repository**: [https://github.com/Shanu-Priya-ds/event-manager-backend](https://github.com/Shanu-Priya-ds/event-manager-backend)
- **Frontend Repository**: [https://github.com/Shanu-Priya-ds/event-manager-frontend](https://github.com/Shanu-Priya-ds/event-manager-frontend)

## Features

### User Authentication
- User registration and login
- Secure token-based authentication
- Protected routes for authenticated users
- Session persistence using localStorage

### Event Management
- **Browse Events**: View all available events with detailed information
- **Event Registration**: Register for events and manage your registrations
- **Create Events**: Organizers can create new events with details and images
- **Edit & Delete**: Modify or remove events you've created
- **Event Details**: View comprehensive information about specific events

### User Dashboard
- Personal event dashboard for organizers
- View and manage created events
- Track event registrations
- Access to MyRegistrations to see all events you're registered for

### Image Management
- Upload event images to Cloudinary
- Image optimization and storage
- Support for event thumbnails and details

## Tech Stack

### Frontend Framework
- **React** 19.2.6 - Modern UI library with concurrent features
- **TypeScript** - Type-safe development
- **Vite** 8.0.12 - Lightning-fast build tool with HMR

### Routing & State Management
- **React Router** 7.16.0 - Client-side routing
- **React Context** - Global auth state management

### Styling & UI
- **TailwindCSS** 4.3.0 - Utility-first CSS framework
- **Lucide React** 1.17.0 - Beautiful icon library
- **Headless UI** 2.2.10 - Unstyled, accessible components
- **React Hot Toast** 2.6.0 - Toast notifications

### API & Data
- **Axios** 1.16.1 - HTTP client for API requests
- **Cloudinary** - Cloud image storage and optimization

### Development Tools
- **ESLint** - Code quality and style checking
- **React Compiler** - Automatic memoization optimization
- **Babel** - JavaScript transformation

## Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- A Cloudinary account (for image uploads)
- A running Event Manager backend API

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd event-manager-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your API configuration:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

### Linting

Check code quality:
```bash
npm run lint
```

## Deployment

The application is deployed on **Netlify**:

### Environment Variables for Production

Set these in your Netlify dashboard (Site Settings → Build & Deploy → Environment):

```env
VITE_API_BASE_URL=<your-backend-api-url>
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Add environment variables in Netlify dashboard
4. Deploy!

The frontend will automatically redeploy when you push to your main branch.

## Project Structure

```
src/
├── pages/              # Page components
│   ├── Welcome.tsx     # Landing page
│   ├── Login.tsx       # Login page
│   ├── Register.tsx    # Registration page
│   ├── Home.tsx        # Browse all events
│   ├── Dashboard.tsx   # User dashboard (event management)
│   ├── MyRegistrations.tsx  # User's registered events
│   └── EventDetails.tsx     # Event detail page
├── components/         # Reusable components
│   ├── event/          # Event-specific components
│   │   ├── EventCard.tsx    # Event list card
│   │   ├── EventForm.tsx    # Event creation/edit form
│   │   ├── EventList.tsx    # Event list container
│   │   └── EditDeleteEvent.tsx
│   ├── buttons/        # Button components
│   │   ├── RegisterButton.tsx
│   │   ├── CancelButton.tsx
│   │   └── EditDeleteButtons.tsx
│   ├── utils/          # Utility components
│   │   ├── LoadingSpinner.tsx
│   │   ├── EmptyState.tsx
│   │   └── Dialog.tsx
│   ├── Navbar.tsx      # Navigation bar
│   └── ProtectedRoute.tsx  # Route protection wrapper
├── hooks/              # Custom React hooks
│   └── useApi.tsx      # Reusable API hook
├── services/           # API and external services
│   ├── api.tsx         # Axios instance and API calls
│   ├── authService.ts  # Authentication logic
│   ├── uploadService.ts # Image upload logic
│   └── cloudinary.ts   # Cloudinary integration
├── context/            # React Context providers
│   └── AuthContext.tsx # Authentication context
├── types/              # TypeScript type definitions
│   ├── types.ts        # App-specific types
│   └── apiTypes.ts     # API response types
├── utils/              # Utility functions
│   └── utils.ts        # Helper functions
├── App.tsx             # Main App component
└── main.tsx            # Application entry point
```

## API Integration

The application communicates with a backend Event Manager API. Key endpoints include:

- `GET /events/all` - Fetch all events
- `GET /events/:id` - Fetch event details
- `POST /events` - Create a new event
- `PUT /events/:id` - Update an event
- `DELETE /events/:id` - Delete an event
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /registrations` - Register for an event
- `DELETE /registrations/:id` - Cancel event registration

## Authentication Flow

1. User registers/logs in
2. Backend returns JWT token and user data
3. Token is stored in localStorage
4. Token is included in API request headers
5. Protected routes check for valid authentication
6. User can logout (clears token and user data)

## Key Components

### useApi Hook
Custom hook for making API calls with automatic error handling, loading states, and success messages.

```typescript
const { data, loading, error, executeAPI } = useApi<T>({
  url: "/endpoint",
  method: "GET",
  autoFetch: true,
  successMsg: "Success!"
});
```

### ProtectedRoute
Wrapper component that ensures only authenticated users can access certain routes.

### AuthContext
Global context providing authentication state and methods:
- `user` - Current authenticated user
- `token` - JWT authentication token
- `setAuthData()` - Set user and token on login
- `logout()` - Clear authentication

## Image Upload

Images are uploaded to Cloudinary for:
- Event thumbnails
- Event detail images
- User profile images

The upload service handles:
- Image validation
- File size optimization
- Automatic CDN delivery

## Styling

The application uses TailwindCSS for all styling. Key design patterns:
- Mobile-first responsive design
- Utility-first CSS approach
- Custom color scheme
- Consistent spacing and typography

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## Environment Variables

Create a `.env` file in the project root with:

```env
# Local Development
VITE_API_BASE_URL=http://localhost:3000/api

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
```

**Note**: For the deployed version, update `VITE_API_BASE_URL` to point to your deployed backend API.

## Troubleshooting

### Issue: Images not uploading
- Verify Cloudinary credentials in `.env`
- Check upload preset is configured correctly
- Ensure file size is within limits

### Issue: API calls failing
- Verify backend is running at correct URL
- Check network tab in browser DevTools
- Ensure CORS is configured on backend

### Issue: Authentication not persisting
- Check browser localStorage is enabled
- Verify token is being saved correctly
- Clear localStorage and re-login if corrupted

## Performance Optimizations

- React Compiler enabled for automatic memoization
- Vite for fast HMR and optimized builds
- Lazy loading of routes
- Image optimization via Cloudinary
- Efficient API caching

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Related Projects

- **Backend API**: [Event Manager Backend](https://github.com/Shanu-Priya-ds/event-manager-backend) - REST API for event management
- **Live Application**: [https://ds-event-manager-react.netlify.app/](https://ds-event-manager-react.netlify.app/)

## License

This project is part of the Perscholas Capstone program.

## Contact

For questions or issues, please contact the development team or create an issue in the repository.

---

**Created by**: Shanu Priya  
**Last Updated**: 2026-06-05
