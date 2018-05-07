var controlModule = (function (data, ui) {
    var word = "";
    var filteredCandidates = [];
    var main = document.querySelector("main");
    var searchCandidatesBtn = document.querySelector(".candidatesBtn");

    function init() {
        data.fetchMeStuff(getCandidates);

        function getCandidates(apiCandidates) {
            candidates = data.createCandidates(apiCandidates);
            ui.displayCandidates(candidates);
        }
    }

    function searchCandidatesReusable() {
        var candidates = JSON.parse(localStorage.getItem("candidates"));
        for (let i = 0; i < candidates.length; i++) {
            var lowerCaseName = candidates[i].name.toLowerCase()
            searchTerm = word.toLowerCase()

            if (lowerCaseName.includes(word)) {
                filteredCandidates.push(candidates[i])
            }
        }

        ui.searchButton(ui.displayCandidates, filteredCandidates);
        filteredCandidates.length = 0;
        word = "";
        document.querySelector(".searchCandidates").value = "";
    }

    searchCandidatesBtn.addEventListener("click", searchCandidatesReusable )

    var searchCandidates = document.querySelector(".searchCandidates");
    searchCandidates.addEventListener("keydown", function (e) {
        e.code.startsWith("Key") ? word += e.key : "";
        e.code === "Backspace" ? word = word.slice(0, -1) : "";
        
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            searchCandidatesReusable();
        }
    })

    var allCandidatesBtn = document.querySelector(".allCandidatesBtn");
    allCandidatesBtn.addEventListener("click", function () {
        var candidates = JSON.parse(localStorage.getItem("candidates"));
        ui.searchButton(ui.displayCandidates, candidates);
        filteredCandidates.length = 0;
        word = "";
    })

    return {
        init: init
    }

})(dataModule, uiModule)