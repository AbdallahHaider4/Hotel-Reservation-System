class Room {
    constructor(number, type, price) {
        this.number = number;
        this.type = type;
        this.price = price;
        this.isAvailable = true;
    }

    // Book the room
    bookRoom() {
        if (this.isAvailable) {
            this.isAvailable = false;
            return true;
        }
        return false;
    }

    // Cancel the reservation
    cancelBooking() {
        if (!this.isAvailable) {
            this.isAvailable = true;
            return true;
        }
        return false;
    }
}

class Hotel {
    constructor(name) {
        this.name = name;
        this.rooms = [];
    }

    addRoom(room) {
        this.rooms.push(room);
    }

    getAvailableRooms() {
        return this.rooms.filter(room => room.isAvailable);
    }

    findAvailableRoom(type) {
        return this.getAvailableRooms().find(room => room.type === type);
    }
}

class Reservation {
    constructor(hotel) {
        this.hotel = hotel;
        this.reservations = [];
    }

    makeReservation(type) {
        const room = this.hotel.findAvailableRoom(type);
        if (room) {
            if (room.bookRoom()) {
                this.reservations.push(room);
                return `Room ${room.number} booked.`;
            }
        }
        return 'No available rooms for this type.';
    }

    cancelReservation(roomNumber) {
        const room = this.reservations.find(room => room.number === roomNumber);
        if (room) {
            if (room.cancelBooking()) {
                this.reservations = this.reservations.filter(room => room.number !== roomNumber);
                return `Reservation for room ${roomNumber} cancelled.`;
            }
        }
        return 'No reservation found for this room.';
    }

    viewReservations() {
        if (this.reservations.length === 0) {
            return 'No current reservations found.';
        }
        return this.reservations.map(r => `Room #${r.number}, Type: ${r.type}, Price: $${r.price}`).join('\n');
    }
}

class RoomManager {
    constructor(hotel) {
        this.hotel = hotel;
    }

    displayAvailableRooms() {
        const availableRooms = this.hotel.getAvailableRooms();
        if (availableRooms.length === 0) {
            return 'No Available Rooms';
        }
        return availableRooms.map(room => `Room #${room.number}, Type: ${room.type}, Price: $${room.price}`).join('\n');
    }
}

const hotel = new Hotel('Grand Hotel');
hotel.addRoom(new Room(101, "Single", 100));
hotel.addRoom(new Room(102, "Single", 100));
hotel.addRoom(new Room(103, "Single", 100));
hotel.addRoom(new Room(104, "Double", 200));
hotel.addRoom(new Room(105, "Double", 200));
hotel.addRoom(new Room(106, "Double", 200));
hotel.addRoom(new Room(107, "Suite", 400));
hotel.addRoom(new Room(108, "Suite", 400));
hotel.addRoom(new Room(109, "Suite", 400));

const reservation = new Reservation(hotel);
const roomManager = new RoomManager(hotel);

const updateReservationList = () => {
    const reservationList = document.getElementById('reservation-list');
    reservationList.textContent = reservation.viewReservations();
}

const updateAvailableRooms = () => {
    const availableRooms = document.getElementById('available-rooms');
    availableRooms.textContent = roomManager.displayAvailableRooms();
}

document.getElementById('booking-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const roomType = document.getElementById('room-type').value.split(' - ')[0];
    const result = reservation.makeReservation(roomType);
    alert(result);
    updateAvailableRooms();
    updateReservationList();
});

document.getElementById('cancellation-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const roomNumber = parseInt(document.getElementById('room-number').value);
    const result = reservation.cancelReservation(roomNumber);
    alert(result);
    updateAvailableRooms();
    updateReservationList();
});

updateAvailableRooms();
updateReservationList();