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

document.getElementById('clearAll').addEventListener('click', function(event){
    event.preventDefault();

    var movieList = document.getElementById('movieList');
    if (movieList) {
        console.log("Ordered list element found, clearing it", movieList);

        // Clear the existing content of the ordered list
        movieList.innerHTML = '';
        document.getElementById("noMovieLabel").style.display = "block";
    }
    else{
        console.log("Ordered list element not found");
    }

    chrome.storage.sync.set({'myMovieList' : []}, function(){
        var notifOptions = {
            type: 'basic',
            iconUrl: 'movie.png',
            title: 'Reset Must watch list',
            message: "Must watch movies list is reset!"
        };
        chrome.notifications.create('addMovieNotif', notifOptions);
    })
});