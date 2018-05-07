var uiModule = (function () {
    function displayCandidates(candidates) {
        var main = document.querySelector("main")
        
        for (let i = 0; i < candidates.length; i++) {
            var avatar = candidates[i].avatar;
            var avatarPlaceholder = "https://www.alanidental.com/wp-content/uploads/2016/01/default-300x300.png";
            var name = candidates[i].name;
            var email = candidates[i].email;
            var id = candidates[i].id;
            
            var candidatesWrapper = document.querySelector(".candidatesWrapper");
            var candidateCardInnerDiv = document.createElement("div");
            candidateCardInnerDiv.classList.add("candidateCardInnerDiv");
            candidateCardInnerDiv.id = id;
            var img = document.createElement("img");
            img.src = avatar ? avatar : avatarPlaceholder;
            var imgDiv = document.createElement("div");
            imgDiv.classList.add("imgDiv");
            imgDiv.appendChild(img);
            candidateCardInnerDiv.appendChild(imgDiv);
            var pName = document.createElement("p");
            pName.innerHTML = name;
            candidateCardInnerDiv.appendChild(pName);
            var breakRow = document.createElement("br");
            candidateCardInnerDiv.appendChild(breakRow);
            var pEmail = document.createElement("p");
            pEmail.innerHTML = email;
            candidateCardInnerDiv.appendChild(pEmail);
            var candidateCardDiv = document.createElement("div");
            candidateCardDiv.classList.add("candidateCard");
            candidateCardDiv.appendChild(candidateCardInnerDiv);
            candidatesWrapper.appendChild(candidateCardDiv);
        }
    }

    function searchButton(addFilteredCandidatesToPage, filteredCandidates) {
        var main = document.querySelector("main");
        var candidatesWrapper = document.querySelector(".candidatesWrapper");
        var searchCandidatesBtn = document.querySelector(".candidatesBtn");
        main.removeChild(candidatesWrapper)
        var candidatesWrapper = document.createElement("div");
        candidatesWrapper.classList.add("candidatesWrapper");
        main.appendChild(candidatesWrapper);
        addFilteredCandidatesToPage(filteredCandidates)
    }

    return {
        displayCandidates: displayCandidates,
        searchButton:searchButton
    }
})()