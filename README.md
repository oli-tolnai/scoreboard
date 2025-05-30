# Tournament Scoreboard Application

A real-time tournament management system built with NestJS, Socket.IO, and Bootstrap. This application allows you to manage tournament teams, tasks, scoring, and provides multiple display views with smooth transitions and animations.

## Features

### Display Views
1. **Logo View**: Displays a logo with a dark blue background
2. **Scores Table**: Interactive table showing teams, tasks, and scores
3. **Scoreboard**: Ranked view of teams sorted by total score

### Admin Features
- **Team Management**: Add and remove teams
- **Task Management**: Add and remove tasks with point values
- **Real-time Scoring**: Update team scores for each task
- **View Control**: Switch between different display views
- **Scoreboard Animation**: Animate rankings from last to first place
- **Real-time Updates**: All changes are broadcast via Socket.IO

### Technical Features
- Built with NestJS framework
- Real-time communication via Socket.IO
- Bootstrap 5 for responsive design
- Smooth CSS transitions and animations
- Cross-network compatibility (admin and display on separate machines)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **The server will start on http://localhost:3001**

## Usage

### For the Main Display (Public View)
- Open http://localhost:3001 in a browser
- This shows the tournament display that spectators will see
- View automatically updates when admin makes changes

### For the Admin Interface
- Open http://localhost:3001/admin in a browser
- Use this interface to manage the tournament

### Admin Controls

#### Team Management
- Enter team name and click "Add Team"
- Delete teams using the trash icon
- Teams appear in scoring matrix automatically

#### Task Management
- Enter task name and maximum points
- Click "Add Task" to create
- Delete tasks using the trash icon
- Tasks become columns in the scoring matrix

#### Scoring
- Use the scoring matrix to enter points for each team/task combination
- Scores are validated against maximum points for each task
- Total scores are calculated automatically
- Changes are reflected in real-time on the main display

#### Display Controls
- **Logo View**: Shows the logo with dark blue background
- **Scores Table**: Interactive table view
- **Scoreboard**: Ranked scoreboard view
- **Animate Scoreboard**: Triggers animation from last to first place

#### Keyboard Shortcuts
- **Ctrl+1**: Switch to Logo View
- **Ctrl+2**: Switch to Scores Table
- **Ctrl+3**: Switch to Scoreboard
- **Ctrl+Enter**: Animate Scoreboard

## Network Setup (Different Machines)

### For Admin Machine:
1. Start the server on the admin machine
2. Open http://localhost:3001/admin

### For Display Machine:
1. Replace "localhost" with the admin machine's IP address
2. Open http://[ADMIN_IP]:3001

Example: If admin machine IP is 192.168.1.100:
- Admin: http://localhost:3001/admin
- Display: http://192.168.1.100:3001

## File Structure

```
src/
├── main.ts                    # Application entry point
├── app.module.ts             # Main application module
├── app.controller.ts         # Main routes (/, /admin)
├── app.service.ts           # Application service
└── tournament/
    ├── tournament.module.ts      # Tournament module
    ├── tournament.controller.ts  # Tournament API endpoints
    ├── tournament.service.ts     # Tournament business logic
    ├── tournament.gateway.ts     # Socket.IO gateway
    ├── interfaces.ts            # TypeScript interfaces
    └── dto.ts                   # Data transfer objects

views/
├── index.hbs                # Main display template
└── admin.hbs               # Admin interface template

public/
└── logo.png               # Tournament logo
```

## API Endpoints

### GET /api/tournament/state
Returns current tournament state (teams, tasks, scores, view)

### POST /api/tournament/teams
Add a new team
```json
{ "name": "Team Name" }
```

### DELETE /api/tournament/teams/:id
Remove a team

### POST /api/tournament/tasks
Add a new task
```json
{ "name": "Task Name", "maxPoints": 100 }
```

### DELETE /api/tournament/tasks/:id
Remove a task

### PUT /api/tournament/scores
Update a team's score for a task
```json
{ "teamId": "team-id", "taskId": "task-id", "score": 85 }
```

### PUT /api/tournament/view
Change the current display view
```json
{ "view": "logo" | "table" | "scoreboard" }
```

### POST /api/tournament/animate-scoreboard
Trigger scoreboard animation

## Socket.IO Events

### Client → Server
- No direct client events (uses HTTP API)

### Server → Client
- **stateUpdate**: Broadcast when tournament state changes
  ```json
  {
    "teams": [...],
    "tasks": [...],
    "currentView": "logo",
    "animating": false
  }
  ```

## Customization

### Logo
Replace `public/logo.png` with your tournament logo

### Styling
- Main display styles are in `views/index.hbs`
- Admin styles are in `views/admin.hbs`
- Both use Bootstrap 5 with custom CSS

### Colors and Themes
Modify the CSS variables in the view templates to match your tournament branding.

## Troubleshooting

### Port Already in Use
If port 3001 is busy, change the port in `src/main.ts`:
```typescript
await app.listen(3002); // Change to available port
```

### Network Issues
- Ensure both machines are on the same network
- Check firewall settings
- Verify the IP address is correct

### Browser Compatibility
- Modern browsers with ES6 support required
- WebSocket support needed for real-time updates

## Development

### Adding New Features
1. Update interfaces in `tournament/interfaces.ts`
2. Add API endpoints in `tournament/tournament.controller.ts`
3. Implement logic in `tournament/tournament.service.ts`
4. Update Socket.IO events in `tournament/tournament.gateway.ts`
5. Update frontend in view templates

### Building for Production
```bash
npm run build
npm start
```

## License

This project is for educational/tournament use. Modify as needed for your specific tournament requirements.
