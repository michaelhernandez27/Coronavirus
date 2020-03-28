$("#food-search").on("click", function (e) {
    e.preventDefault();
    var searchBar = $("#food-input").val();
    var recipeID = '2933c992'
    var recipeAPI = '4d4e90b1760457d583f7cecccac51226'
    var recipeURL = "https://api.edamam.com/search?q=" + searchBar + "&app_id=" + recipeID + "&app_key=" + recipeAPI;
    var queryURL = 'https://api.nutritionix.com/v1_1/search/' + searchBar + '?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=64bab3d8&appKey=5e640a56fafd8fd36515fd159e427358';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#new").text(response.hits[0].fields.brand_name);
        $("#item").text(response.hits[0].fields.item_name);
        $("#calories").text('Calories: ' + response.hits[0].fields.nf_calories);
    })

    $.ajax({
        url: recipeURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })

    
});