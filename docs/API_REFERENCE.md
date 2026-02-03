# 📡 HUSHPAIR API REFERENCE

Base URL: `http://localhost:3000/api`

---

## 🔐 ADMIN ENDPOINTS

### Configuration

#### Get System Configuration
```http
GET /admin/config
```

**Response:**
```json
{
  "id": "system",
  "facetecKey": "••••••••",
  "googleMapsKey": "••••••••",
  "twilioSid": "••••••••",
  "faceVerificationEnabled": true,
  "paymentEnabled": false,
  "dailyConnectionLimit": 5,
  "dailyViewLimit": 15,
  "timeBankHours": 48,
  "redRoomDestructHours": 5,
  "faceVerificationProvider": "facetec",
  "paymentProvider": "stripe"
}
```

#### Update API Key
```http
POST /admin/config/api-key
Content-Type: application/json

{
  "key": "googleMapsKey",
  "value": "AIzaSyXXXXXXXXXXXXXXXXXXXXXX"
}
```

**Response:**
```json
{
  "success": true
}
```

#### Toggle Feature
```http
PUT /admin/config/feature-toggle
Content-Type: application/json

{
  "feature": "redRoomEnabled",
  "enabled": true
}
```

#### Update App Limit
```http
PUT /admin/config/app-limit
Content-Type: application/json

{
  "limit": "dailyConnectionLimit",
  "value": 10
}
```

#### Update Provider
```http
PUT /admin/config/provider
Content-Type: application/json

{
  "provider": "paymentProvider",
  "value": "stripe"
}
```

---

### User Management

#### List Users
```http
GET /admin/users?page=1&limit=20&room=GREEN&status=ACTIVE&search=ayse
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `room` (string): Filter by room (GREEN | RED)
- `status` (string): Filter by status (ACTIVE | SUSPENDED | BANNED | FROZEN)
- `search` (string): Search by name, phone, or alias

**Response:**
```json
{
  "users": [
    {
      "id": "uuid",
      "realName": "Ayşe Yılmaz",
      "redAlias": null,
      "phoneNumber": "+905551234567",
      "currentRoom": "GREEN",
      "accountStatus": "ACTIVE",
      "isVerified": true,
      "trustScore": 95,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "lastActiveAt": "2024-02-03T10:00:00.000Z",
      "profilePhoto": "https://...",
      "redBlurredPhoto": null
    }
  ],
  "total": 3,
  "page": 1,
  "totalPages": 1
}
```

#### Get User Details
```http
GET /admin/users/:id
```

**Response:**
```json
{
  "id": "uuid",
  "uuidHash": "hash",
  "realName": "Ayşe Yılmaz",
  "phoneNumber": "+905551234567",
  "currentRoom": "GREEN",
  "trustScore": 95,
  "birthDate": "1995-06-15T00:00:00.000Z",
  "birthTime": "14:30",
  "birthPlace": "Istanbul, Turkey",
  "matchesAsUserOne": [...],
  "matchesAsUserTwo": [...],
  "reports": [],
  "subscriptions": []
}
```

#### Update User Trust Score
```http
PUT /admin/users/:id/trust-score
Content-Type: application/json

{
  "score": 75,
  "reason": "Reduced due to multiple reports"
}
```

#### Update User Status
```http
PUT /admin/users/:id/status
Content-Type: application/json

{
  "status": "SUSPENDED",
  "reason": "Violation of community guidelines"
}
```

---

### Statistics

#### Get Overview Stats
```http
GET /admin/stats/overview
```

**Response:**
```json
{
  "totalUsers": 3,
  "activeUsers": 2,
  "greenRoomUsers": 2,
  "redRoomUsers": 1,
  "totalMatches": 2,
  "validatedMatches": 1,
  "totalMessages": 3,
  "averageTrustScore": 76
}
```

#### Get Activity Stats
```http
GET /admin/stats/activity?days=7
```

**Response:**
```json
{
  "period": "Last 7 days",
  "newUsers": 3,
  "newMatches": 2,
  "newMessages": 3
}
```

---

### Audit Logs

#### Get Audit Logs
```http
GET /admin/audit-logs?page=1&limit=50
```

**Response:**
```json
{
  "logs": [
    {
      "id": "uuid",
      "adminId": "uuid",
      "action": "update_api_key",
      "details": {
        "key": "googleMapsKey"
      },
      "ipAddress": "127.0.0.1",
      "createdAt": "2024-02-03T10:00:00.000Z",
      "admin": {
        "name": "Super Admin",
        "email": "admin@hushpair.com",
        "role": "SUPERADMIN"
      }
    }
  ],
  "total": 1,
  "page": 1,
  "totalPages": 1
}
```

---

### Legal Export

#### Export Chat History
```http
POST /admin/export/chat
Content-Type: application/json

{
  "matchId": "match-uuid",
  "reason": "Legal request from law enforcement"
}
```

**Response:**
```json
{
  "exportId": "EXPORT-1706956800000",
  "timestamp": "2024-02-03T10:00:00.000Z",
  "reason": "Legal request from law enforcement",
  "match": {
    "id": "uuid",
    "userOne": {...},
    "userTwo": {...},
    "messages": [...]
  },
  "messageCount": 3
}
```

---

## 🎯 COMING SOON (User-Facing Endpoints)

### Authentication
```http
POST /auth/register
POST /auth/login
POST /auth/verify-phone
POST /auth/verify-face
POST /auth/device-recovery
```

### Matches
```http
GET /matches
POST /matches/swipe
POST /matches/connect
DELETE /matches/:id
```

### Messages
```http
GET /messages/:matchId
POST /messages/:matchId
PUT /messages/:id/read
WebSocket: /messages (real-time)
```

### Rooms
```http
PUT /rooms/switch
GET /rooms/current
```

### Star Pool
```http
GET /star-pool
POST /star-pool/:userId
DELETE /star-pool/:userId
```

### Astrology
```http
GET /astrology/compatibility/:userId
GET /astrology/icebreakers/:matchId
```

---

## 📝 RESPONSE CODES

- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

---

## 🔒 AUTHENTICATION

**Current:** No authentication (development mode)

**Production:** JWT Bearer tokens
```http
Authorization: Bearer <token>
```

Admin endpoints will require:
1. JWT authentication
2. Admin role verification
3. 2FA for sensitive operations (API keys, exports)

---

## 📊 RATE LIMITING

- **Global:** 100 requests/minute per IP
- **Admin:** Higher limits for authenticated admins
- **User:** Will have per-user daily limits

---

## 🧪 TESTING

Use curl or Postman to test endpoints:

```bash
# Get configuration
curl http://localhost:3000/api/admin/config

# Get users
curl http://localhost:3000/api/admin/users

# Get statistics
curl http://localhost:3000/api/admin/stats/overview
```

---

**Last Updated:** February 2026
**API Version:** 1.0.0
