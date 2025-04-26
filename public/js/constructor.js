const bookingsEventSource = new EventSource('/photosession/loadPhotosessions', { withCredentials: true });
let selectedSlotId = null;
let currentBookings = [];

window.selectSlot = function(slotId) {
  const slot = initialSlots.find(s => s.id === slotId);
  const isBooked = currentBookings.some(b =>
    b.date === slot.date &&
    b.time === slot.time
  );

  if (!isBooked) {
    selectedSlotId = slotId;
    renderTimeSlots();
  }
};

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


async function renderTimeSlots() {
  const container = document.getElementById('timeSlots');
  const slots = await initialSlots;
  const bookings = window.currentBookings || [];

  container.innerHTML = slots.map(slot => {
    const isBooked = bookings.some(b =>
      b.date === slot.date &&
      b.time === slot.time
    );

    return `
      <div class="time-slot 
        ${isBooked ? 'booked' : ''} 
        ${selectedSlotId === slot.id ? 'selected' : ''}"
        data-id="${slot.id}"
        onclick="${!isBooked ? `selectSlot(${slot.id})` : ''}">
        <div>${slot.date}</div>
        <div>${slot.time}</div>
      </div>
    `;
  }).join('');
}
bookingsEventSource.onerror = (err) => {
  console.error('SSE Connection Error:', err);
  bookingsEventSource.close();
  setTimeout(() => {
    new EventSource('/photosession/loadPhotosessions');
  }, 5000);
};

bookingsEventSource.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);
    console.log('SSE Data Received:', data);

    if (data?.data && Array.isArray(data.data)) {
      currentBookings = data.data;
      renderBookingsTable(data.data);
      updateSlotAvailability(data.data);
      renderTimeSlots();
    }
  } catch (error) {
    console.error('SSE Parse Error:', error);
  }
};
function renderBookingsTable(bookings) {
  const container = document.getElementById('bookingsTable');
  if (!container) {
    console.error('bookingsTable element not found');
    return;
  }

  container.innerHTML = bookings.length ? `
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
                ${bookings.map(b => `
                    <tr>
                        <td>${b.date}</td>
                        <td>${b.time}</td>
                        <td>${b.name}</td>
                        <td>${b.phone}</td>
                        <td>${b.email}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    ` : '<p>Нет бронирований</p>';
}

function updateSlotAvailability(bookings) {
  document.querySelectorAll('.time-slot').forEach(slot => {
    const slotDate = slot.querySelector('div:first-child').textContent;
    const slotTime = slot.querySelector('div:last-child').textContent;
    const isBooked = bookings.some(b =>
      b.date === slotDate &&
      b.time === slotTime
    );
    slot.classList.toggle('booked', isBooked);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('bookingsTable')) {
    const container = document.createElement('div');
    container.id = 'bookingsTable';
    document.querySelector('.booking-container').appendChild(container);
  }
});

renderTimeSlots();