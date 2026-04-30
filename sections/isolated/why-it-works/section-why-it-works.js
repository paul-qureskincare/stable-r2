    const accordionItems = document.querySelectorAll(".qure__accordion-item");
    const imageElement = document.getElementById("benefit-image");
    const accTextBtn = document.querySelectorAll('.accordion-button')
    accordionItems.forEach(item => {
      item.addEventListener("click", function () {
        const newImage = this.getAttribute("data-img-url");
        if (newImage && imageElement) {
          imageElement.setAttribute("src", newImage);
        }
      });
    });
    accTextBtn.forEach((item)=>{
        item.addEventListener("click", function () {
        const newImage = this.getAttribute("data-img-url");
        if (newImage && imageElement) {
          imageElement.setAttribute("src", newImage);
        }
      });
    })
