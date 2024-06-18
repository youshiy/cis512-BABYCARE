document.addEventListener('DOMContentLoaded', (event) => {
    // Get the modal
    var modal = document.getElementById("feedingModal");

    // Get the button that opens the modal
    var btn = document.getElementById("btnShowFeeding");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        var feedingInfo = document.getElementById("feedingInfo");
    
        // Retrieve all feeding records and sort by timestamp
        let feedingRecords = Object.keys(localStorage)
            .filter(key => key.startsWith('feedingRecord_'))
            .map(key => ({
                key: key,
                value: JSON.parse(localStorage.getItem(key)),
                timestamp: new Date(key.split('_')[1]).getTime()
             }))
            .sort((a, b) => b.timestamp - a.timestamp);
    
        // Check if there are any records and display the most recent
        if (feedingRecords.length > 0) {
            let mostRecentRecord = feedingRecords[0].value;
            // Format and display the most recent record
            feedingInfo.innerHTML = `
                <p>Milk Types: ${mostRecentRecord.milkTypes.join(', ')}</p>
                <p>Ingredients: ${mostRecentRecord.ingredients.join(', ')}</p>
                <p>Amount: ${mostRecentRecord.amount}</p>
                <p>Memo: ${mostRecentRecord.memo}</p>
            `;
        } else {
            feedingInfo.innerHTML = "<p>No recent feeding information found.</p>";
        }
        modal.style.display = "block";
    };

   

    // When the user clicks on <span>, close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Redirect button to the addRecord page
    document.getElementById("btnAddRecord").onclick = function() {
        window.location.href = 'addRecord.html'; 
    }

});
