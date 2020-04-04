var firebaseConfig = {
    apiKey: "AIzaSyAFFbky1V02ofCD6VadDpCFiStrJp0ZgdI",
    authDomain: "foodfun-b3aeb.firebaseapp.com",
    databaseURL: "https://foodfun-b3aeb.firebaseio.com",
    projectId: "foodfun-b3aeb",
    storageBucket: "foodfun-b3aeb.appspot.com",
    messagingSenderId: "1022317590405",
    appId: "1:1022317590405:web:46f8d1d55a2904e293b6ec"
  };
  
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();


$("#food-search").on("click", function (e) {
    $("#more-recipes").empty();
    $("#moreIngredients").empty();
    $("#more-names").empty();
    $("#more-imgs").empty();
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
        var labelOne = response.hits[0].recipe.label
        $("#recipe-name").text(response.hits[0].recipe.label);
        


        var ingredients = response.hits[0].recipe.ingredientLines;
        //console.log(ingredients);
        $("#ingredients").text("Ingredients: " + ingredients);

        var image = response.hits[0].recipe.image;
        img.attr("src", image);
        $("#recipe-img").html(img);

        var recipeHits = response.hits;
        var inArr = [];

        database.ref().push({
            searchBar:searchBar,
            name:labelOne,
            ingredients:ingredients
        })

        for (var i = 0; i < recipeHits.length; i++) {
            var recipes = recipeHits[i].recipe.ingredientLines;
            var foodImg = recipeHits[i].recipe.image
            var imgDiv = $("<img>")
            imgDiv.attr("src", foodImg)
            imgDiv.attr('id', 'image' + i)
            imgDiv.attr("class", "foodImages")
            $("#more-imgs").append(imgDiv);
            imgDiv.hide();


            var labels = recipeHits[i].recipe.label;
            var images = recipeHits[i].recipe.image;
            console.log(labels);
            console.log(recipes);
            inArr.push(recipes);

            var btns = $("<button>");

            btns.attr("id", i)

            btns.addClass("ingArr");
            btns.attr("data-name", i + 1);
            btns.attr("data-label", labels);
            console.log(btns.val(inArr[i]));
            $("#moreIngredients").append(btns);
            btns.text(recipeHits[i].recipe.label);

          



            $(".ingArr").on("click", function () {

                var ID = $(this).attr("id")
                console.log(ID)
                $(".foodImages").hide();
                $('#image' + ID).show();
                btnsVal = $(this).val();
                btnsLabel = $(this).attr("data-label");
                $("#more-recipes").text(btnsVal);
                $("#more-names").text(btnsLabel);
            })
        };
    })
});

var number = 10;
var countdownInterval = setInterval(decrement, 1000);

function decrement() {
    number--;

    if (number === 0) {
        $(".starWars").hide();
    };
};