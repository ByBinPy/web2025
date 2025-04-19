const initialSlots = [
    {id: 1, time: '10:00', date: '2024-12-20'},
    {id: 2, time: '11:00', date: '2024-12-20'},
    {id: 3, time: '12:00', date: '2024-12-20'},
    {id: 4, time: '14:00', date: '2024-12-20'},
    {id: 5, time: '15:00', date: '2024-12-20'},
    {id: 6, time: '16:00', date: '2024-12-20'},
    {id: 7, time: '10:00', date: '2024-12-21'},
    {id: 8, time: '11:00', date: '2024-12-21'},
    {id: 9, time: '12:00', date: '2024-12-21'},
];

let selectedSlotId = null;

if (!localStorage.getItem('availableSlots')) {
    localStorage.setItem('availableSlots', JSON.stringify(initialSlots));
}
if (!localStorage.getItem('bookedSlots')) {
    localStorage.setItem('bookedSlots', JSON.stringify([]));
}

function getAvailableSlots() {
    return JSON.parse(localStorage.getItem('availableSlots'));
}

function getBookedSlots() {
    return JSON.parse(localStorage.getItem('bookedSlots'));
}

function isSlotBooked(slotId) {
    const bookedSlots = getBookedSlots();
    return bookedSlots.some(booking => booking.slotId === slotId);
}

function renderTimeSlots() {
    const container = document.getElementById('timeSlots');
    container.innerHTML = '';
    const availableSlots = getAvailableSlots();

    availableSlots.forEach(slot => {
        const slotElement = document.createElement('div');
        const isBooked = isSlotBooked(slot.id);

        slotElement.className = `time-slot ${isBooked ? 'booked' : ''} ${selectedSlotId === slot.id ? 'selected' : ''}`;
        slotElement.innerHTML = `
            <div>${slot.date}</div>
            <div>&nbsp</div>
            <div>${slot.time}</div>
        `;

        if (!isBooked) {
            slotElement.addEventListener('click', () => selectSlot(slot.id));
        }

        container.appendChild(slotElement);
    });

    renderBookingsTable();
}

function renderBookingsTable() {
    const tableContainer = document.getElementById('bookingsTable');
    if (!tableContainer) {
        const container = document.createElement('div');
        container.id = 'bookingsTable';
        container.className = 'bookings-table-container';
        document.querySelector('.booking-container').appendChild(container);
    }

    const bookedSlots = getBookedSlots();
    const availableSlots = getAvailableSlots();

    const tableHTML = `
        <h2>Забронированные фотосессии</h2>
        <table class="bookings-table">
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Время</th>
                    <th>Имя</th>
                    <th>Телефон</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                ${bookedSlots.map(booking => {
        const slot = availableSlots.find(s => s.id === booking.slotId);
        return `
                        <tr>
                            <td>${slot.date}</td>
                            <td>${slot.time}</td>
                            <td>${booking.name}</td>
                            <td>${booking.phone}</td>
                            <td>${booking.email}</td>
                        </tr>
                    `;
    }).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('bookingsTable').innerHTML = bookedSlots.length ? tableHTML : '<p>Нет забронированных фотосессий</p>';
}

function selectSlot(slotId) {
    selectedSlotId = slotId;
    renderTimeSlots();
}

function saveBooking(formData) {
    const bookedSlots = getBookedSlots();
    bookedSlots.push({
        slotId: selectedSlotId,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        bookingTime: new Date().toISOString()
    });
    localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));
}

function clearAllBookings() {
    if (confirm('Вы уверены, что хотите очистить все бронирования?')) {
        localStorage.setItem('bookedSlots', JSON.stringify([]));
        selectedSlotId = null;
        renderTimeSlots();
    }
}

document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!selectedSlotId) {
        alert('Пожалуйста, выберите время для бронирования');
        return;
    }

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    };

    saveBooking(formData);
    this.reset();
    selectedSlotId = null;
    renderTimeSlots();
});

renderTimeSlots();