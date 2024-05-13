chrome.storage.sync.get(['myMovieList'], function(result){
    var count = 0;
    var movieList = document.getElementById('movieList');
    if(result.myMovieList){
        console.log("Movie list object is found in storage");

        // Clear the existing content of the ordered list
        movieList.innerHTML = '';

        result.myMovieList.forEach(function(item) {
            count = count + 1;
            var liElement = document.createElement("li");
            liElement.textContent = item;
            movieList.appendChild(liElement);
        });

        if(count > 0){
            document.getElementById("noMovieLabel").style.display = "none";
        }
        else{
            document.getElementById("noMovieLabel").style.display = "block";
        }
    }
    else{
        console.log("Movie list object is not found in storage");
    }
});

