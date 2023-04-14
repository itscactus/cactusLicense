var Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var Sales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var barColors = ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"];
let now = new Date()

window.onload = function() {
    $.ajax({
        url: '/api/licenses',
        method: 'GET',
        success: function(res) {
            $('#licensesNumber').text(res.length);
        }
    })
    $.ajax({
        url: '/api/sales/summary',
        method: 'GET',
        success: function(res) {
            $('#salesNumber').text(res.length);
        }
    })
    $.ajax({
        url: '/api/products',
        method: 'GET',
        success: function(res) {
            $('#productNumber').text(res.length);
            let content = '';
            res.map((prd, i) => {
                if(i < 3) {
                    let data = prd.data;
                    content = content + `
<div class="border-[1px] dark:border-slate-500 shadow-md rounded-md p-3 dark:bg-gray-900/50 flex flex-col gap-3 items-stretch">
    <div class="mx-auto">
        <img class="w-96 duration-500 hover:translate-y-[-3px] hover:rounded-md" src="${data.thumbnail}">
    </div>
    <div class="p-1 flex flex-row gap-4 justify-between items-center">
        <div>
            <h5 class="font-semibold text-xl uppercase">${data.name}</h5>
        </div>
        <div class="rounded-md text-white bg-green-500 p-1">
            <span>${data.price}$</span>
        </div>
    </div>
    <button onclick="window.location = '/products/${data._id}'" class="text-white bg-green-500 p-2 font-medium rounded-md hover:bg-green-600/80 duration-300 transition-colors">VIEW PRODUCT PAGE<button>
</div>
                    `
                    $('#popularProducts').html(content);
                }
            })
        }
    })
    $.ajax({
        url: '/api/users',
        method: 'GET',
        success: function(res) {
            $('#usersNumber').text(res.length);
        }
    })
}
