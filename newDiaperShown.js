document.addEventListener('DOMContentLoaded', (event) => {
    // Get the modal
    var modal = document.getElementById("diaperModal");

    // Get the button that opens the modal
    var btn = document.getElementById("btnShowDiaper");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        var diaperInfo = document.getElementById("diaperInfo");
        
        // Initialize variables to track the most recent record
        let mostRecentRecord = null;
        let mostRecentTimestamp = 0;
    
        // Retrieve and parse the keys to find the most recent record
        Object.keys(localStorage)
            .forEach(key => {
                if (key.startsWith('diaperRecord_')) {
                    // Extract the timestamp from the key and compare it
                    const timestamp = parseInt(key.split('_')[1]);
                    if (timestamp > mostRecentTimestamp) {
                        mostRecentTimestamp = timestamp;
                        mostRecentRecord = JSON.parse(localStorage.getItem(key));
                    }
                }
            });
    
        if (mostRecentRecord) {
            // Format and display the most recent record
            diaperInfo.innerHTML = `
                <p>Type: ${mostRecentRecord.type}</p>
                <p>Memo: ${mostRecentRecord.memo}</p>
                <img src="${mostRecentRecord.image}" alt="Diaper Image" style="width:100%; max-width:300px; height:auto;" />
            `;
            modal.style.display = "block";
        } else {
            diaperInfo.innerHTML = "<p>No recent diaper information found.</p>";
        }
    };
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
