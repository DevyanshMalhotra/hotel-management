document.addEventListener('DOMContentLoaded', () => {
    const getRoomRentBtn = document.getElementById('getRoomRentBtn');
    const roomNumberInput = document.getElementById('roomNumberCheckIn');
    const totalPaymentAmountInput = document.getElementById('totalPaymentAmount');
    const checkInForm = document.getElementById('checkInForm');
    
    // Event listener for getting the room rent based on room number
    getRoomRentBtn.addEventListener('click', async () => {
        const roomNumber = roomNumberInput.value;

        if (!roomNumber) {
            alert('Please enter a room number.');
            return;
        }

        try {
            // Fetch room rent from the server (replace with your actual API endpoint)
            const response = await fetch(`/api/getRoomRent/${roomNumber}`);
            const data = await response.json();

            if (response.ok && data && data.rent) {
                // Set the rent in the payment field if room is found
                totalPaymentAmountInput.value = data.rent;
            } else {
                alert('Room not found. Please enter a valid room number.');
            }
        } catch (error) {
            console.error('Error fetching room rent:', error);
            alert('There was an error fetching the room rent. Please try again.');
        }
    });

    // Handle form submission for check-in
    checkInForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const guestName = document.getElementById('guestName').value;
        const roomNumber = roomNumberInput.value;
        const checkInDate = document.getElementById('checkInDate').value;
        const checkOutDate = document.getElementById('checkOutDate').value;
        const totalPayment = totalPaymentAmountInput.value;
        const paymentAmount = document.getElementById('paymentAmount').value;
        const paymentStatus = document.getElementById('paymentStatus').value;

        // Validate form fields
        if (!guestName || !roomNumber || !checkInDate || !checkOutDate || !totalPayment || !paymentAmount || !paymentStatus) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            // Send check-in data to the backend (replace '/check-in' with your actual endpoint)
            const response = await fetch('/check-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    guestName,
                    roomNumber,
                    checkInDate,
                    checkOutDate,
                    totalPayment,
                    paymentAmount,
                    paymentStatus,
                }),
            });

            if (!response.ok) {
                throw new Error('Error during check-in.');
            }

            // Assuming result contains a success message
            alert('Check-in successful!');
            checkInForm.reset(); // Reset form after successful submission
        } catch (error) {
            console.error('Error during check-in:', error);
            alert('Something went wrong. Please try again.');
        }
    });
});
