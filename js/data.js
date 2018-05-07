var dataModule = (function () {

    function Candidate(candidateList) {
        this.id = candidateList.id;
        this.name = candidateList.name;
        this.email = candidateList.email;
        this.avatar = candidateList.avatar;
        this.birthday = candidateList.birthday;
        this.education = candidateList.education;

    }

    function createCandidates(candidateList) {
        var candidates = []
        for (let i = 0; i < candidateList.length; i++) {
            var candidate = new Candidate(candidateList[i]);
            candidates.push(candidate);
        }
        localStorage.setItem("candidates", JSON.stringify(candidates));
        return candidates;
    }

    function fetchMeStuff(onLoaded) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://localhost:3333/api/candidates?q=");
        xhr.onload = function () {
            if (xhr.status === 200) {
                onLoaded(JSON.parse(xhr.response));
            } else {
                console.log('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send();
        
    }

    return {
        fetchMeStuff: fetchMeStuff,
        createCandidates: createCandidates
    }

})()