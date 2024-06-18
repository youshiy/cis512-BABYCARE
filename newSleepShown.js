document.addEventListener('DOMContentLoaded', () => {
    const btnShowSleep = document.getElementById('btnShowSleep');
    const sleepModal = document.getElementById('sleepModal');
    const sleepInfo = document.getElementById('sleepInfo');
    const closeModal = document.querySelector('.close');

    btnShowSleep.addEventListener('click', () => {
        let mostRecentRecord;
        let mostRecentTimestamp = -Infinity;

        // Parse all local storage records, looking for the most recent sleep record
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('sleepRecord_')) {
                const timestamp = Date.parse(key.split('_')[1]);
                if (timestamp > mostRecentTimestamp) {
                    mostRecentTimestamp = timestamp;
                    mostRecentRecord = JSON.parse(localStorage.getItem(key));
                }
            }
        }

        if (mostRecentRecord) {
            // Construct the display content for the most recent record
            sleepInfo.innerHTML = `
                <p>Type: ${mostRecentRecord.sleepType}</p>
                <p>From: ${mostRecentRecord.fromTime}</p>
                <p>To: ${mostRecentRecord.toTime}</p>
                <p>Memo: ${mostRecentRecord.memo}</p>
            `;
            // Display the modal
            sleepModal.style.display = 'block';
        } else {
            sleepInfo.textContent = 'No recent sleep records found.';
        }
    });

    // When the close (X) button is clicked, hide the modal
    closeModal.addEventListener('click', () => {
        sleepModal.style.display = 'none';
    });

});
