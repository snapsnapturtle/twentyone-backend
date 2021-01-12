const io = require('./config/socket');

const EVENTS = {
    USERS_CHANGED: 'users_changed',
    UPDATE_POSITION: 'update_position',
    ADD_POSITION: 'add_position',
    POSITIONS_CHANGED: 'positions_changed',
    CURSOR_CHANGED: 'cursor_changed',
    CURSORS_UPDATED: 'cursors_updated'
};

// { id: string }
let users = [];

// { id: string, name: string, position: [x: number, y: number] }
let cursors = [];

// { id: string, x: number, y: number }
let positions = [];

io.on('connection', (socket) => {
    // update all clients with new user
    users = users.concat({ id: socket.id });
    io.sockets.emit(EVENTS.USERS_CHANGED, users);

    // update positions for user
    socket.emit(EVENTS.POSITIONS_CHANGED, positions);

    socket.on(EVENTS.UPDATE_POSITION, position => {
        const i = positions.findIndex(it => it.id === position.id);

        if (i !== -1) {
            positions[i].x = position.x;
            positions[i].y = position.y;

            io.sockets.emit(EVENTS.POSITIONS_CHANGED, positions);
        }
    });

    socket.on(EVENTS.ADD_POSITION, position => {
        positions = positions.concat({
            id: position.id,
            x: position.x,
            y: position.y
        });

        io.sockets.emit(EVENTS.POSITIONS_CHANGED, positions);
    });

    socket.on(EVENTS.CURSOR_CHANGED, updatedCursor => {
        const activeCursorIndex = cursors.findIndex(it => it.id === updatedCursor.id);

        if (activeCursorIndex !== -1) {
            Object.assign(cursors[activeCursorIndex], { name: updatedCursor.name, position: updatedCursor.position });
        } else {
            cursors.push({
                id: updatedCursor.id,
                name: updatedCursor.name,
                position: updatedCursor.position
            });
        }

        io.sockets.emit(EVENTS.CURSORS_UPDATED, cursors);
    });

    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {
        users = users.filter(it => it.id !== socket.id);
        io.sockets.emit(EVENTS.USERS_CHANGED, users);

        cursors = cursors.filter(it => it.id !== socket.id)
        io.sockets.emit(EVENTS.CURSORS_UPDATED, cursors)
    });
});
