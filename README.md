# 🚀 Modern Chat Application

A feature-rich real-time chat application built with React, Node.js, and Socket.IO, offering a sleek and modern user interface with advanced messaging capabilities.

## ✨ Features

### 💬 Core Messaging
- Real-time messaging with Socket.IO
- Message status indicators (sent, delivered, read)
- Emoji support and file attachments
- Message history and search
- Read receipts and typing indicators

### 👥 Connections & Groups
- Private connections using unique codes
- Group creation and management
- Group invitations system
- Public and private group options
- Connection request handling

### 📞 Calls
- Audio and video call support
- Call history tracking
- Missed call notifications
- In-call controls (mute, speaker, end call)

### 🔐 Authentication & Security
- Secure user authentication
- JWT-based authorization
- Password encryption
- Protected routes

### 🎨 User Experience
- Modern, responsive UI with Tailwind CSS
- Dark mode design
- Real-time status updates
- Custom animations and transitions
- Toast notifications

## 🛠️ Tech Stack

- **Frontend**: React, TailwindCSS, DaisyUI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Real-time**: Socket.IO
- **State Management**: Zustand
- **Authentication**: JWT

## 🚀 Getting Started

1. Clone the repository:
```sh
git clone https://github.com/yourusername/chat-application.git
```

2. Install dependencies:
```sh
# Install backend dependencies
cd chat-application
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Set up environment variables:
```sh
# Create .env file in root directory
MONGO_DB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Run the application:
```sh
# Run backend
npm run server

# Run frontend (in a separate terminal)
cd frontend
npm run dev
```

## 📱 Screenshots

[Add your application screenshots here]

## 🔧 Project Structure

```
chat-application/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   └── utils/
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   └── zustand/
    └── public/
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React Icons for the beautiful icons
- Tailwind CSS for the styling utilities
- Socket.IO for real-time capabilities
- MongoDB for database solutions
