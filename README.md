## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Run the App](#run-the-app)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This is an file sharing website that allows users to comment on each other's post. I wanted to practice chakraui library for styling puproses. I also wanted to practice more of my typescript and different database storage types. You can create an account and create communities and post images or create a dialogue with other members. There is a live demo at (https://reddit-clone-six-ashen.vercel.app/). It supports community voting.

## Installation

### Requirements

- **Node.js**: Version 20 or above

### Steps to Set Ups

1.  **Clone the repository**:

```bash
git clone https://github.com/username/reddit-frontend.git
```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Database**:
   Create a Firebase Store
   collections

   comments
   &emsp communityId;
   emsp createdAt
   emsp creatorDisplayText
   emsp creatorId
   emsp id
   emsp postId
   emsp postTitle
   emsp text

   communities
   id
   createdAt
   creatorId
   numberOfMembers
   privacyType
   imageURL

   posts

   users

4. **Create .env.local with the following variables**:

   NEXT_PUBLIC_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   NEXT_PUBLIC_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID

# Run the app

1. Build the app

   ```bash
   npm run build
   ```

2. Start the client from the directory

   ```bash
   npm run start
   ```

3. open in browser on localhost:3000
