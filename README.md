# ChatterBox
ChatterBox is a modern chat application built with Next.js and Firebase.

### Features
+ Real-time messaging
+ User authentication
+ Room creation and management
+ Profile updates

### Getting Started
##### Prerequisites
- Node.js
- npm or yarn

##### Installation
1. Clone the repository:
```sh
git clone https://github.com/yourusername/chatterbox.git
cd chatterbox
```
2. Install dependencies:
```sh
npm install
# or
yarn install
```
3. Set up environment variables:

Create a .env.local file in the root directory and add your Firebase configuration:
```sh
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```
#### Running the Development Server
Start the development server:
```sh
npm run dev
# or
yarn dev
```
Open http://localhost:3000 with your browser to see the result.

### Deployment
Deploy the application using Vercel or Firebase Hosting.

#### Vercel
Follow the Next.js deployment documentation for more details.

#### Firebase Hosting
1. Install Firebase CLI:
```sh
npm install -g firebase-tools
```
2. Log in to Firebase:
```sh
firebase login
```
3. Initialize Firebase in your project:
```sh
firebase init
```
4. Deploy to Firebase Hosting:
```sh
firebase deploy
```

Author -> ZeusMadeIt
