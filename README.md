# Image upload on a cloudinary.

Uploading images to Cloudinary using Node.js and Express.

## Features
- Allows users to upload images.
- Stores uploaded images in Cloudinary.
- Saves image metadata (URL, filename, upload date) in a MongoDB database.

## Installation
1. Clone the repository:
2. Install dependencies:
3. Set up environment variables:
- Create a `.env` file in the root directory.
- Add the following environment variables:
  ```
  CLOUD_NAME=your_cloud_name
  API_KEY=your_api_key
  API_SECRET=your_api_secret
  PORT=3001
  ```
4. Start the server:

## Dependencies

- express
- dotenv
- multer
- uuid
- cloudinary
- mongoose



