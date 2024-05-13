var contextMenuItem = {
    "id": "movieList",
    "title": "Add Movie to the List",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "movieList" && clickData.selectionText){
        chrome.storage.sync.get(['myMovieList'], function(result){
            var newList = result.myMovieList || [];

            newList.push(clickData.selectionText);

            chrome.storage.sync.set({'myMovieList': newList}, function(){
                if (chrome.runtime.lastError) {
                    console.error('Error storing movie list:', chrome.runtime.lastError.message);
                    return;
                }

                var notifOptions = {
                    type: 'basic',
                    iconUrl: 'movie.png',
                    title: 'Added movie!',
                    message: "Added new movie named " + clickData.selectionText + " to the list"
                };

                chrome.notifications.create('addMovieNotif', notifOptions, function(notificationId) {
                    if (chrome.runtime.lastError) {
                        console.error('Error creating notification:', chrome.runtime.lastError.message);
                        return;
                    }
                    console.log('Notification created:', notificationId);
                });
            });
        });
    }
});