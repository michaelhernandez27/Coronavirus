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
        $("#serving-size").text(response.hits[0].fields.nf_serving_size_unit + ' size: ' + response.hits[0].fields.nf_serving_size_qty);
        $("#calories").text('Calories: ' + response.hits[0].fields.nf_calories);
    })

    $.ajax({
        url: recipeURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var img = $("#recipe-img");
        $("#recipe-name").text(response.hits[0].recipe.label);


        var ingredients = response.hits[0].recipe.ingredientLines;
        //console.log(ingredients);
        $("#ingredients").text("Ingredients: " + ingredients);

        //------Fix image
        var image = response.hits[0].recipe.image;
        img.attr("src", image);
        img.html($("#recipe-img"));
        //$("#recipe-img").appendTo(img);
        //$("#recipe-img").attr("src", 'response.hits[0].recipe.image');

        var recipeHits = response.hits

        console.log(recipeHits)

        var correctData = {

            state: 0,

        }

        

        for (i = 0; i < recipeHits.length; i++) {

            var recipe = recipeHits[i].recipe.ingredientLines

            var img = recipeHits[i].recipe.image

            var imgDiv = $("<img>").attr("src", img)

            console.log("Recipe " + i + " is " + recipe)

            var recipeS = $("<div>")

            recipeS.append(imgDiv);

            recipeS.attr('id', 'recipe' + i);

            recipeS.attr("data-state", i);

            $(recipeS).addClass("recipies");

            recipeS.text(recipe)

            $("#ingredients").append(recipeS)

            recipeS.hide();

            var buttonS = $("<button>")

            buttonS.text("Click for a Different Recipe")

            buttonS.attr("id", i)

            $("#ingredients").append(buttonS)

            var correctData = recipeS.data();

            console.log(correctData)

             buttonS.on("click", function() {

                 var ID = $(this).attr("id")
                 console.log(ID)

                 $(".recipes").hide();

                 $('#recipe' + ID).show();


                //recipeS.show();
            });





        
    



        };

       

     
     

    })

    
});