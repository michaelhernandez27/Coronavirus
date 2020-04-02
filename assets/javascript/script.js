$("#food-search").on("click", function (e) {
    $("#more-recipes").empty();
    e.preventDefault();
    var searchBar = $("#food-input").val();
    var recipeID = '2933c992';
    var calorieID = '64bab3d8';
    var calorieAPI = '5e640a56fafd8fd36515fd159e427358'
    var recipeAPI = '4d4e90b1760457d583f7cecccac51226';
    var recipeURL = "https://api.edamam.com/search?q=" + searchBar + "&app_id=" + recipeID + "&app_key=" + recipeAPI;
    var queryURL = 'https://api.nutritionix.com/v1_1/search/' + searchBar + '?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=' + calorieID + '&appKey=' + calorieAPI;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#new").text(response.hits[0].fields.brand_name);
        $("#item").text(response.hits[0].fields.item_name);
        $("#serving-size").text(response.hits[0].fields.nf_serving_size_unit + ' size: ' + response.hits[0].fields.nf_serving_size_qty);
        $("#calories").text('Calories: ' + response.hits[0].fields.nf_calories);
    })

    $.ajax({
        url: recipeURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var img = $("<img>");
        $("#recipe-name").text(response.hits[0].recipe.label);


        var ingredients = response.hits[0].recipe.ingredientLines;
        //console.log(ingredients);
        $("#ingredients").text("Ingredients: " + ingredients);

        var image = response.hits[0].recipe.image;
        img.attr("src", image);
        $("#recipe-img").html(img);


        $("#recipe-img").html(img);

        var recipeHits = response.hits;
        var inArr = [];

        for (var i = 0; i < recipeHits.length; i++) {
            var recipes = recipeHits[i].recipe.ingredientLines;
            console.log(recipes);
            inArr.push(recipes);

            var btns = $("<button>");

            btns.addClass("ingArr");
            btns.attr("data-name", i + 1);
            console.log(btns.val(inArr[i]));
            $("#ingredients").append(btns);
            btns.text(recipeHits[i].recipe.label);
        };

        $(".ingArr").on("click", function () {
            btnsVal = $(this).val();
            $("#more-recipes").text(btnsVal);
        })

    })
});

number = 10;

countdownInterval = setInterval(decrement, 1000);

function decrement() {

    
    number--;

 
  
  
   if (number === 0) {

    $(".starWars").hide();

   };
};
