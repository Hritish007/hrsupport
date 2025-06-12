function showPopup() {
      document.getElementById("myPopup").style.display = "flex";
    }

    function hidePopup() {
      document.getElementById("myPopup").style.display = "none";
    }
// Update footer year dynamically
    document.getElementById("year").textContent = new Date().getFullYear();

    // Show welcome notification
    function showNotification() {
      alert(
        "Welcome, HR Support User!\nTo access 'Pin Your Issue' and 'Note', simply remove 'abc.html' from the URL and press Enter. Your data in 'Pin Your Issue' and 'Note' is secure and will not be lost. Thank you for choosing HR Support!"
      );
    }

    // Toggle popup visibility
    function togglePopup() {
      const popup = document.getElementById("myPopup");
      const isVisible = window.getComputedStyle(popup).display !== "none";
      popup.style.display = isVisible ? "none" : "flex";
    }

    // Hide popup
    function hidePopup() {
      document.getElementById("myPopup").style.display = "none";
    }

    // Copy text to clipboard with notification near cursor
    function copyText(event, element) {
      const text = element.querySelector("p").textContent;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          const notification = document.createElement("div");
          notification.className = "notification";
          notification.textContent = "Copied!";
          document.body.appendChild(notification);

          const offsetX = -35;
          const offsetY = -60;
          let posX = event.clientX + offsetX;
          let posY = event.clientY + offsetY;
          const notificationWidth = 100;
          const notificationHeight = 30;
          const maxX = window.innerWidth - notificationWidth - 10;
          const maxY = window.innerHeight - notificationHeight - 10;
          posX = Math.min(posX, maxX);
          posY = Math.min(posY, maxY);
          notification.style.left = posX + "px";
          notification.style.top = posY + "px";

          notification.classList.add("show");
          setTimeout(() => {
            notification.classList.add("hide");
            setTimeout(() => {
              notification.remove();
            }, 300);
          }, 1500);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }

   